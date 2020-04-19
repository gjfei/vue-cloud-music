<template>
  <div class="card">
    <div class="img-wrapper">
      <img
        alt='music'
        width='100%'
        height='100%'
        :src="imgUrl+'?param=224y224'"
        @load='onLoad'
        @error='loadError'
      >
      <div class="play-count">
        <svg-icon icon-class='play' />
        {{Math.floor(playCount/10000)}}万
      </div>
      <div
        class="placeholder flex-center"
        v-if="loading&&!error"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        class="placeholder flex-center erro"
        v-else-if="error"
      >
        <svg-icon
          icon-class='error'
          fill='#999'
        />
      </div>
    </div>
    <div class="name">
      {{name}}
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      error: false
    }
  },
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    playCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 图片加载完成
    onLoad(e) {
      this.loading = false
    },
    //图片加载失败
    loadError(e) {
      this.error = true
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes zoom {
  to {
    transform: scaleY(0.5);
  }
  from {
    transform: scaleY(1);
  }
}
.card {
  width: 224px;
  height: 300px;
}
.img-wrapper {
  width: 224px;
  height: 224px;
  position: relative;
}
.play-count {
  position: absolute;
  width: 100%;
  text-align: right;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  color: $font-color-pale;
  font-size: $font-base;
  top: 0;
  left: 0;
}
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 80px;
  z-index: 1;
  > div {
    width: 15px;
    height: 70px;
    background-color: #999;
    border-radius: 8px;
    margin: 0 8px;
    animation-name: zoom;
    animation-duration: 0.2s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    &:first-child {
      animation-delay: 0.2s;
    }
    &:last-child {
      animation-delay: 0.6s;
    }
  }
}
.name {
  padding-top: 15px;
  box-sizing: border-box;
  font-size: $font-sm;
  color: $font-color-dark;
  @include text-ellipsis(2);
}
</style>