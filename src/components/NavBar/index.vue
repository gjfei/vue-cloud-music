<template>
  <div>
    <div class="flex-align-center nav-bar">
      <div
        class="left"
        @click="clickLeft"
      >
        <svg-icon
          :icon-class='leftIcon'
          v-if="leftIcon"
        />
        <slot name='left' />
      </div>
      <div class="title">
        {{title}}
        <slot name='title' />
      </div>
      <div
        class="right"
        @click="clickRight"
      >
        <svg-icon
          :icon-class='rightIcon'
          v-if="rightIcon"
        />
        <slot name='right' />
      </div>
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon:{
      type: String,
      default: ''
    }
  },
  methods: {
    clickLeft() {
      this.$emit('clickLeft')
    },
    clickRight() {
      this.$emit('clickRight')
    }
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  height: 89px;
  justify-content: space-between;
  padding: 0 32px;
  box-sizing: border-box;
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  .title {
    width: 60%;
    text-align: center;
    color: #333;
    font-size: 34px;
  }
}
.empty {
  width: 100%;
  height: 88px;
}
</style>