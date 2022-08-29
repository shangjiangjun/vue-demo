<template>
  <!-- v-on:click="count++"  -->
  <button v-on:click="$emit('discount')">{{ title }}了 {{ count }}次</button>
</template>

<script>
  export default {
    name: 'BaseCounter',
    props:  ['title'],
    data() {
      return {
        count: 0
      }
    }
  }
</script>

<style scoped>
</style>
