import StatisticsUpload from "@/pages/statistics/upload.vue";
import Main from '@/pages/main.vue'
import StatisticsView from '@/pages/statistics/view.vue'
import StatisticsIndex from '@/pages/statistics/index.vue'

import NotFound from './components/NotFound.vue'
export default [
    {
        path: "/",
        name: "Main",
        component: Main,
    },
    {
        path: "/statistics",
        name: "Statistics",
        component: StatisticsIndex
    },
    {
        path: "/statistics/:id",
        name: "StatisticsView",
        component: StatisticsView
    },
    {
        path: "/statistics/upload",
        name: "StatisticsUpload",
        component: StatisticsUpload,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    }
]