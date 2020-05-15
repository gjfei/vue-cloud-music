<template>
  <div>
    <nav-bar
      titleAlign='left'
      @clickLeft='$router.back()'
    >
      <svg-icon
        slot="left"
        icon-class='arrow'
        fill='#333'
      />
      <div
        class="search-bar"
        slot="title"
      >
        <input
          type="text"
          class="input"
          v-model="keywords"
          @input="inputChange"
          :placeholder="searchDefault&&searchDefault.showKeyword"
        >
      </div>
    </nav-bar>
    <!-- <div class="title">
      历史记录
    </div> -->
    <div
      class="search-list"
      v-if='searchInfo'
    >
      <tabs-list
        :tab-list='tabList'
        tab-key='title'
        :current='tabIndex'
        @change="tabChange"
      />
      <div
        class="song-list"
        v-show="tabIndex===0"
      >
        <song-card
          v-for="(item,index) in searchInfo.songs"
          :key="item.id"
          :name='item.name'
          :singer='item.artists[0].name'
          :album='item.album.name'
          :disabled='item.dis'
          :index='index+1'
          @click.stop.native="playMusic(item.id)"
        />
      </div>
      <div
        class="album-list"
        v-show="tabIndex===1"
      >
        <play-list-card
          v-for="item in searchInfo.albums"
          :key='item.id'
          :imgUrl='item.picUrl'
          :name='item.name'
          @click.native="goDetail(item.id)"
        />
      </div>
      <div class="singer-list">
        <singer-card
          v-for="item in searchInfo.artists"
          :key='item.id'
          :img-url='item.picUrl'
          :name='item.name'
          :alias="item.alias.length>0?item.alias[0]:''"
          :show-icon='!!item.accountId'
          @click.native="goDetail(item.id)"
        />
      </div>
      <div
        class="album-list"
        v-show="tabIndex===3"
      >
        <play-list-card
          v-for="item in searchInfo.playlists"
          :key='item.id'
          :imgUrl='item.coverImgUrl'
          :name='item.name'
          :play-count='item.playCount'
          @click.native="goDetail(item.id)"
        />
      </div>
    </div>
    <div
      class="hot-list"
      v-else
    >
      <div class="title">
        热搜榜
      </div>
      <div
        class="hot-item flex-align-center"
        v-for="(item,index) in hotList"
        :key="index"
      >
        <div class="index">
          {{index+1}}
        </div>
        <div class="info">
          <div class="text flex-align-center">
            <span class="name">{{item.searchWord}}</span>
            <img
              v-if='item.iconUrl'
              :src="item.iconUrl"
              class="icon"
              alt=""
            >
            <span class="count">{{item.score}}</span>
          </div>
          <div class="desc">{{item.content}}</div>
        </div>
      </div>
    </div>
    <popup
      class="popup"
      v-model="showSuggest"
      position='top'
      :overlay='false'
      zIndex='99'
    >
      <div class="scroll">
        <div
          class="title first"
          @click="getSearchList('')"
        >
          <svg-icon icon-class='search' />
          搜索"
          <span>{{keywords}}</span>
          "
        </div>
        <div
          class="suggest-list"
          v-if='suggestList'
        >
          <div
            v-for="key in suggestList.order"
            :key="key"
          >
            <div class="title">
              <svg-icon :icon-class='suggestInfo[key].icon' />
              {{suggestInfo[key].title}}
            </div>
            <div
              class="item"
              v-for="(item,index) in suggestList[key]"
              :key="index"
              @click="getSearchList(item,suggestInfo[key].key)"
            >
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { getSearchType, getRequestSearchDefault, getRequestSearchHot, getRequestSearchSuggest, getRequestSearchList } from '@/api/search'
import { getRequestSongDetail } from '@/api/songPlayer'
import SongCard from '@/components/SongCard'
import PlayListCard from '@/components/PlayList/card'
import SingerCard from '@/components/SingerCard'
import Popup from '@/components/Popup'
import { debounce } from '@/utils'
import { mapMutations } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      searchHistoryList: [],
      searchDefault: null,
      tabList: [],
      tabIndex: 0,
      searchInfo: {
        songs: [],
        albums: [],
        artists: [],
        playlists: [],
      },
      hotList: [],
      showSuggest: false,
      suggestList: null,
      suggestInfo: null,

    }
  },
  components: {
    Popup,
    SongCard,
    SingerCard,
    PlayListCard
  },
  created() {
    this.suggestInfo = getSearchType()
    const tabList = []
    for (let key in this.suggestInfo) {
      tabList.push(this.suggestInfo[key])
    }
    this.tabList = tabList
    this.getSearchDefault()
    this.getSearchHot()
  },
  methods: {
    ...mapMutations(['setSongList', 'setSongIndex', 'setPlayerStatus']),
    getSearchDefault() {
      getRequestSearchDefault().then(res => {
        this.searchDefault = res.data
      })
    },
    getSearchHot() {
      getRequestSearchHot().then(res => {
        this.hotList = res.data
      })
    },
    inputChange() {
      debounce(this.getSearchSuggest(), 50)
    },
    getSearchSuggest() {
      if (this.keywords) {
        const param = {
          keywords: this.keywords
        }
        getRequestSearchSuggest(param).then(res => {
          this.suggestList = res.result
          if (Object.keys(res.result).length > 0) {
            this.showSuggest = true
          } else {
            this.showSuggest = false
          }
        })

      } else {
        this.suggestList = null
        this.showSuggest = false
      }
    },
    getSearchList(item, type) {
      if (!!item) {
        this.switchPage(item.id, type)
      } else {
        const { tabList, tabIndex } = this
        type = tabList[tabIndex].key
        this.showSuggest = false
        const param = {
          keywords: this.keywords,
          type
        }
        getRequestSearchList(param).then(res => {
          if (type === 1) {
            const fee = [1, 4, 16]
            const st = [-1, -200]
            res.result.songs.forEach(item => {
              if (fee.indexOf(item.fee) != -1 || st.indexOf(item.status) != -1) {
                item.dis = true
              } else {
                item.dis = false
              }
            })
            this.searchInfo.songs = [...this.searchInfo.songs, ...res.result.songs]
          }
          if (type === 10) {
            this.searchInfo.albums = [...this.searchInfo.albums, ...res.result.albums]
          }
          if (type === 1000) {
            this.searchInfo.playlists = [...this.searchInfo.playlists, ...res.result.playlists]
          }
          if (type === 100) {
            this.searchInfo.artists = [...this.searchInfo.artists, ...res.result.artists]
          }
        })
      }
    },
    tabChange(index) {
      this.tabIndex = index
      this.getSearchList()
    },
    switchPage(id, type) {
      // 1为歌曲
      if (type === 1) {
        this.playMusic(id)
      }
      // 10专辑
      if (type === 10) {
        this.showSuggest = false
        this.$router.push({
          path: `/albums-detail/${item.id}`
        })
      }
      // 100 歌手
      if (type === 100) {
        this.showSuggest = false
        this.$router.push({
          path: `/singer-detail/${item.id}`
        })
      }

      // 1000 歌单
      if (type === 1000) {
        this.showSuggest = false
        this.$router.push({
          path: `/play-list-detail/${item.id}`
        })
      }
      // 1014视频
      if (type === 1014) {
        console.log('开发中~')
      }
    },
    playMusic(id) {
      getRequestSongDetail({ ids: id }).then(res => {
        this.setSongList(res.songs)
        this.setSongIndex(0)
        // 延迟播放
        this.$nextTick(() => {
          this.setPlayerStatus(true)
        })
      })
    },
    goDetail(id) {
      const type = this.tabList[this.tabIndex].key
      this.switchPage(id)
    }
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  height: 70px;
  .input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: $font-base;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
}
.title {
  font-size: $font-lg;
  padding: 0 24px;
  box-sizing: border-box;
  color: $font-color-dark;
  font-weight: 500;
  margin-bottom: 20px;
}
.search-list {
  ::v-deep .nav {
    position: sticky;
    top: 88px;
    background-color: #fff;
    z-index: 9;
  }
  .album-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    box-sizing: border-box;
    height: 100%;
    ::v-deep .card {
      margin: 8px;
    }
  }
  .singer-list {
    padding: 0 24px;
    box-sizing: border-box;
  }
}
.hot-list {
  margin-top: 20px;
}
.hot-item {
  width: 100%;
  height: 100px;
  padding-right: 24px;
  box-sizing: border-box;
  &:nth-child(-n + 4) .index {
    color: $red;
  }
  .index {
    width: 100px;
    text-align: center;
    font-size: 36px;
    color: $font-color-light;
  }
  .info {
    flex: 1;
  }
  .name {
    font-size: $font-lg;
    color: $font-color-dark;
    font-weight: 700;
    @include text-ellipsis(1);
  }
  .icon {
    height: 30px;
    margin-left: 20px;
  }
  .count {
    font-size: $font-base;
    color: $font-color-light;
    flex: 1;
    text-align: right;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .desc {
    font-size: $font-base;
    color: $font-color-light;
    margin-top: 10px;
    @include text-ellipsis(1);
  }
}
.popup {
  ::v-deep .popup-top {
    background-color: transparent;
    top: 100px;
    padding: 0 24px;
    box-sizing: border-box;
  }
  .scroll {
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ececec;
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
  }
  .first {
    font-size: $font-base;
    font-weight: 500;
    color: $font-color-dark;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    span {
      color: #1075f1;
    }
  }
  .suggest-list {
    box-sizing: border-box;
    height: 100%;
    .title {
      padding: 0;
      margin-bottom: 20px;
      font-weight: normal;
    }
    .item {
      height: 60px;
      font-size: $font-base;
      color: $font-color-base;
      line-height: 60px;
      padding: 0 10px;
      box-sizing: border-box;
      @include text-ellipsis(1);
    }
  }
}
</style>