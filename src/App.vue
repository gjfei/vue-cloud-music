<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.noCache" />
    </keep-alive>
    <router-view v-if="$route.meta.noCache" />
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
  width: 0;
  background: transparent;
}
</style>
