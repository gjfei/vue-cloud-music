<template>
  <div class="song-list">
    <div class="header flex-align-center">
      <svg-icon
        iconClass='play-border'
        class="icon"
      />
      <div class="title">播放全部<span>(共{{songList.length}}首)</span></div>
      <div class="collect">
        <svg-icon
          iconClass='add'
          fill='#fff'
        />
        收藏({{subscribedCount}})
      </div>
    </div>
    <song-item
      v-for="(item,index) in songList"
      :key="item.id"
      :index='index+1'
      :name='item.name'
      :singer='item.ar[0].name'
      :album='item.al.name'
    />
  </div>
</template>

<script>
import SongItem from './SongItem'
export default {
  data() {
    return {

    }
  },
  components: {
    SongItem
  },
  props: {
    songList: {
      type: Array,
      default: () => {
        return []
      }
    },
    subscribedCount: {
      type: Number,
      default: 0
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.song-list {
  .header {
    height: 88px;
    padding: 0 10px 0 24px;
    box-sizing: border-box;
    color: $font-color-dark;
    position: sticky;
    top: 88px;
    background-color: #fff;
    border-radius: 44px 44px 0 0;
    z-index: 2;
    .icon {
      font-size: 48px;
    }
    .title {
      flex: 1;
      font-size: $font-lg;
      margin-left: 20px;
      span {
        font-size: $font-sm;
        color: $font-color-light;
      }
    }
    .collect {
      height: 68px;
      border-radius: 34px;
      background-color: $red;
      color: $font-color-pale;
      font-size: $font-sm;
      line-height: 68px;
      padding: 0 20px;
    }
  }
}
</style>