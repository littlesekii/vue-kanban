<script setup lang="ts">
import KanbanBoardComponent from '@/components/kanban/KanbanBoardComponent.vue';
import KanbanCardComponent from '@/components/kanban/KanbanCardComponent.vue';
import KanbanFieldComponent from '@/components/kanban/KanbanFieldComponent.vue';
import { useKanban } from '@/composables/useKanban';
import type { KanbanField } from '@/types/kanban';
import { onMounted, ref, watchEffect } from 'vue';
import draggableComponent from 'vuedraggable';

const { board, loading, fetchBoard, updateBoard } = useKanban();

const localFields = ref<KanbanField[]>([]);

onMounted(async () => {
  fetchBoard();
});

watchEffect(() => {
  if (board.value) {
    localFields.value = JSON.parse(JSON.stringify(board.value.fields));
  }
});

const onDragEnd = () => {
  if (board.value) {
    updateBoard({ ...board.value, fields: localFields.value });
  }
};

</script>

<template>
  <main>

    <div v-if="loading">Loading...</div>

    <KanbanBoardComponent v-else-if="board" :title="board.title">
      <draggableComponent
        v-model="localFields"
        group="fields"
        item-key="id"
        class="fields" ghost-class="ghost" drag-class="drag" chosen-class="chosen"
        :animation="260"
        @end="onDragEnd"
      >
        <template #item="{element: field}">
          <KanbanFieldComponent :title="field.title">
            <draggableComponent
              v-model="field.cards"
              group="cards"
              item-key="id"
              class="cards" ghost-class="ghost" drag-class="drag" chosen-class="chosen"
              :animation="260"
              @end="onDragEnd"
            >
              <template #item="{element: card}">
                <KanbanCardComponent :title="card.title" />
              </template>
            </draggableComponent>
          </KanbanFieldComponent>
          </template>
      </draggableComponent>
  </KanbanBoardComponent>


  </main>
</template>


<style scoped>

  .fields {
    display: flex;
    gap: 5px;
  }
  .cards {
    display: flex;
    flex-direction: column;
    gap: 5px;

    min-height: 150px;
  }

  .ghost {
    opacity: 1;
  }
  .drag {
    opacity: 1;
  }
  .chosen {
    opacity: 1;
  }
</style>
