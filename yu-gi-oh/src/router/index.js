import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/easy",
        name: "EasyCard",
        component: () => import("../views/EasyCard.vue")
    },
    {
        path: "/hard",
        name: "HardCard",
        component: () => import("../views/HardCard.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;