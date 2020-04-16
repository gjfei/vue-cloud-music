<template>
  <div class="song-item flex-align-center">
    <div class="left flex-align-center">
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
      iconClass='play-square'
      fill='#999'
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
    index:[Number,String],
    name:{
      type:String,
      required:true
    },
    singer:String,
    album:String
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
  .left {
    width: 68px;
    height: 68px;
    color: $font-color-base;
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
    .name {
      color: $font-color-base;
      font-size: $font-lg;
      @include text-ellipsis(1);
    }
    .desc {
      color: $font-color-base;
      font-size: $font-base;
      margin-top: 15px;
      @include text-ellipsis(1);
    }
  }
  .icon {
    font-size: 48px;
  }
}
</style>