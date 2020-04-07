<template>
  <div
    class="flex-align-center tab-list"
    ref="tabList"
  >
    <div
      :class="['tab-item',{active:tabIndex===index}]"
      :style="[tabIndex===index?activeStyle:inactiveStyle]"
      v-for="(item,index) in tabList"
      :key='index'
      @click="selectTab(index)"
    >
      <span ref="tabItemText">{{tabKey?item[tabKey]:item}}</span>
    </div>
    <div
      class="tab-line"
      v-if="showLine"
      :style="tabItemSize[tabIndex]"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabItemSize: []
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
    },
    current: {
      type: Number
    },
    inactiveStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    activeStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showLine: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.initTabs()
  },
  watch: {
    current(val, oldVal) {
      this.tabIndex = val
      this.switchRoute()
    }
  },
  mounted() {
    if (this.showLine) {
      this.initTabLine()
    }
  },
  methods: {
    // 设置初始化tabIndex,优先匹配path路径优先
    initTabs(){
      this.tabIndex = this.current
      this.tabList.forEach((item,index)=>{
        if(item.path===this.$route.path){
          this.tabIndex = index
        }
      })
    },
    // 设置线的位置以及宽度
    initTabLine() {
      const tabItem = this.$refs.tabItemText
      const tabItemSize = []
      tabItem.forEach(item => {
        const size = {
          width: item.offsetWidth + 8 + 'px',
          transform: `translateX(${item.offsetLeft - 4}px)`
        }
        tabItemSize.push(size)
      })
      this.tabItemSize = tabItemSize
    },
    // 点击tab
    selectTab(index) {
      if (index !== this.tabIndex) {
        this.tabIndex = index
        this.$emit('change', index)
        this.switchRoute()
      }
    },
    // 切换路由
    switchRoute(){
      const nowPath =  this.$route.path
      const path = this.tabList[this.tabIndex].path||''
      if(nowPath!=path){
        this.$router.push({
          path:this.tabList[this.tabIndex].path
        })
      }
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
    white-space: nowrap;
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