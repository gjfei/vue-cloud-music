<template>
  <div
    class="song-item flex-align-center"
    :class="{disabled:disabled}"
  >
    <div
      class="left flex-align-center"
      v-if='index'
    >
      <div class="index">
        {{index}}
      </div>
    </div>
    <div class="info">
      <div class="name">
        {{name}}
      </div>
      <div class="desc">
        {{singer}}-{{album}}
      </div>
    </div>
    <svg-icon
      class="icon"
      iconClass='stop-square'
    />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    index: [Number, String],
    name: {
      type: String,
      required: true
    },
    singer: String,
    album: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.song-item {
  width: 750px;
  height: 120px;
  padding: 0 24px;
  box-sizing: border-box;
  background-color: #fff;
  color: $font-color-base;
  &.disabled {
    color: $font-color-disabled;
  }
  .left {
    width: 68px;
    height: 68px;
    font-size: $font-base;
    .index {
      width: 48px;
      height: 48px;
      text-align: center;
    }
  }
  .info {
    flex: 1;
    padding-right: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .name {
      font-size: $font-lg;
      @include text-ellipsis(1);
    }
    .desc {
      margin-top: 15px;
      @include text-ellipsis(1);
    }
  }
  .icon {
    font-size: 48px;
  }
}
</style>