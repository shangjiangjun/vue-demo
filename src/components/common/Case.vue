<template>
  <div class="case">
    <p>{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Case',
    props: ['title'],
    data () {
      return {
        message: '组件案例...'
      }
    }
  }
</script>

<style scoped>
</style>
