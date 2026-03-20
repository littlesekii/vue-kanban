import type { FieldPatchDTO, FieldPatchMoveCardsDTO } from '@/types/dto/fieldDTO';
import type { KanbanField } from '@/types/kanban';
import { api } from '../api';

export const fieldService = {
  patch: async (id: number, body: FieldPatchDTO) =>
    api.patch<KanbanField, FieldPatchDTO>(`/api/fields/${id}`, body),
  moveCards: async (body: FieldPatchMoveCardsDTO[]) =>
    api.patch<void, FieldPatchMoveCardsDTO[]>('/api/fields/move-cards', body)
};
