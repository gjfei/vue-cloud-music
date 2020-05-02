import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerInfo: {
      songList: [],  // 歌曲列表
      songIndex: 0, // 在列表中的索引
      songName: '', // 当前歌曲名字
      songSinger: '', // 当前歌曲作者
      songCoverUrl: '', // 歌曲封面
      songLyricList:[], // 歌曲歌词
      songDis: false, // 歌曲是否禁止播放
      songId: '', // 当前歌曲Id
      duration: 0, // 歌曲时长
      currentTime: 0, // 播放时长
      playerStatus: false, // 是否播放
      fullScreen: false, //全屏播放器
      playerMode: 0,// 0:顺序循环,1:单曲循环,2:随机播放 
    }
  },
  mutations: {
    // 列表或者索引改变之后需要设置对应的歌曲信息
    setSongList(state, songList) {
      state.playerInfo.songList = songList
      state.playerInfo.songId = songList[state.playerInfo.songIndex].id
      state.playerInfo.songName = songList[state.playerInfo.songIndex].al.name
      state.playerInfo.songSinger = songList[state.playerInfo.songIndex].ar[0].name
      state.playerInfo.songCoverUrl = songList[state.playerInfo.songIndex].al.picUrl
      state.playerInfo.songDis = songList[state.playerInfo.songIndex].dis
    },

    setSongIndex(state, songIndex) {
      state.playerInfo.songIndex = songIndex
      state.playerInfo.songId = state.playerInfo.songList[songIndex].id
      state.playerInfo.songName = state.playerInfo.songList[songIndex].al.name
      state.playerInfo.songSinger = state.playerInfo.songList[songIndex].ar[0].name
      state.playerInfo.songCoverUrl = state.playerInfo.songList[songIndex].al.picUrl
      state.playerInfo.songDis = state.playerInfo.songList[songIndex].dis
    },

    setSongLyricList(state,songLyricList){
      state.playerInfo.songLyricList = songLyricList
    },
    // 设置歌曲时长
    setSongDuration(state, duration) {
      state.playerInfo.duration = duration
    },
    // 播放时长
    setSongCurrentTime(state, currentTime) {
      state.playerInfo.currentTime = currentTime
    },
    // 播放状态
    setPlayerStatus(state, status) {
      if (state.playerInfo.songDis) {
        state.playerInfo.playerStatus = false
      } else {
        state.playerInfo.playerStatus = status
      }
    },
    
    setFullScreen(state, status) {
      state.playerInfo.fullScreen = status
    },

    // 播放模式
    setPlayerMode(state, mode) {
      state.playerInfo.playerMode = mode
    }
  },
  actions: {
  },
  modules: {
  }
})
