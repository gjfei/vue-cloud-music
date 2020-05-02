<template>
  <transition>
    <div class="popup">

    </div>
  </transition>
</template>

<script>
export default {
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
.popup {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.3);
  z-index: 99;
}
</style>