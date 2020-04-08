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
      <div class="box-item">
        <div class="icon">
          <svg-icon
            iconClass='song-list'
            fill='#fff'
          />
        </div>
        <div class="name">歌单</div>
      </div>
      <div class="box-item">
        <div class="icon">
          <svg-icon
            iconClass='rank'
            fill='#fff'
          />
        </div>
        <div class="name">排行</div>
      </div>
      <div class="box-item">
        <div class="icon">
          <svg-icon
            iconClass='microphone'
            fill='#fff'
          />
        </div>
        <div class="name">歌手</div>
      </div>
      <div class="box-item">
        <div class="icon">
          <svg-icon
            iconClass='station'
            fill='#fff'
          />
        </div>
        <div class="name">电台</div>
      </div>
    </div>
    <div class="recommend-list">
      <h1 class="title">推荐歌单</h1>
      <play-list-card />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { getRequestBanner } from '@/api/recommend'
import playListCard from '@/components/PlayList/card'
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
      bannerList: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    playListCard
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {
    this.getBannerList()
  },
  methods: {
    getBannerList() {
      getRequestBanner().then(res => {
        this.bannerList = res.banners
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
    padding-left: 24px;
  }
}
</style>