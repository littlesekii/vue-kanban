<script setup lang="ts">

defineProps<{title: string}>();

</script>

<template>
  <div class="board">
    <!-- <div class="board-header">{{ title }}</div> -->
    <slot></slot>
  </div>
</template>

<style scoped>
  .board {
    flex: 1;
    display: flex;
    flex-direction: column;

    /* background-color: #EEE; */
    /* padding: 10px; */
  }
</style>
