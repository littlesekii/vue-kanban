<script setup lang="ts">

defineProps<{title: string}>();

</script>

<template>
  <div class="board-wrapper">
    <div class="board-header">{{ title }}</div>
    <div class="board-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .board-wrapper {
    background-color: #EEE;
    padding: 10px;
  }
</style>
