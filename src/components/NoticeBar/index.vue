<template>
  <div class="notice-bar" :style="{background:background,color:color}">
    <div
      class="wrap flex-align-center"
      ref="wrap"
    >
      <div
        class="content"
        :class="animationClass"
        ref="content"
        :style="contentStyle"
        @animationend='onAnimationEnd'
        @webkit-animation-end='onAnimationEnd'
      >
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duration: 0,
      wrapWidth: 0,
      offsetWidth: 0,
      firstRound: true,
      animationClass: ''
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 50
    },
    delay: {
      type: Number,
      default: 1
    },
    color:{
      type:String,
      default:'#333'
    },
    background:{
      type:String,
      default:'transparent'
    }
  },
  computed: {
    contentStyle() {
      const style = {
        paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      }
      return style
    }
  },
  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          if (!wrap || !content) {
            return
          }
          const wrapWidth = wrap.offsetWidth
          const offsetWidth = content.clientWidth
          if (offsetWidth > wrapWidth) {
            this.wrapWidth = wrapWidth
            this.offsetWidth = offsetWidth
            this.duration = offsetWidth / this.speed
            this.animationClass = 'play'
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    onAnimationEnd() {
      this.firstRound = false
      this.$nextTick(() => {
        this.duration = (this.offsetWidth + this.wrapWidth) / this.speed
        this.animationClass = 'play infinite'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes notice-bar-play {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes notice-bar-play-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
.notice-bar {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.wrap {
  overflow: hidden;
  position: relative;
  height: 88px;
  .content {
    position: absolute;
    white-space: nowrap;
    &.play {
      animation-fill-mode: both;
      animation-timing-function: linear;
      animation-name: notice-bar-play;
      &.infinite {
        animation-name: notice-bar-play-infinite;
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>