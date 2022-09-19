<template>
  <div class="steps-progress">
    <div class="progress-line" :style="'height:' + lineWidth + ';line-height:' + lineWidth
                                + ';border-radius:' + bRadius">
      <span class="progress-text">{{ exp }}</span>
      <div class="progress-bg" :style="'background:' + lineBg + '; width:' + bgWidth + ';height:' + lineWidth + ';'"></div>
    </div>
  </div>
</template>
<!--
三色模式：
 0-50%： 绿色
 50-90%： 黄色
 90-100%： 红色
 -->
<script>
  export default {
    name: 'StepsProgress',
    props: {
      title: {
        type: String,
        default: '0%'
      },
      sort: {
        type: Number,
        default:0
      },
      lineWidth: {
        type: String,
        default: '24px'
      },
      bgColor: {
        type: String,
        default: '#55aaff'
      },
      bRadius: {
        type: String,
        default: '0px',
      }
    },
    data () {
      return {
        bgWidth: '0.1%',
        lineBg: '#55aaff',
        exp: '',
        realm: [{
          name: '①',
          min: 0,
          max: 10
        }, {
          name: '②',
          min: 11,
          max: 20
        }, {
          name: '③',
          min: 21,
          max: 30
        }, {
          name: '④',
          min: 31,
          max: 40
        }]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

  .steps-progress {
    margin: 10px 0;
  }

  .progress-line {
    width: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
  }

  .progress-text {
    position: absolute; z-index: 99;
  }

  .progress-bg {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
