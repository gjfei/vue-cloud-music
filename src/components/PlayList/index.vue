<template>
  <div
    class="list"
    @scroll.passive='onScroll'
    ref="playListRef"
  >
    <div
      class="play-item"
      v-for="item in playList"
      :key='item.id'
    >
      <play-list-card
        :imgUrl='item.coverImgUrl'
        :name='item.name'
        :playCount='item.playCount'
        @click.native="goDetail(item.id)"
      />
    </div>
    <div
      class="loading flex-center"
      v-if="endloading || isUpScrolling"
    >
      <svg-icon
        icon-class='loading'
        class="icon"
        fill='#999'
        v-if="!endloading"
      />
      <div class="loading-text"> {{endloading?'到底啦~':'加载中~'}}</div>
    </div>
  </div>
</template>

<script>
import PlayListCard from './card'
import { getRequestPlayList } from '@/api/playList'
export default {
  data() {
    return {
      playList: [],
      isUpScrolling: true, // 加载中
      isLoading: false, // 加载中
      endloading: false, // 列表加载完毕
      offset: 0
    }
  },
  props: {
    cat: {
      type: String,
      default: ''
    }
  },
  components: {
    PlayListCard
  },
  created() {
    this.getPlayList()
  },
  computed: {
    playListRef() {
      return this.$refs.playListRef
    }
  },
  watch: {
    cat(val) {
      this.playList = []
      this.getPlayList()
    }
  },
  methods: {
    getPlayList() {
      const { isUpScrolling, isLoading, endloading, cat, offset } = this
      if (isUpScrolling && !isLoading && !endloading) {
        this.isLoading = true
        const param = {
          cat,
          offset,
          limit: 30
        }
        getRequestPlayList(param).then(res => {
          this.offset += 30
          this.playList = [...this.playList, ...res.playlists]
          this.isUpScrolling = false
          this.isLoading = false
          if (this.playList.length === res.total) {
            this.endloading = true
          }
        })
      }
    },
    onScroll() {
      if (this.playListRef.scrollHeight - this.playListRef.clientHeight - this.playListRef.scrollTop <= 500) {
        this.isUpScrolling = true
        this.getPlayList()
      }
    },
    goDetail(id) {
      this.$router.push({
        path: `/play-list-detail/${id}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  .play-item {
    width: 250px;
    display: flex;
    justify-content: center;
  }
}
.loading {
  height: 60px;
  width: 100%;
  text-align: center;
  .icon {
    margin-right: 20px;
  }
  .loading-text {
    font-size: $font-sm;
    color: $font-color-dark;
  }
}
</style>