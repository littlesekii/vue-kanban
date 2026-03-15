<script setup lang="ts">

defineProps<{title: string}>();

</script>

<template>
  <div class="card-item">
    {{ title }}
  </div>
</template>

<style scoped>
  .card-item {
    background-color: #AAA;
    padding: 10px;
  }
</style>