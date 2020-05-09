<template>
  <div class="nav">
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
        ref="tabLine"
      ></div>
    </div>
  </div>
</template>

<script>
import { setScrollLeft } from '@/utils'
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
      type: Number,
      default: 0
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
    },
    routeModel: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.initTabs()
  },
  watch: {
    current(val, oldVal) {
      this.tabIndex = val
      this.switchRoute()
    },
    tabIndex(val) {
      // 设置滚动位置
      const { tabItemText, tabList } = this.$refs
      const to = tabItemText[val].offsetLeft - (tabList.offsetWidth - tabItemText[val].offsetWidth) / 2
      const from = tabList.scrollLeft
      setScrollLeft(this.$refs.tabList, to, from)
    },
    tabList() {
      this.$nextTick(() => {
        this.initTabLine()
      })
    }
  },
  methods: {
    // 设置初始化tabIndex,优先匹配path路径优先
    initTabs() {
      this.tabIndex = this.current
      this.tabList.forEach((item, index) => {
        if (item.path === this.$route.path) {
          this.tabIndex = index
        }
      })
    },
    // 设置线的位置以及宽度
    initTabLine() {
      if (this.showLine) {
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
      }
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
    switchRoute() {
      if (this.routeModel) {
        const nowPath = this.$route.path
        const path = this.tabList[this.tabIndex].path || ''
        if (nowPath != path) {
          this.$router.push({
            path: this.tabList[this.tabIndex].path
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  position: relative;
  width: 100%;
  height: 88px;
}
.tab-list {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  position: absolute;
  top: 0;
  left: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  .tab-item {
    flex: 1;
    font-size: $font-color-base;
    color: $font-color-dark;
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
    transition: all 0.3s linear;
  }
}
</style>