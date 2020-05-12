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
      <div class='title'>
        当前播放列表
      </div>
      <div class="song-list">
        <song-card
          v-for="(item,index) in playerInfo.songList"
          :key="item.id"
          :name='item.name'
          :singer='item.ar[0].name'
          :disabled='item.dis'
          :active='item.id===playerInfo.songId'
          @onClick="playMusic(index)"
          @close="closeMusic(index)"
        />
      </div>
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
import SongCard from './SongCard'
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
    SongCard,
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
    ...mapMutations(['setSongDuration', 'setSongCurrentTime', 'setPlayerStatus', 'setSongIndex', 'setSongLyricList','setSongList']),

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
      if (this.playerInfo.songId) {
        alert('该歌曲无法播放')
        this.setPlayerStatus(false)
      }
    },
    // 打开歌曲列表
    openSongList() {
      this.popupStatus = true
    },
    playMusic(index) {
      this.setSongIndex(index)
      // 延迟播放
      this.$nextTick(() => {
        this.setPlayerStatus(true)
      })
    },
    // 删除歌曲列表
    closeMusic(index){
      const {songList} = this.playerInfo
      songList.splice(index,1)
      this.setSongList(songList)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popup-bottom {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.title {
  flex-shrink: 0;
  font-size: 36px;
  color: $font-color-dark;
}
.song-list {
  flex: 1;
  overflow-y: auto;
}
</style>