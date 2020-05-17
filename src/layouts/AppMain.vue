<template>
  <div>
    <nav-bar @clickRight='clickRight'>
      <svg-icon
        slot="left"
        icon-class='menu'
        fill='#666'
      />
      <tabs-list
        slot="title"
        :tab-list='tabList'
        :show-line='false'
        routeModel
        tab-key='title'
      />
      <svg-icon
        slot="right"
        icon-class='search'
        fill='#666'
      />
    </nav-bar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      tabList: [{ title: '我的', path: '/home' }, { title: '发现', path: '/' }, { title: '云村', path: '/cloud-village' }, { title: '视频', path: '/video' }]
    }
  },
  methods: {
    clickRight() {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .active span {
  color: #333;
  font-size: 36px;
  font-weight: bold;
}
</style>