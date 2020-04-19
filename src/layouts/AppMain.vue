<template>
  <div>
    <nav-bar title="1">
      <svg-icon
        slot="left"
        icon-class='menu'
        fill='#666'
      />
      <tabs-list
        slot="title"
        :tab-list='tabList'
        :showLine='false'
        :activeStyle='activeStyle'
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
      tabList: [{ title: '推荐', path: '/' }, { title: '发现', path: '/discover' }, { title: '云村', path: '/clould-village' }, { title: '视频', path: '/video' }],
      activeStyle: {
        color: '#333',
        fontSize: '20px',
        fontWeight: 'bold'
      },
    }
  }
}
</script>

<style scoped lang="scss">
</style>