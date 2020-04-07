<template>
  <div>

    推荐
  </div>
</template>

<script>
import {getRequestBanner} from '@/api/recommend'
export default {
  data() {
    return {

    }
  },
  components: {

  },
  created(){
    getRequestBanner()
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
</style>