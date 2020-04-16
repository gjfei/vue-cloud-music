<template>
  <div>
    <swiper
      ref="mySwiper"
      class="banner"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="item in bannerList"
        :key='item.imageUrl'
      >
        <img
          :src="item.imageUrl"
          width="100%"
          height="100%"
          alt="推荐"
          class="banner-img"
        >
        <span
          class="tag"
          :style="{backgroundColor:item.titleColor}"
        >{{item.typeTitle}}</span>
      </swiper-slide>
      <div
        class="swiper-pagination"
        slot="pagination"
      ></div>
    </swiper>
    <div class="nav-box flex-align-center">
      <div
        class="box-item"
        v-for="item in navList"
        :key='item.name'
        @click="switchPage(item.path)"
      >
        <div class="icon">
          <svg-icon
            :icon-class='item.iconClass'
            fill='#fff'
          />
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="recommend-list">
      <h1 class="title">推荐歌单</h1>
      <div class="list">
        <play-list-card
          v-for="item in playList"
          :key='item.id'
          :imgUrl='item.picUrl'
          :name='item.name'
          :playCount='item.playCount'
          @click.native="goDetail(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { getRequestBanner, getRequestRecommendList } from '@/api/recommend'
import PlayListCard from '@/components/PlayList/card'
export default {
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      bannerList: [],
      navList: [{
        name: '歌单',
        iconClass: 'song-list',
        path: '/play-list'
      }, {
        name: '排行',
        iconClass: 'rank',
        path: '/'
      }, {
        name: '歌手',
        iconClass: 'microphone',
        path: '/'
      }, {
        name: '电台',
        iconClass: 'station',
        path: '/'
      }],
      playList: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    PlayListCard
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {
    this.getBannerList()
    this.getRecommendList()
  },
  methods: {
    getRecommendList() {
      getRequestRecommendList().then(res => {
        this.playList = res.result
      })
    },
    getBannerList() {
      getRequestBanner().then(res => {
        this.bannerList = res.banners
      })
    },
    goDetail(id) {
      this.$router.push({
        path: `/play-list-detail/${id}`
      })
    },
    switchPage(path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  width: 702px;
  height: 306px;
  margin-top: 20px;
  ::v-deep.swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    &-active {
      background-color: $red;
    }
  }
  .banner-img {
    border-radius: 16px;
  }
  .tag {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #ffffff;
    font-size: 24px;
    padding: 8px 14px;
    border-radius: 16px 0 16px 0;
  }
}
.nav-box {
  .box-item {
    flex: 1;
    text-align: center;
    .icon {
      width: 100px;
      height: 100px;
      background-color: $red;
      border-radius: 50%;
      margin: 20px auto;
      font-size: 50px;
      line-height: 100px;
    }
    .name {
      font-size: $font-base;
      color: $font-color-dark;
    }
  }
}
.recommend-list {
  .title {
    font-size: $font-lg;
    padding: 24px 24px 0;
    box-sizing: border-box;
  }
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
}
</style>