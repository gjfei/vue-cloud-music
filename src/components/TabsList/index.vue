<template>
  <div class="flex-align-center tab-list" ref="tabList">
    <div
      :class="['tab-item',{active:tabIndex===index}]"
      v-for="(item,index) in tabList"
      :key='index'
      @click="selectTab(index)"
    >
      <span ref="tabItemText">{{tabKey?item[tabKey]:item}}</span>
    </div>
    <div class="tab-line" :style="tabItemSize[tabIndex]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabItemSize:[]
    }
  },
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabKey: {
      type: String,
      default: ''
    }
  },
  mounted(){
    this.initTabLine()
  },
  methods: {
    selectTab(index) {
      if (index !== this.tabIndex) {
        this.tabIndex = index
        this.$emit('change', index)
      }
    },
    initTabLine(){
      // 设置线的位置以及宽度
      const tabItem = this.$refs.tabItemText
      const tabItemSize = []
      tabItem.forEach(item=>{
        const size = {
          width: item.offsetWidth+8+'px',
          transform: `translateX(${item.offsetLeft-4}px)`
        }
        tabItemSize.push(size)
      })
      this.tabItemSize = tabItemSize
    }
  }
}
</script>

<style scoped lang="scss">
.tab-list {
  height: 88px;
  overflow: hidden;
  overflow-x: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .tab-item {
    flex: 1;
    font-size: $font-base;
    color: $font-dark;
    padding: 0 16px;
    box-sizing: border-box;
    line-height: 88px;
    text-align: center;
    &.active {
      color: $red;
    }
  }
  .tab-line {
    height: 4px;
    background-color: $red;
    position: absolute;
    bottom: 0;
    transition: 0.3s;
  }
}
</style>