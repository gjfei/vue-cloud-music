<template>
  <div class="lyric">
    <div
      class="lyric-wrap"
      ref="lyricWrapRef"
      @scroll.passive='onScroll'
    >
      <div
        class="lyric-list"
        :style="{padding:`${lyricHeight/2-lyricTextHeight[0]/2}px 0px ${lyricHeight/2-lyricTextHeight[lyricTextHeight.length-1]/2}px`}"
        @touchmove='onTouchmove'
      >
        <p
          v-for="(item,index) in lyricList"
          :key='item.time'
          class="text"
          :class="{active1:index===timeIndex,active2:index===scrollIndex&&showIndicator}"
          ref="lyricText"
        >
          {{item.text}}
        </p>
      </div>

    </div>
    <div
      class="indicator-line"
      v-show="showIndicator"
    ></div>
  </div>
</template>

<script>
import { getRequestLyric } from '@/api/songPlayer'
import { setScrollTop } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LyricWrap',
  data() {
    return {
      lyricList: [],
      lyricHeight: 0,
      lyricTextHeight: [],
      lyricWrapScrollTop: 0,
      showIndicator: false,
      timeId: null,
      scrollStatus: false,
      timeIndexChange: 0,
    }
  },
  computed: {
    ...mapState(['playerInfo']),
    lyricWrapRef() {
      return this.$refs.lyricWrapRef
    },
    scrollIndex() {
      let index = 0
      let total = 0
      let { lyricTextHeight, lyricWrapScrollTop } = this
      lyricWrapScrollTop = lyricWrapScrollTop + lyricTextHeight[0] / 2
      if (lyricTextHeight.length > 0) {
        for (let i = 0, len = lyricTextHeight.length; i < len; i++) {
          if (lyricWrapScrollTop >= total && lyricWrapScrollTop < total + lyricTextHeight[i]) {
            index = i
            break
          }
          total += lyricTextHeight[i]
        }
      }
      return index
    },
    timeIndex() {
      let index = 0
      let total = 0
      const { currentTime, duration } = this.playerInfo
      let { lyricList, lyricTextHeight, lyricWrapRef, scrollStatus, showIndicator } = this
      if (lyricList.length > 0 && lyricTextHeight.length > 0 && lyricWrapRef) {
        for (let i = 0, len = lyricList.length; i < len; i++) {
          if (i > 1 && currentTime > 0 && lyricList[i].time >= currentTime) {
            index = i - 1
            break
          }
        }
        if (currentTime > lyricList[lyricList.length - 1].time) {
          index = lyricList.length - 1
        }
      }
      this.timeIndexChange = index
      return index
    }
  },
  watch: {
    'playerInfo.songLyricList'(val) {
      this.lyricList = val
      this.$nextTick(() => {
        const lyricTextHeight = []
        this.$refs.lyricText.forEach(item => {
          lyricTextHeight.push(item.offsetHeight)
        })
        this.lyricTextHeight = lyricTextHeight
        this.lyricHeight = this.lyricWrapRef.offsetHeight
      })
    },
    timeIndexChange(index) {
      let total = 0
      const { lyricTextHeight, lyricWrapRef, scrollStatus, showIndicator } = this
      if (!scrollStatus && !showIndicator) {
        for (let i = 0, len = lyricTextHeight.length; i < len; i++) {
          if (i <= index) {
            total = total + lyricTextHeight[i]
          } else {
            break
          }
        }
        const from = lyricWrapRef.scrollTop
        if (from != total) {
          setScrollTop(this.$refs.lyricWrapRef, total, from)
        }
      }
    }
  },
  mounted() {
    this.lyricList = this.playerInfo.songLyricList
    this.$nextTick(() => {
      const lyricTextHeight = []
      this.$refs.lyricText.forEach(item => {
        lyricTextHeight.push(item.offsetHeight)
      })
      this.lyricTextHeight = lyricTextHeight
      this.lyricHeight = this.lyricWrapRef.offsetHeight
    })
  },
  methods: {
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
        this.lyricList = lyricList
        this.$nextTick(() => {
          const lyricTextHeight = []
          this.$refs.lyricText.forEach(item => {
            lyricTextHeight.push(item.offsetHeight)
          })
          this.lyricTextHeight = lyricTextHeight
          this.lyricHeight = this.lyricWrapRef.offsetHeight
        })
      })
    },
    onScroll() {
      // touchmove触发的滚动
      if (this.scrollStatus) {
        this.lyricWrapScrollTop = this.lyricWrapRef.scrollTop
        this.showIndicator = true
        if (this.timeId) {
          clearTimeout(this.timeId)
          this.timeId = null
        }
        this.timeId = setTimeout(() => {
          this.showIndicator = false
          this.scrollStatus = false
        }, 5000)
      }
    },
    onTouchmove() {
      this.scrollStatus = true
    }
  }
}
</script>

<style scoped lang="scss">
.lyric {
  height: 100%;
  position: relative;
}
.lyric-wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  .lyric-list {
    box-sizing: border-box;
    font-size: $font-base;
    text-align: center;
    .text {
      margin: 0;
      line-height: 60px;
      font-size: $font-base;
      &.active1 {
        color: $red;
      }
      &.active2 {
        color: blue;
      }
    }
  }
}

.indicator-line {
  width: 100%;
  height: 2px;
  background-color: $red;
  position: absolute;
  top: 50%;
  margin-top: -1px;
}
</style>