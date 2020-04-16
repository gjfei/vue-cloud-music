<template>
  <div
    class="list"
    @scroll.passive='onScroll'
    ref="playListRef"
  >
    <play-list-card
      v-for="item in playList"
      :key='item.id'
      :imgUrl='item.coverImgUrl'
      :name='item.name'
      :playCount='item.playCount'
      @click.native="goDetail(item.id)"
    />
    <div
      class="loading flex-center"
      v-if="isUpScrolling"
    >
      <svg-icon
        icon-class='loading'
        fill='#999'
      />
      <div class="loading-text">加载中~</div>
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
      isUpScrolling: true,
      isLoading: false,
      offsetCount: 0
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
      if (this.isUpScrolling && !this.isLoading) {
        this.isLoading = true
        getRequestPlayList(this.cat, this.offsetCount).then(res => {
          this.offsetCount += 30
          this.playList = [...this.playList, ...res.playlists]
          this.isUpScrolling = false
          this.isLoading = false
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
  padding: 0 15px;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  ::v-deep .card {
    margin: 8px;
  }
}
.loading {
  height: 60px;
  width: 100%;
  text-align: center;
  .loading-text {
    margin-left: 20px;
  }
}
</style>