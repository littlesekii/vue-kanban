<script setup lang="ts">
defineProps<{title: string, cardAmount: number}>();
</script>

<template>
    <div class="field">
      <div class="field-header">

        <div class="field-header-indicator-color"></div>
        <p class="field-header-title">{{title}}</p>
        <div class="field-header-indicator-count">
          <p class="indicator-count-value">{{ cardAmount }}</p>
        </div>
      </div>
      <slot></slot>
    </div>
</template>

<style scoped>
  .field {
    flex: 1;
    display: flex;
    flex-direction: column;

    padding: 10px;

    border-radius: 15px;
    background-color: #F6F8FA;
  }
  .field-header {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 15px;

    .field-header-indicator-color {
      min-height: 10px;
      min-width: 10px;

      margin-right: 7px;

      background-color: green;
      border-radius: 100%;

    }
    .field-header-title {
      margin-right: 7px;

      color: #333;
      font-weight: 600;
    }
    .field-header-indicator-count {
      display: flex;
      align-items: center;
      justify-content: center;

      min-height: 20px;
      min-width: 20px;


      background-color: #3D50FF;
      border-radius: 100%;

      font-weight: 500;
      font-family: "DM Mono", monospace;

      .indicator-count-value {
        /* width: 0; */
        height: 0;
        color: white;
        font-size: 12px;
        line-height: 0px;

      }
    }
  }

</style>
