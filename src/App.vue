<template>
  <div id="app">
    <router-view />
    <music-player />
  </div>
</template>
<script>
import MusicPlayer from '@/components/MusicPlayer'
export default {
  name: 'App',
  components: { MusicPlayer }
}
</script>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
