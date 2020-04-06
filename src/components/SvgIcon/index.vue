<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href=" `#icon-${this.iconClass}`" :fill='fill'/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
