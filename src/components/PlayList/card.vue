<template>
  <div class="card">
    <div class="img-wrapper">
      <f-image :src="imgUrl+'?param=224y224'" />
      <div
        class="play-count"
        v-if='playCount'
      >
        <svg-icon icon-class='stop' />
        {{Math.floor(playCount/10000)}}万
      </div>
      <div class="tips">{{tips}}</div>
    </div>
    <div
      class="name"
      v-if='name'
    >
      <div class="text">{{name}}</div>
    </div>
  </div>
</template>

<script>
import FImage from '@/components/FImage'
export default {
  data() {
    return {
      loading: true,
      error: false
    }
  },
  props: {
    imgUrl: {
      type: String
    },
    name: {
      type: String
    },
    playCount: {
      type: Number
    },
    tips: {
      type: String
    }
  },
  components: {
    FImage
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
.tips {
  position: absolute;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  color: $font-color-pale;
  font-size: $font-base;
  bottom: 0;
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
  padding-bottom: 20px;
  box-sizing: border-box;
  font-size: $font-sm;
  color: $font-color-dark;
  .text {
    @include text-ellipsis(2);
  }
}
</style>