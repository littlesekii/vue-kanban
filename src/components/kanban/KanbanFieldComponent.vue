<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';

const title = defineModel<string>('title', { required: true });
defineProps<{
  cardAmount: number
}>();

const inputRename = useTemplateRef('input-rename');

const isRenaming = ref(false);
const editingTitle = ref('');

const prepareRename = async () => {
  editingTitle.value = title.value;
  isRenaming.value = true;

  await nextTick();
  inputRename.value?.focus();
};

const confirmRename = () => {
  const newTitle = editingTitle.value.trim();

  if (!newTitle) {
    isRenaming.value = false;
    return;
  }

  title.value = newTitle;
  isRenaming.value = false;
};

const cancelRename = () => {
  isRenaming.value = false;
};


</script>

<template>
    <div class="field">
      <div class="field-header">

        <div class="header-info" v-if="!isRenaming">
          <span class="indicator-color"></span>
          <p class="title" @click="prepareRename">
            {{title?.toUpperCase()}}
          </p>
          <span class="indicator-count">
            <p class="indicator-count-value">
              {{ cardAmount }}
            </p>
          </span>
        </div>

        <div class="header-rename" v-if="isRenaming">
          <input
            class="rename-input"
            id="rename-input"
            type="text"

            ref="input-rename"
            v-model="editingTitle"
          />
          <button @click="confirmRename" class="rename-button">v</button>
          <button @click="cancelRename" class="rename-button">x</button>
        </div>

      </div>
      <slot></slot>
    </div>
</template>

<style scoped>
  .field {
    /* flex: 1; */
    display: flex;
    flex-direction: column;

    width: 270px;

    padding: 10px;

    border-radius: 5px;
    background-color: #F6F8FA;
  }
  .field-header {
    display: flex;
    height: 42px;

    margin-bottom: 10px;
  }
  .header-info {
    display: flex;
    align-items: center;

    .indicator-color {
      min-height: 10px;
      min-width: 10px;

      margin-right: 7px;

      background-color: green;
      border-radius: 100%;
    }
    .title {
      margin-right: 7px;

      color: #333;
      font-weight: 600;
    }
    .indicator-count {
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

  .header-rename {
    display: flex;

    gap: 5px;
    width: 100%;

    .rename-input {
      flex: 1;
      min-width: 0;

      padding: 0 10px;

      font-size: 16px;

      border: none;
      border-radius: 5px;

      outline: none;

      background-color: #e0e3e6;
    }
    .rename-button {
      flex: none;
      /* min-width: 40px; */
      border: none;
      border-radius: 5px;

      padding: 0 16px;

      outline: none;
      background-color: #e0e3e6;

      cursor: pointer;
    }
  }

</style>
