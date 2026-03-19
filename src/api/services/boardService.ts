import type { KanbanBoard } from '@/types/kanban';
import { api } from '../api';

export const boardService = {
  fetch: async (id: number) => api.get<KanbanBoard>(`/api/boards/${id}`),
};
