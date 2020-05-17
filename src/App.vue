<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
    <music-player />
  </div>
</template>
<script>
import MusicPlayer from '@/components/MusicPlayer'
export default {
  name: 'App',
  components: { MusicPlayer },
  computed: {
    key() {
      if (this.$route.meta.keepAlive) {
        return this.$route.path
      } else {
        return this.$route.path + new Date()
      }
    }
  }
}
</script>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
