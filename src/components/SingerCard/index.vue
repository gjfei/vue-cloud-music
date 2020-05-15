<template>
  <div class="singer-item flex-align-center">
    <f-image
      :src="imgUrl+'?param=160y160'"
      class="img"
    />
    <div class="name">
      {{name}}
      <span v-if='alias'>
        ({{alias}})
      </span>
    </div>
    <div
      class="tips flex-align-center"
      v-if='showIcon'
    >
      <svg-icon
        icon-class='people'
        class="icon"
      />
      已入驻
    </div>
  </div>
</template>

<script>
import FImage from '@/components/FImage'

export default {
  data() {
    return {

    }
  },
  components:{FImage},
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    alias: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.singer-item {
  margin-top: 20px;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
  }
  .name {
    flex: 1;
    font-size: $font-base;
    padding: 0 20px;
    box-sizing: border-box;
    @include text-ellipsis(1);
    span {
      font-size: $font-sm;
      color: $font-color-base;
    }
  }
  .icon {
    font-size: $font-base;
    color: $red;
    justify-content: center;
  }
  .tips {
    color: $font-color-light;
    font-size: $font-sm;
  }
}
</style>