<template>
  <transition>
    <div
      class="popup"
      v-show="value"
      :style="{zIndex:zIndex,backgroundColor:overlay?'rgba(0, 0, 0, 0.3)':''}"
      @click="close"
    >
      <div
        :class="['popup-'+position,{round:round}]"
        @click.stop="()=>{}"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 200
    },
    position: {
      type: String,
      default: 'bottom',
      validator: val => {
        const arr = ['top', 'bottom', 'left', 'right', 'center']
        return arr.indexOf(val) != -1
      }
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 防止滚动穿透
    value(val) {
      if (val) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  },
  destroyed(){
    document.body.classList.remove('overflow-hidden')
  },
  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  &-bottom {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    min-height: 30vh;
    max-height: 60vh;
    &.round {
      border-radius: 30px 30px 0 0;
    }
  }
  &-top {
    width: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 30vh;
    max-height: 60vh;
    &.round {
      border-radius: 0 0 30px 30px;
    }
  }
  &-left {
    height: 100vh;
    min-width: 30vw;
    max-width: 90vw;
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;

    &.round {
      border-radius: 0 30px 30px 0;
    }
  }
}
</style>