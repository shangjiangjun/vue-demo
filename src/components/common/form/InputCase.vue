<template>
  <div class="input-case">
    <input
      v-bind:value="value"
      v-on:input="$emit('change', $event.target.value)" >
  </div>
</template>

<script>
  export default {
    name: "InputCase",
    props: ['value'],
    data () {
      return {}
    },
    methods: {

    }
  }
</script>

<style>
</style>
