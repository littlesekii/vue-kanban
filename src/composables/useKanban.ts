import { boardService } from '@/api/services/boardService';
import type { KanbanBoard } from '@/types/kanban';
import { readonly, ref } from 'vue';

const board = ref<KanbanBoard | null>(null);
const loading = ref(false);

export function useKanban() {

  const fetchBoard = async () => {
    loading.value = true;

    try {
      board.value = await boardService.fetch(1);
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
