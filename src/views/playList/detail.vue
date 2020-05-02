<template>
  <div>
    <nav-bar
      titleAlign='left'
      :placeholder='false'
      @clickLeft='$router.back()'
    >
      <svg-icon
        slot="left"
        icon-class='arrow'
        fill='#fff'
      />
      <notice-bar
        slot="title"
        :text='navTitle'
        color='#fff'
      />
    </nav-bar>
    <div
      class="container"
      v-if="detail"
    >
      <div class="header">
        <!-- 背景虚化，本来打算用grade-js获取颜色做渐变，奈何图片跨域 -->
        <div
          class="background"
          ref="coverImgUrl"
          :style="{backgroundImage:`url(${detail.coverImgUrl+'?param=750y594'})`}"
        >
        </div>
        <div
          class="nav-background"
          :style="{backgroundImage:`url(${detail.coverImgUrl+'?param=750y594'})`,opacity:navOpacity}"
        ></div>
        <div
          class="nav-background-white"
          :style="{opacity:navOpacity}"
        ></div>
        <div
          class="info flex-align-center"
          ref="coverImgUrl"
        >
          <div class="img-wrapper">
            <img
              alt='cover'
              width='100%'
              height='100%'
              :src="detail.coverImgUrl+'?param=240y240'"
            >
            <div class="play-count">
              <svg-icon icon-class='stop' />
              {{Math.floor(detail.playCount/10000)}}万
            </div>
          </div>
          <div class="desc">
            <div class="name">
              {{detail.name}}
            </div>
            <div class="author flex-align-center">
              <img
                class="avatar"
                :src="detail.creator.avatarUrl"
                alt="avatar"
              >
              <div class="nickname">
                {{detail.creator.nickname}}
              </div>
            </div>
            <div class="signature">
              {{detail.creator.signature}}
            </div>
          </div>
        </div>
        <div class="menu flex-align-center">
          <div
            class="menu-item"
            v-for="item in menuList"
            :key="item.iconName"
          >
            <svg-icon
              :iconClass='item.iconName'
              class="icon"
            />
            <div class="tips">
              {{item.tips}}
            </div>
          </div>
        </div>
      </div>
      <div
        class="list"
        ref='songListRef'
      >
        <div class="list-top flex-align-center">
          <div
            class="flex-align-center"
            @click="playMusic"
          >
            <svg-icon
              iconClass='stop-border'
              class="icon"
            />
            <div class="title">播放全部<span>(共{{detail.tracks.length}}首)</span></div>
          </div>
          <div class="collect">
            <svg-icon
              iconClass='add'
              fill='#fff'
            />
            收藏({{detail.subscribedCount}})
          </div>
        </div>
        <song-card
          v-for="(item,index) in detail.tracks"
          :key="item.id"
          :index='index+1'
          :name='item.name'
          :singer='item.ar[0].name'
          :album='item.al.name'
          :disabled='item.dis'
          @click.stop.native="playMusic(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/NoticeBar'
import SongCard from '@/components/SongCard'
import { getRequestPlayListDetail } from '@/api/playList'
import { mapMutations } from 'vuex'
// import Grade from 'grade-js'
export default {
  name: 'PlayListDetail',
  data() {
    return {
      id: '',
      menuList: [{
        iconName: 'comment',
        tips: '0'
      }, {
        iconName: 'share',
        tips: '0'
      }, {
        iconName: 'download',
        tips: '下载'
      }, {
        iconName: 'checkbox',
        tips: '多选'
      }],
      detail: null,
      songListTop: 275,
      navOpacity: 0
    }
  },
  components: {
    NoticeBar,
    SongCard
  },
  computed: {
    navTitle() {
      return this.navOpacity >= 1 ? this.detail.name : '歌单'
    }
  },
  created() {
    this.getPlayListDetail()
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations(['setSongList', 'setSongIndex', 'setPlayerStatus']),
    getPlayListDetail() {
      getRequestPlayListDetail(this.$route.params.id).then(res => {
        this.$set(this.menuList[0], 'tips', res.playlist.commentCount)
        this.$set(this.menuList[1], 'tips', res.playlist.shareCount)
        // 判断不能播放的歌曲
        const fee = [1, 4, 16]
        const st = [-1, -200]
        res.playlist.tracks.forEach(item => {
          if (fee.indexOf(item.fee) != -1 || st.indexOf(item.st) != -1) {
            item.dis = true
          } else {
            item.dis = false
          }
        });
        this.detail = res.playlist
        this.$nextTick(() => {
          this.songListTop = this.$refs.songListRef.getBoundingClientRect().top
        })
      })
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > this.songListTop * 0.5) {
        this.navOpacity = (2 * scrollTop - this.songListTop) / this.songListTop
      } else {
        this.navOpacity = 0
      }
    },
    playMusic(index = 0) {
      this.setSongList(this.detail.tracks)
      this.setSongIndex(index)
      // 延迟播放
      this.$nextTick(() => {
        this.setPlayerStatus(true)
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .nav-bar {
  background-color: transparent;
}
.header {
  width: 750px;
  height: 594px;
  position: relative;
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(15px);
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .nav-background-white,
  .nav-background {
    width: 750px;
    height: 132px;
    position: fixed;
    top: 0;
    left: 0;
    filter: blur(15px);
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    z-index: 1;
  }
  .nav-background-white {
    background-color: #fff;
    filter: blur(0);
    z-index: 0;
  }
  .info {
    padding: 120px 40px 40px;
    box-sizing: border-box;
    .img-wrapper {
      width: 240px;
      height: 240px;
      position: relative;
    }
    .play-count {
      position: absolute;
      width: 100%;
      text-align: right;
      padding: 10px;
      box-sizing: border-box;
      z-index: 1;
      color: $font-color-pale;
      font-size: $font-base;
      top: 0;
      left: 0;
    }
    .desc {
      flex: 1;
      padding: 0 20px;
      box-sizing: border-box;
      .name {
        font-size: $font-lg;
        color: $font-color-pale;
        font-weight: bold;
      }
      .author {
        margin-top: 30px;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        .nickname {
          font-size: $font-base;
          color: $font-color-light;
          margin-left: 20px;
        }
      }
      .signature {
        font-size: $font-sm;
        color: $font-color-light;
        margin-top: 20px;
        @include text-ellipsis(2);
      }
    }
  }
  .menu {
    .menu-item {
      flex: 1;
      font-size: $font-base;
      color: #ffffff;
      text-align: center;
      .icon {
        font-size: 48px;
        margin-bottom: 20px;
      }
    }
  }
}
.list {
  margin-top: -44px;
  .list-top {
    height: 88px;
    padding: 0 10px 0 24px;
    box-sizing: border-box;
    color: $font-color-dark;
    position: sticky;
    top: 88px;
    background-color: #fff;
    border-radius: 44px 44px 0 0;
    justify-content: space-between;
    z-index: 2;
    .icon {
      font-size: 48px;
    }
    .title {
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