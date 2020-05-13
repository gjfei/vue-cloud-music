<template>
  <div class="container">
    <div
      class="tags flex-align-center"
      v-for="item in classifyList"
      :key="item.title"
    >
      <div class="tag-title">{{item.title}}：</div>
      <div class="tag-list flex-align-center">
        <div
          class="tag"
          v-for="tag in item.list"
          :key="tag.key"
        >{{tag.name}}</div>
      </div>
    </div>
    <div
      class="singer-scroll"
      ref="singerListRef"
      @scroll.passive='onScroll'
    >
      <div
        v-for="item in singerList"
        :key="item.id"
      >
        {{item.name}}
      </div>
      <div
        class="loading flex-center"
        v-if="endloading || isUpScrolling"
      >
        <svg-icon
          icon-class='loading'
          fill='#999'
          v-if="!endloading"
        />
        <div class="loading-text"> {{endloading?'到底啦~':'加载中~'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerClassify, getRequestArtistList } from '@/api/singerList'
export default {
  name: 'SingerListPage',
  data() {
    return {
      classifyList: [],
      singerList: [],
      offset: 0,
      isUpScrolling: true, // 加载中
      isLoading: false, // 加载中
      endloading: false, // 列表加载完毕
    }
  },
  created() {
    this.classifyList = getSingerClassify()
    this.getArtistList()
  },
  computed: {
    singerListRef() {
      return this.$refs.singerListRef
    }
  },
  methods: {
    getArtistList() {
      const { singerClassify, classifyIndex, isUpScrolling, isLoading, endloading, cat, offset } = this
      if (isUpScrolling && !isLoading && !endloading) {
        this.isLoading = true
        const param = {
          // offset,
          // cat: singerClassify[classifyIndex].cat,
          // limit: 50
        }
        getRequestArtistList(param).then(res => {
          if (this.offset === 0) {
            this.singerList = []
          }
          this.singerList = [...this.singerList, ...res.artists]
          this.offset += 50
          this.isUpScrolling = false
          this.isLoading = false
          if (res.artists.length === 0) {
            this.endloading = true
          }
        })
      }
    },
    selectClassify(index) {
      const { classifyIndex } = this
      if (index != classifyIndex) {
        this.classifyIndex = index
        this.offset = 0
        this.isUpScrolling = true
        this.getArtistList()
      }
    },
    onScroll() {
      if (this.singerListRef.scrollHeight - this.singerListRef.clientHeight - this.singerListRef.scrollTop <= 500) {
        this.isUpScrolling = true
        this.getArtistList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 88px);
  .tags {
    width: 100vw;
    height: 60px;
    padding: 0 24px;
    box-sizing: border-box;
    font-size: $font-base;
    /* overflow: hidden; */
    .tag-title {
      color: $font-color-dark;
    }
    .tag-list {
      flex: 1;
      overflow-x: auto;
    }
    .tag {
      height: 40px;
      padding: 0 15px;
      background-color: red;
      border-radius: 20px;
      line-height: 40px;
      margin: 0 15px;
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    .menu-scroll {
      width: 200px;
      height: 100%;
      overflow-y: auto;
      .classify {
        height: 80px;
        padding-left: 20px;
        font-size: $font-base;
        color: $font-color-dark;
        line-height: 80px;
        box-sizing: border-box;
        &.active {
          border-left: 5px solid $red;
          color: $red;
        }
      }
    }
    .singer-scroll {
      height: 100%;
      overflow-y: auto;
    }
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