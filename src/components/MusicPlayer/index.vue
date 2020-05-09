<template>
  <div class="music-player">
    <div v-if="playerInfo.songList.length>0">
      <full-screen-player
        v-if="playerInfo.fullScreen"
        @setProgress='setProgress'
        @openSongList='openSongList'
      />
      <mini-player
        v-else
        @openSongList='openSongList'
      />
    </div>
    <popup v-model="popupStatus">
      
    </popup>
    <audio
      :src="audioSrc"
      ref="audioRef"
      @timeupdate='updateTime'
      @canplay='getDuration'
      @ended="playEnd"
      @error="playErro"
      v-show="true"
    ></audio>
  </div>
</template>

<script>
import MiniPlayer from './MiniPlayer'
import FullScreenPlayer from './FullScreenPlayer'
import { getRandomInt } from '@/utils'
import lyricParser from './utils/lyricParser'
import { mapState, mapMutations } from 'vuex'
import { getRequestSongUrl, getRequestLyric } from '@/api/songPlayer'
import Popup from '@/components/Popup'
export default {
  data() {
    return {
      isFullScreen: true,
      audioSrc: '',
      duration: 0,
      currentTime: 0,
      status: true,
      popupStatus: false
    }
  },
  components: {
    Popup,
    MiniPlayer,
    FullScreenPlayer
  },
  computed: {
    ...mapState(['playerInfo']),
  },
  watch: {
    'playerInfo.playerStatus'(val) {
      // 监听播放状态
      if (this.$refs.audioRef) {
        if (val) {
          this.$refs.audioRef.play()
        } else {
          this.$refs.audioRef.pause()
        }
      }
    },
    // 歌曲id改变之后播放
    'playerInfo.songId'(val) {
      this.audioSrc = getRequestSongUrl(val)

      this.getLyric()

      this.$nextTick(() => {
        this.$refs.audioRef.play()
      })
    }
  },
  methods: {
    ...mapMutations(['setSongDuration', 'setSongCurrentTime', 'setPlayerStatus', 'setSongIndex', 'setSongLyricList']),

    getSongUrl() {
      this.audioSrc = getRequestSongUrl(this.playerInfo.songId)
    },
    // 获取歌词
    getLyric() {
      getRequestLyric(this.playerInfo.songId).then(res => {
        let lyricList = []
        if (res.lrc && res.lrc.lyric) {
          lyricList = lyricParser(res.lrc.lyric)
        } else {
          lyricList = [{
            time: 0,
            text: '纯音乐，请欣赏'
          }]
        }
        this.setSongLyricList(lyricList)
      })
    },
    // 实时更新播放时间
    updateTime(e) {
      this.setSongCurrentTime(e.target.currentTime)
    },
    // 获取歌曲时长
    getDuration() {
      this.setSongDuration(this.$refs.audioRef.duration)
    },
    setProgress(val) {
      this.$refs.audioRef.currentTime = val / 100 * this.playerInfo.duration
    },
    // 播放结束
    playEnd() {
      // 0:顺序循环,1:单曲循环,2:随机播放 
      const { playerMode, songIndex, songList } = this.playerInfo
      let index = 0
      switch (playerMode) {
        case 0:
          index = songIndex === songList.length - 1 ? 0 : songIndex + 1
          break;
        case 1:
          index = songIndex
          break;
        default:
          index = getRandomInt(0, songList.length - 1)
      }
      // 跳过不能播放的歌曲
      if (songList[index].dis) {
        index = index === songList.length - 1 ? 0 : index + 1
      }

      this.setSongIndex(index)
    },
    playErro(e) {
      // if (this.playerInfo.songId) {
      //   alert('播放失败')
      // }
    },
    // 打开歌曲列表
    openSongList() {
      this.popupStatus = true
    }
  }
}
</script>

<style scoped lang="scss">
.min-player {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 88px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  .music-cover {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: red;
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
  }
}
.placeholder {
  height: 88px;
}
</style>