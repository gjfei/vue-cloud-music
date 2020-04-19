<template>
  <div class="container">
    <tabs-list
      :tab-list='tabList'
      :current='tabIndex'
      tab-key='name'
      @change='setSwiperIndex'
    />
    <swiper
      ref="mySwiper"
      class="list-box"
      :options="swiperOptions"
      @slide-change-transition-end='swiperChange'
    >
      <template>
        <swiper-slide
          :key='item.id'
          v-for="item in swiperList"
        >
          <PlayList
            :cat='item.name'
            v-if="item.active"
          />
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script>
import { getRequestPlayListCatlist } from '@/api/playList'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import PlayList from '@/components/PlayList'
export default {
  name: 'PlayList',
  data() {
    return {
      tabList: [],
      tabIndex: 0,
      swiperOptions: {
        observer: true,
        observeSlideChildren: true
      },
      swiperList: [],
      swiperIndex: 0
    }
  },
  created() {
    this.getPlayListCatlist()
  },
  components: {
    Swiper,
    SwiperSlide,
    PlayList
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    getPlayListCatlist() {
      getRequestPlayListCatlist().then(res => {
        const tabList = [{ name: '全部', id: 0, active: true }]
        res.sub.forEach((item, index) => {
          const obj = {
            name: item.name,
            id: index + 1,
            active: false
          }
          tabList.push(obj)
        })
        this.tabList = tabList
        this.swiperList = [{ name: '全部', id: 0, active: true }, { name: '占位', id: -1, active: false }]
      })
    },
    setSwiperIndex(index) {
      if (index === 0) {
        this.swiperIndex = 0
        this.swiperList = [{ name: '全部', id: 0, active: true }, { name: '占位', id: -1, active: false }]
      } else if (index === this.tabList.length - 1) {
        this.swiperIndex = 2
        this.swiperList = [{ name: '占位', id: -1, active: false }, { name: '全部', id: 0, active: true }]
      } else {
        this.swiperIndex = 1
        const obj = this.tabList[index]
        obj.active = true
        this.swiperList = [{ name: '占位', id: -2, active: false }, obj, { name: '占位', id: -1, active: false }]
      }
      this.swiper.slideTo(this.swiperIndex, 0, false)
      this.tabIndex = index
    },
    swiperChange() {
      if (this.swiper.activeIndex > this.swiperIndex) {
        this.tabIndex += 1
        const obj = this.tabList[this.tabIndex]
        obj.active = true
        if (this.tabIndex === this.tabList.length - 1) {
          this.swiperList.splice(2, 1, obj)
        } else {
          this.swiperList.splice(this.swiper.activeIndex, 2, obj, { name: '占位', id: -1, active: false })
        }
        if (this.swiperList.length > 3) {
          this.swiperList.shift()
          this.swiper.updateSlides()
          this.swiper.slidePrev(0, false)
        }
      } else {
        this.tabIndex -= 1
        const obj = this.tabList[this.tabIndex]
        obj.active = true
        if (this.tabIndex === 0) {
          this.swiperList.splice(0, 1, obj)
        } else {
          this.swiperList.splice(this.swiper.activeIndex, 1, { name: '占位', id: -1, active: false }, obj)
        }
        if (this.swiperList.length > 3) {
          this.swiperList.pop()
          this.swiper.updateSlides()
          this.swiper.slideNext(0, false)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  ::v-deep .nav {
    position: fixed;
    top: 88px;
    background-color: #fff;
    z-index: 99;
  }
  .list-box {
    height: calc(100vh - 88px);
    padding-top: 88px;
    box-sizing: border-box;
  }
}
</style>