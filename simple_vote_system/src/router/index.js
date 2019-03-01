import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '@/components/Admin.vue';
import Main from '@/components/Main.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/admin', component: Admin },
    { path: '/:theme', component: Main },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
