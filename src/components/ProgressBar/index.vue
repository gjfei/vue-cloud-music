<template>
  <div class="progress">
    <!-- 使用circle会导致圆的边框会被剪裁 -->
    <div
      class="progress-line flex-align-center"
      :style="barStyle"
      v-if="type==='line'"
    >
      <div
        class="progress-bar"
        :style="activeBarStyle"
      />
      <div
        class="dot"
        :style="dotStyle"
      />
    </div>
    <div
      class="progress-circle"
      v-if="type==='circle'"
    >
      <svg viewBox="0 0 100 100">
        <path
          :d="trackPath"
          fill="none"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          ref="pathRef"
        />
        <path
          :d="trackPath"
          fill="none"
          :stroke="activeStroke"
          :stroke-width="percentage?strokeWidth:0"
          :style="circlePathStyle"
          stroke-linecap="round"
        />
      </svg>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathRefLength: 0
    }
  },
  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle'].indexOf(val) !== -1
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    percentage: {
      type: Number,
      default: 10,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    stroke: {
      type: String,
      default: '#e5e9f2'
    },
    activeStroke: {
      type: String,
      default: 'red'
    },
    dotColor: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    radius() {
      if (this.type === 'circle') {
        return parseInt(50 - parseFloat(this.strokeWidth) / 2, 10)
      } else {
        return 0
      }
    },
    trackPath() {
      const radius = this.radius
      return `
          M 50 50
          m 0 -${radius}
          a ${radius} ${radius} 0 1 1 0 ${radius * 2}
          a ${radius} ${radius} 0 1 1 0 -${radius * 2}
          `
    },
    circlePathStyle() {
      const { pathRefLength, percentage } = this
      return {
        strokeDasharray: `${pathRefLength * percentage / 100},${pathRefLength}`,
      }
    },
    barStyle() {
      const { stroke, strokeWidth } = this
      return {
        backgroundColor: stroke,
        height: strokeWidth / 7.5 + 'vw',
        borderRadius: strokeWidth / 15 + 'vw'
      }
    },
    activeBarStyle() {
      const { percentage, activeStroke, strokeWidth } = this
      return {
        backgroundColor: activeStroke,
        width: percentage + '%',
        borderRadius: strokeWidth / 15 + 'vw'
      }
    },
    dotStyle() {
      const { dotColor, strokeWidth } = this
      return {
        width: strokeWidth / 3.75 + 'vw',
        height: strokeWidth / 3.75 + 'vw',
        borderRadius: strokeWidth / 7.5 + 'vw',
        backgroundColor: dotColor,
        marginLeft: -strokeWidth / 7.5 + 'vw',
        zIndex: 1
      }
    }
  },
  mounted() {
    if (this.type === 'circle') {
      this.pathRefLength = this.$refs.pathRef.getTotalLength()
    }
  }
}
</script>

<style scoped lang="scss">
.progress {
  width: 100%;
  height: 100%;
  position: relative;
  &-line {
    width: 100%;
  }
  &-bar {
    height: 100%;
    position: relative;
  }
}
</style>