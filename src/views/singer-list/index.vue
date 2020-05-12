<template>
  <div class="container">
    <div class="letter">A</div>
    <div class="flex-align-center content">
      <div class="menu-scroll">
        <div
          v-for="(item,index) in singerClassify"
          :key="item.name"
          class="classify"
          :class="{active:classifyIndex===index}"
          @click="selectClassify(index)"
        >
          {{item.name}}
        </div>
      </div>
      <div class="singer-scroll">

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
      singerClassify: [],
      classifyIndex: 0
    }
  },
  components: {

  },
  created() {
    this.singerClassify = getSingerClassify()
    this.getArtistList()
  },
  methods: {
    getArtistList() {
      getRequestArtistList().then(res => {
        console.log(res)
      })
    },
    selectClassify(index) {
      const { classifyIndex } = this
      if (index != classifyIndex) {
        this.classifyIndex = index
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
  .letter {
    width: 100vw;
    height: 60px;
    overflow-x: auto;
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
      flex: 1;
      overflow-y: auto;
      background-color: blue;
    }
  }
}
</style>