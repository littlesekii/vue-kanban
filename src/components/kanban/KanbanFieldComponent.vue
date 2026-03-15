<script setup lang="ts">
defineProps<{title: string}>();
</script>

<template>
    <div class="field-wrapper">
      <div class="field-header">{{title}}</div>
      <div class="field-body">
        <slot></slot>
      </div>
    </div>
</template>

<style scoped>
  .field-wrapper {
    flex: 1;
    background-color: #CCC;
    padding: 10px;
  }
</style>