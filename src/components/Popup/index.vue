<template>
  <transition>
    <div
      class="popup"
      v-show="value"
      @click="close"
    >
      <div
        class="popup-bottom round"
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
    }
  },
  watch: {
    // 防止滚动穿透
    value(val) {
      if (val) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  },
  components: {

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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 200;
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