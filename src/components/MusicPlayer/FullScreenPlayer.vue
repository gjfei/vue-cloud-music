<template>
  <div class="full-screen flex-align-center">
    <div
      class="background"
      :style="{backgroundImage:`url(${playerInfo.songCoverUrl})`}"
    />
    <nav-bar
      titleAlign='left'
      @clickLeft="setFullScreen(false)"
    >
      <svg-icon
        slot="left"
        icon-class='arrow'
        fill='#fff'
      />
      <div
        class="music-info"
        slot="title"
      >
        <notice-bar
          :text='playerInfo.songName'
          color='#f7f7f7'
          class="music-name"
        />
        <notice-bar
          :text='playerInfo.songSinger'
          color='#f7f7f7'
          class="music-singer"
        />
      </div>
    </nav-bar>
    <div class="container">
      <lyric-wrap @setPlayTime='setPlayTime' />
      <div class="song-cover">

      </div>
    </div>
    <div class="footer">
      <div class="progress-wrap flex-align-center">
        <div class="time">{{playerInfo.currentTime | formatSeconds}}</div>
        <progress-bar
          type='line'
          :percentage='percentage'
          stroke='#e5e5e5'
          activeStroke='#e5e9f2'
          dotColor='#fff'
          @change='setProgress'
        />
        <div class="time">{{playerInfo.duration | formatSeconds}}</div>
      </div>
      <div class="operators flex-align-center">
        <div class="icon-left flex-align-center">
          <svg-icon
            :icon-class='playModeIcon[playerInfo.playerMode]'
            @click.native="switchMode"
          />
        </div>
        <div class="icon-left flex-align-center">
          <svg-icon
            icon-class='prev-song'
            @click.native="switchSong(0)"
          />
        </div>
        <div
          class="icon-center flex-align-center"
          @click="play"
        >
          <svg-icon :icon-class="playerInfo.playerStatus?'play-border':'stop-border'" />
        </div>
        <div class="icon-right flex-align-center">
          <svg-icon
            icon-class='next-song'
            @click.native="switchSong(1)"
          />
        </div>
        <div class="icon-right flex-align-center">
          <svg-icon
            icon-class='song-list'
            @click.native="openSongList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LyricWrap from './LyricWrap'
import NavBar from '../NavBar'
import NoticeBar from '../NoticeBar'
import ProgressBar from '../ProgressBar'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      playModeIcon: ['song-seq', 'song-loop', 'song-random']
    }
  },
  components: {
    LyricWrap,
    NavBar,
    NoticeBar,
    ProgressBar
  },
  computed: {
    ...mapState(['playerInfo']),
    percentage() {
      const { currentTime, duration } = this.playerInfo
      return currentTime > 0 ? currentTime / duration * 100 : 0
    }
  },
  filters: {
    formatSeconds(duration) {
      const m = Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)
      const s = Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)
      return `${m}:${s}`
    }
  },
  mounted() {
    // 防止滚动穿透
    document.body.classList.add('overflow-hidden');
  },
  destroyed() {
    document.body.classList.remove('overflow-hidden');
  },
  methods: {
    ...mapMutations(['setPlayerStatus', 'setFullScreen', 'setPlayerMode', 'setSongIndex']),
    setProgress(val) {
      this.$emit('setProgress', val)
    },
    setPlayTime(val) {
      const reslut = val / this.playerInfo.duration * 100
      this.$emit('setProgress', reslut)
    },
    play() {
      this.setPlayerStatus(!this.playerInfo.playerStatus)
    },
    switchMode() {
      const mode = this.playerInfo.playerMode === 2 ? 0 : ++this.playerInfo.playerMode
      this.setPlayerMode(mode)
    },
    // 切换歌曲
    switchSong(type) {
      let index = 0
      const { songIndex, songList } = this.playerInfo

      if (type === 0) {
        index = songIndex === 0 ? songList.length - 1 : songIndex - 1
      } else if (type === 1) {
        index = songIndex === songList.length - 1 ? 0 : songIndex + 1
      }

      if (songList[index].dis) {
        if (type === 0) {
          index = songIndex === 0 ? songList.length - 2 : songIndex - 2
        } else {
          index = index === songList.length - 1 ? 0 : index + 1
        }
      }
      this.setSongIndex(index)
    },
    openSongList() {
      this.$emit('openSongList')
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
::v-deep .notice-bar .wrap {
  height: 44px;
}
::v-deep .nav-bar {
  background-color: transparent;
}
.full-screen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  flex-direction: column;
  background-color: #fff;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(15px);
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
      top: 0;
    }
  }
  .music-info {
    height: 88px;
    .music-name {
      font-size: $font-base;
      font-weight: bold;
      color: #fff;
    }
    .music-singer {
      font-size: $font-sm;
      color: $font-color-pale;
    }
  }
  .container {
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    .song-cover {
    }
  }
  .footer {
    width: 100%;
    height: 200px;
    padding: 0 40px;
    box-sizing: border-box;
    ::v-deep .progress {
      margin: 0 10px;
    }
    .time {
      font-size: $font-sm;
      color: $font-color-pale;
    }
    .operators {
      margin-top: 20px;
      justify-content: center;
      text-align: center;
      color: $font-color-pale;
      .icon {
        &-left {
          font-size: 50px;
          flex: 1;
          justify-content: flex-end;
        }
        &-right {
          font-size: 50px;
          flex: 1;
          justify-content: flex-start;
        }
        &-center {
          font-size: 100px;
          margin: 0 60px;
        }
      }
    }
  }
}
</style>