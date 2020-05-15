<template>
  <div class="container">
    <div class="sticky">
      <div
        class="tags flex-align-center"
        v-for="item in classifyList"
        :key="item.key"
      >
        <!-- <div class="tag-title">{{item.title}}：</div> -->
        <div class="tag-list flex-align-center">
          <div
            class="tag"
            :class="{active:classifyInfo[item.key]===tag.val}"
            v-for="tag in item.list"
            :key="tag.val"
            @click="selectClassify(item.key,tag.val)"
          >{{tag.name}}</div>
        </div>
      </div>
    </div>
    <div
      class="singer-list"
      ref="singerListRef"
    >
      <singer-card
        v-for="item in singerList"
        :key="item.id"
        :img-url='item.picUrl'
        :name='item.name'
        :alias="item.alias.length>0?item.alias[0]:''"
        :show-icon='!!item.accountId'
        @click.native="goDetail(item.id)"
      />
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
import SingerCard from '@/components/SingerCard'
import { getSingerClassify, getRequestArtistList } from '@/api/singerList'
export default {
  name: 'Singer',
  data() {
    return {
      classifyList: [],
      classifyInfo: {
        type: -1,
        area: -1,
        initial: ''
      },
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
  components: {
    SingerCard
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    singerListRef() {
      return this.$refs.singerListRef
    }
  },
  methods: {
    getArtistList() {
      const { singerClassify, classifyInfo, isUpScrolling, isLoading, endloading, cat, offset } = this
      if (isUpScrolling && !isLoading && !endloading) {
        this.isLoading = true
        const param = {
          offset,
          limit: 50,
          ...classifyInfo
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
    // 切换分类
    selectClassify(key, val) {
      if (this.classifyInfo[key] != val) {
        this.classifyInfo[key] = val
      } else {
        this.classifyInfo[key] = ''
      }
      this.isUpScrolling = true
      this.singerList = []
      document.documentElement.scrollTop = 0
      this.getArtistList()
    },
    handleScroll(e) {
      const scrollTop = document.documentElement.scrollTop
      if (this.singerListRef.scrollHeight - scrollTop <= 1000) {
        this.isUpScrolling = true
        this.getArtistList()
      }
    },
    goDetail(id) {
      this.$router.push({
        path: `/singer-detail/${id}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 88px;
  z-index: 99;
  padding-top: 20px;
  box-sizing: border-box;
  background-color: #f7f7f7;
}
.container {
  padding: 0 24px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  min-height: 100vh;
}
.tags {
  width: 100%;
  height: 60px;
  font-size: $font-base;
  .tag-title {
    color: $font-color-dark;
  }
  .tag-list {
    flex: 1;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .tag {
    height: 40px;
    padding: 0 25px;
    border-radius: 20px;
    line-height: 35px;
    flex-shrink: 0;
    background-color: #fff;
    margin: 0 5px;
    &.active {
      background-color: rgba($red, 0.8);
      color: #fff;
    }
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