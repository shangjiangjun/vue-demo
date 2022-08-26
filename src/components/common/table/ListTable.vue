<template>
  <div class="table">
    <table ref="table">
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.title }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ListTable',
    props:  ['items'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
</style>
