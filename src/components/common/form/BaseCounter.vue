<template>
  <!-- v-on:click="count++"  -->
  <!-- 使用事件抛出一个值 -->
  <button v-on:click="$emit('discount', 10000)">{{ title }}了 {{ count }}次</button>
</template>

<script>
  export default {
    name: 'BaseCounter',
    props:  ['title', 'count'],
    data() {
      return {}
    }
  }
</script>

<style scoped>
</style>
