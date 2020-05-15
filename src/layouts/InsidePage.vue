<template>
  <div>
    <nav-bar
      :title="$route.meta.title"
      titleAlign='left'
      @clickLeft='$router.back()'
    >
      <svg-icon
        slot="left"
        icon-class='arrow'
        fill='#333'
      />
    </nav-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'InsidePage',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
</style>