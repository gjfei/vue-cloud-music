<template>
  <div class="home">
    <nav-bar title="网易云" />
    <tabs-list :tab-list='tabList'></tabs-list>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      tabList:['tab1','tab1','tab1']
    }
  }
}
</script>
