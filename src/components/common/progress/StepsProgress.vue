<template>
  <div class="steps-progress">
    <div class="progress-line" :style="'height:' + lineWidth + ';line-height:' + lineWidth
                                + ';border-radius:' + bRadius">
      <div class="progress-text">{{ title }}</div>
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
        default: ''
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
      },
      ratioExp: {
        type: String,
        default: '0'
      }
    },
    data () {
      return {
        bgWidth: '0.1%',
        lineBg: '#55aaff',
        exp: ''
      }
    },
    watch: {
      ratioExp() {
        this.handlerBgWidth()
      }
    },
    mounted() {
      this.handlerBgWidth()
    },
    methods: {
      handlerBgWidth () {
        if (this.ratioExp == 0) {
          this.bgWidth = '0.1%'
        } else if (this.ratioExp >= 100) {
          this.bgWidth = '100%'
        } else {
          this.bgWidth = this.ratioExp + '%'
        }
      }
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
    border: 1px solid #ddd;
    overflow: hidden;
  }

  .progress-text {
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
  }

  .progress-bg {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
