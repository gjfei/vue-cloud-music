<template>
  <div class="container">
    <div class="title">官方榜</div>
    <div class="list">
      <div
        class="item"
        v-for="item in authorityList"
        :key='item.id'
        @click="goDetail(item.id)"
      >
        <play-list-card
          :imgUrl='item.coverImgUrl'
          :tips='item.updateFrequency'
        />
        <div class="song">
          <div
            v-for="(song,idx) in item.tracks"
            :key="idx"
          >
            {{idx+1}} {{song.first}}{{song.second}}
          </div>
        </div>
      </div>
    </div>
    <div class="title">全球榜</div>
    <div class="list flex-align-center">
      <play-list-card
        v-for="item in globalList"
        :key='item.id'
        :imgUrl='item.coverImgUrl'
        :tips='item.updateFrequency'
        @click.native="goDetail(item.id)"
      />
    </div>
  </div>
</template>

<script>
import { getRequestRankList } from '@/api/playList'
import PlayListCard from '@/components/PlayList/card'
export default {
  name: 'rank',
  data() {
    return {
      authorityList: [],
      globalList: [],
    }
  },
  components: {
    PlayListCard
  },
  created() {
    this.getRankList()
  },
  methods: {
    getRankList() {
      getRequestRankList().then(res => {
        let authorityList = []
        let globalList = []
        for (let i = 0, len = res.list.length; i < len; i++) {
          const item = res.list[i]
          if (item.tracks.length > 0) {
            authorityList.push(item)
          } else {
            globalList.push(item)
          }
        }
        this.authorityList = authorityList
        this.globalList = globalList
      })
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
.container {
  .title {
    font-size: 36px;
    color: #000;
    padding: 40px 24px 20px;
    box-sizing: border-box;
  }
  .list {
    flex-wrap: wrap;
    padding: 0 15px;
    box-sizing: border-box;
    height: 100%;
    ::v-deep .card {
      margin: 8px;
    }
    .item {
      display: flex;
    }
    .song {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 20px;
      box-sizing: border-box;
      font-size: $font-sm;
      color: $font-color-base;
    }
  }
}
</style>