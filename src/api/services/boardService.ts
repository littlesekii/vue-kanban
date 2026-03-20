import type { KanbanBoard } from '@/types/kanban';
import { api } from '../api';
import type { BoardPatchMoveFieldsDTO } from '@/types/dto/boardDTO';

export const boardService = {
  fetch: async (id: number) =>
    api.get<KanbanBoard>(`/api/boards/${id}`),
  moveFields: async (id: number, body: BoardPatchMoveFieldsDTO) =>
    api.patch<void, BoardPatchMoveFieldsDTO>(`/api/boards/${id}/move-fields`, body)
};
