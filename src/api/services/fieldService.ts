import type { FieldPatchDTO, FieldPatchMoveCardDTO } from '@/types/dto/fieldDTO';
import type { KanbanField } from '@/types/kanban';
import { api } from '../api';

export const fieldService = {
  patch: async (id: number, body: FieldPatchDTO) =>
    api.patch<KanbanField, FieldPatchDTO>(`/api/fields/${id}`, body),
  moveCards: async (body: FieldPatchMoveCardDTO[]) =>
    api.patch<void, FieldPatchMoveCardDTO[]>('/api/fields/move-cards', body)
};
