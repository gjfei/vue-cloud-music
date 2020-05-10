<template>
  <div class="flex-align-center card" :class="{disabled:disabled}" @click="onClick">
    <div class="left" :class="{active:active}">
      <svg-icon
        icon-class='horn'
        class="icon"
        v-if="active"
      />
      <span class="music-name">{{name}}</span>
      <span class="music-singer">-{{singer}}</span>
    </div>
    <svg-icon
      icon-class='close'
      class="icon"
      @click.stop.native="close"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    singer: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  methods: {
    close(){
      this.$emit('close')
    },
    onClick(){
      this.$emit('onClick')
    }
  }
}
</script>

<style scoped lang="scss">
.disabled {
  color: $font-color-disabled;
}
.card {
  justify-content: space-between;
  height: 80px;
}
.left {
  width: 60%;
  text-align: left;
  @include text-ellipsis(1);
  .music-name {
    font-size: $font-base;
    color: #000;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .music-singer {
    font-size: $font-sm;
    color: $font-color-light;
  }
}
.left.active {
  .icon {
    color: $red;
  }
  .music-name {
    color: $red;
  }
  .music-singer {
    color: $red;
  }
}
.icon {
  font-size: 30px;
  color: $font-color-light;
}
</style>