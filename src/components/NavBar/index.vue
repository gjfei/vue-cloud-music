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
      <div :class="'title ' + titleAlign">
        {{$slots.title?'':title}}
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
    <div class="placeholder" v-if="placeholder"></div>
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
    rightIcon: {
      type: String,
      default: ''
    },
    titleAlign: {
      type: String,
      default: 'center',
      validator: value => {
        return ['center', 'left', 'right'].indexOf(value) !== -1
      }
    },
    placeholder:{
      type:Boolean,
      default:true
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
  width: 100vw;
  height: 89px;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 32px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  .title {
    color: #333;
    font-size: 34px;
    &.left {
      flex: 1;
      text-align: left;
      padding: 0 20px;
      box-sizing: border-box;
    }
    &.center {
      width: 60%;
      text-align: center;
    }
    &.right {
      flex: 1;
      text-align: right;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
.placeholder {
  width: 100vw;
  height: 88px;
}
</style>