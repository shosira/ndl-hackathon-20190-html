<template>
  <div class="header">
    <h1>{{ header }}</h1>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  props: {
    header: String
  }
}
</script>

<style scoped>
</style>