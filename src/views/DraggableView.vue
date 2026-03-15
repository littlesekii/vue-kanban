<script lang="ts" setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const minhaLista = ref([
  { id: 1, nome: '🚀 Estudar Vue.js' },
  { id: 2, nome: '☕ Pausa para o Café' },
  { id: 3, nome: '💻 Commit de Sexta' },
  { id: 4, nome: '🍕 Pedir Pizza' }
]);
</script>

<template>
  <div class="container">
    <h2 class="title">Minhas Tarefas</h2>
    
    <draggable 
      v-model="minhaLista" 
      item-key="id" 
      tag="ul"
      ghost-class="ghost"
      drag-class="drag"
      chosen-class="chosen"
      :animation="300"
      class="drag-list"
    >
      <template #item="{ element }">
        <li class="drag-item">
          <span class="handle">⋮⋮</span>
          <span class="text">{{ element.nome }}</span>
        </li>
      </template>
    </draggable>

    <pre class="debug">{{ minhaLista }}</pre>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Inter', sans-serif;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.title {
  color: #1e293b;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}

.drag-list {
  list-style: none;
  padding: 0;
}

/* Estilo padrão do Card */
.drag-item {
  background: white;
  margin-bottom: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;
}

.drag-item:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.handle {
  color: #94a3b8;
  margin-right: 12px;
  font-weight: bold;
}

/* --- ESTADOS DO DRAGGABLE --- */

/* Onde o item vai cair (Espaço vazio) */
.ghost {
  opacity: 0.4;
  background: #bfdbfe !important;
  border: 2px dashed #3b82f6 !important;
}

/* O item que está sendo arrastado pelo mouse */
.drag {
  opacity: 1 !important;
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  background: #3b82f6 !important;
  color: white !important;
  cursor: grabbing;
}

.drag .handle {
  color: rgba(255, 255, 255, 0.6);
}

/* O item selecionado mas ainda parado */
.chosen {
  border-color: #3b82f6;
}

/* Preview do Array para você ver a mágica */
.debug {
  margin-top: 20px;
  font-size: 10px;
  background: #1e293b;
  color: #38bdf8;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
}
</style>