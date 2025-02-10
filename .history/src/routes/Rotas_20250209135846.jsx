import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login';
import Pagina_inicial from '../pages/Pagina_inicial';
import Gestao_dizimistas from '../pages/Gestao_dizimistas';

const routes = [
    { path: '/', component: Login},
    { path: '/pagina-inicial', component: Pagina_inicial},
    { path: '/gestao-dizimistas', component: Gestao_dizimistas}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;