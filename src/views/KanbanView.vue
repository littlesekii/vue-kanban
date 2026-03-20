<script setup lang="ts">
import { boardService } from '@/api/services/boardService';
import { fieldService } from '@/api/services/fieldService';
import KanbanBoardComponent from '@/components/kanban/KanbanBoardComponent.vue';
import KanbanCardComponent from '@/components/kanban/KanbanCardComponent.vue';
import KanbanFieldComponent from '@/components/kanban/KanbanFieldComponent.vue';
import { useKanban } from '@/composables/useKanban';
import type { KanbanField } from '@/types/kanban';
import { onMounted, ref } from 'vue';
import draggableComponent from 'vuedraggable';

const { board, loading, fetchBoard } = useKanban();

const boardId = ref<number>(0);
const localFields = ref<KanbanField[]>([]);

onMounted(async () => {
  await fetchBoard();

  if (board.value) {
    boardId.value = board.value.id;
    localFields.value = JSON.parse(JSON.stringify(board.value.fields));
  }
});

const onFieldDragEnd = () => {
  const body = {
    fieldIds: localFields.value.map(field => field.id)
  };

  try {
    boardService.moveFields(boardId.value, body);
  } catch (error) {
    console.log(error);
  }

};

const onCardsDragEnd = (event: any) => {
  const { from, to } = event;

  const sourceField: KanbanField = JSON.parse(from.dataset.field);
  const targetField: KanbanField = JSON.parse(to.dataset.field);

  const body = [];

  body.push({
    id: sourceField.id,
    cardIds: sourceField.cards.map(card => card.id)
  });

  if (targetField.id !== sourceField.id) {
    body.push({
      id: targetField.id,
      cardIds: targetField.cards.map(card => card.id)
    });
  }

  try {
    fieldService.moveCards(body);
  } catch (error) {
    console.log(error);
  }

};

const renameField = async (field: KanbanField, title: string) => {
  const oldTitle = field.title;

  field.title = title;

  const body = {
	  'title': title,
  };

  try {
    const res = await fieldService.patch(field.id, body);
    console.log(res);
  } catch {
    field.title = oldTitle;
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
          @end="onFieldDragEnd"
        >
          <template #item="{element: field}">
            <KanbanFieldComponent class="field" :title="field.title" @update:title="renameField(field, $event)" :card-amount="field.cards.length">
              <draggableComponent
                v-model="field.cards"
                group="cards"
                item-key="id"
                class="field-cards" ghost-class="ghost" drag-class="drag" chosen-class="chosen"
                :animation="260"

                :data-field="JSON.stringify(field)"
                @end="onCardsDragEnd"
              >

                <template #item="{element: card}">
                  <KanbanCardComponent :title="card.title" />
                </template>

                <template #footer>
                  <button class="add-card-button">
                    + Create
                  </button>
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

    @media (max-width: 720px) {
      padding-right: 70px;
    }

  }

  .loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    height: inherit;
  }

  .board-fields {
    /* flex: 1; */
    display: flex;

    height: inherit;
    gap: 20px;

    @media (max-width: 720px) {
      flex-direction: column;
    }
  }

  .field {
    .add-card-button {
      visibility: hidden;

      padding: 10px 10px;

      color: #777;
      font-size: 16px;
      text-align: left;

      border: none;
      background-color: inherit;
      border-radius: 5px;

      font-weight: 600;

      cursor: pointer;

    }
    .add-card-button:hover {
      background-color: #e0e3e6;
    }

    @media (max-width: 720px) {
      .add-card-button {
        visibility: visible;
      }
    }
  }

  .field:hover {
    .add-card-button {
      visibility: visible;
    }
  }

  .field-cards {
    flex: 1;
    display: flex;

    /* min-height: calc(200px / 2); */

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
