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
  <main class="main">
    <section class="kanban">

      <div class="loading" v-if="loading">
        <p>Loading...</p>
        </div>

      <KanbanBoardComponent v-else-if="board" :title="board.title">
        <draggableComponent
          v-model="localFields"
          group="fields"
          item-key="id"
          class="board-fields" ghost-class="ghost" drag-class="drag" chosen-class="chosen"
          :animation="260"
          @end="onDragEnd"
        >
          <template #item="{element: field}">
            <KanbanFieldComponent :title="field.title" :card-amount="field.cards.length">
              <draggableComponent
                v-model="field.cards"
                group="cards"
                item-key="id"
                class="field-cards" ghost-class="ghost" drag-class="drag" chosen-class="chosen"
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

    </section>
    <footer class="footer">
      <p>Development by Davi Bacalhau</p>
    </footer>
  </main>
</template>


<style scoped>
  .main {
    display: flex;
    flex-direction: column;

    height: 100dvh;
  }

  .kanban {
    flex: 1;
    display: flex;
    flex-direction: column;

    padding: 20px;
  }

  .loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    height: inherit;
  }

  .board-fields {
    flex: 1;
    display: flex;

    height: inherit;
    gap: 20px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  .field-cards {
    flex: 1;
    display: flex;

    min-height: calc(200px / 2);

    flex-direction: column;
    gap: 10px;

  }

  .footer {
    display: flex;

    min-height: 5em;

    align-items: center;
    justify-content: center;

    border-top: 1px solid black;

    p {
      font-size: 13pt;
    }
  }

  /* DRAGGABLE */
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
