import type { KanbanBoard } from '@/types/kanban';
import { readonly, ref } from 'vue';

const board = ref<KanbanBoard | null>(null);
const loading = ref(false);

export function useKanban() {

  const fetchBoard = async () => {
    loading.value = true;

    try {
      const res = await fetch(
        'https://kb.linky.cat/api/boards/1',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      const data = await res.json();
      board.value = data;
    } finally {
      loading.value = false;
    }
  };

  const updateBoard = (newBoard: KanbanBoard): void => {
    board.value = newBoard;
  };

  return {
    board: readonly(board),
    loading: readonly(loading),
    fetchBoard,
    updateBoard
  };
}
