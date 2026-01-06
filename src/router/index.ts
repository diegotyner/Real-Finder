import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import OldHome from "@/views/OldHome.vue";
import SongIndex from "@/views/SongIndex.vue";
import SetList from "@/views/SetList.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/OldHome",
    name: "OldHome",
    component: OldHome,
  },

  // Dynamic route
  {
    path: "/SetList/:mode?",
    name: "SetList",
    component: SetList,
    props: true,
  },

  // 2. Dynamic Index Route (for /index/5 and /index/6)
  {
    path: "/index/:edition",
    name: "SongIndex",
    component: SongIndex,
    props: true,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
