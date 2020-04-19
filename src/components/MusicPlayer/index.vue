<template>
  <div class="music-player">
    <div class="min-player flex-align-center">
      <img
        src=""
        alt="music"
        class="music-cover"
      >
      <div class="music-info">
        <div class="music-name">歌曲名</div>
        <div class="music-singer">作者</div>
      </div>
      <div class="player-btn">
        <ProgressBar
          type='circle'
          :percentage='percentage'
        />
      </div>
      <div class="">播放</div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
export default {
  data() {
    return {
      percentage: 50
    }
  },
  components: {
    ProgressBar
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.min-player {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 88px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  .music-cover {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: red;
  }
  .music-info {
    flex: 1;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
    .music-name {
      font-size: $font-base;
      color: #000;
      @include text-ellipsis(1);
    }
    .music-singer {
      font-size: $font-base;
      color: $font-color-light;
      @include text-ellipsis(1);
    }
  }
  .player-btn {
    width: 60px;
    height: 60px;
  }
}
.placeholder {
  height: 88px;
}
</style>