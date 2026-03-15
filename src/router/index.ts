import DraggableView from '@/views/DraggableView.vue';
import KanbanView from '@/views/KanbanView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: KanbanView,
    },
    {
      path: '/drag',
      name: 'drag',
      component: DraggableView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    },
  ],
});

export default router;
