import * as VueRouter from 'vue-router'
import {createApp} from 'vue';
import App from './App.vue';

import LoginPanel from "@/components/LoginPanel.vue";
import OptionSide from "@/components/options/OptionSide.vue";
import YourAnswersSide from "@/components/YourAnswersSide.vue";
import AddPollSide from "@/components/AddPollSide.vue";
import YourPollsSide from "@/components/YourPollsSide.vue";
import AuthStore from "@/store/AuthStore";
import RegisterSide from  "@/components/RegisterSide.vue";

AuthStore.fetchUser()
    .finally(() => {
        const routes = [
            {path: '/login', component: LoginPanel},
            {path: '/options', component: OptionSide},
            {path: '/your-answers', component: YourAnswersSide},
            {path: '/add-poll', component: AddPollSide},
            {path: '/your-polls', component: YourPollsSide},
            {path: '/register', component: RegisterSide}
        ]

        const router = VueRouter.createRouter({
            history: VueRouter.createWebHistory(),
            routes,
        })

        createApp(App)
            .use(router)
            .mount('#app')
    });
