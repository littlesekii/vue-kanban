<script setup lang="ts">

defineProps<{title: string}>();

</script>

<template>
  <div class="card">
    <p class="card-title">{{ title }}</p>
  </div>
</template>

<style scoped>
  .card {
    min-height: 130px;

    border-radius: 5px;

    background-color: #FFF;
    padding: 10px;

    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }
  .card-title {
    font-weight: 600;
  }
</style>
