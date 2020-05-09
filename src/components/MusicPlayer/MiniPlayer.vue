<template>
  <div>
    <div
      class="mini-player flex-align-center"
      @click="setFullScreen(true)"
    >
      <img
        :src="playerInfo.songCoverUrl"
        alt="music"
        class="music-cover"
      >
      <div class="music-info">
        <div class="music-name">{{playerInfo.songName}}</div>
        <div class="music-singer">{{playerInfo.songSinger}}</div>
      </div>
      <div
        class="player-btn"
        @click.stop="play"
      >
        <progress-bar
          type='circle'
          :percentage='percentage'
        >
          <svg-icon
            :icon-class="playerInfo.playerStatus?'play':'stop'"
            class="icon"
          />
        </progress-bar>
      </div>
      <svg-icon
        icon-class='song-list'
        class="song-list-btn"
        @click.native.stop="openSongList"
      />
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import ProgressBar from '../ProgressBar'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['playerInfo']),
    percentage() {
      const { currentTime, duration } = this.playerInfo
      return currentTime > 0 ? currentTime / duration * 100 : 0
    }
  },
  components: {
    ProgressBar
  },
  methods: {
    ...mapMutations(['setPlayerStatus', 'setFullScreen']),
    openSongList() {
      this.$emit('openSongList')
    },
    play() {
      this.setPlayerStatus(!this.playerInfo.playerStatus)
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
.mini-player {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 88px;
  background-color: #fff;
  padding: 0 20px 0 10px;
  box-sizing: border-box;
  .music-cover {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    animation: rotate 10s infinite;
  }
  .music-info {
    flex: 1;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    .music-name {
      font-size: $font-base;
      color: #000;
      @include text-ellipsis(1);
    }
    .music-singer {
      font-size: $font-base;
      color: $font-color-light;
      @include text-ellipsis(1);
    }
  }
  .player-btn {
    width: 60px;
    height: 60px;
    .icon {
      font-size: 32px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .song-list-btn {
    font-size: 48px;
    margin-left: 30px;
  }
}
.placeholder {
  height: 88px;
}
</style>