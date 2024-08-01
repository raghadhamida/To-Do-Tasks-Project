import { createApp, VueElement } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import $tasks from './data';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

//app.config.globalProperties.$tasks = $tasks;

app.provide('$tasks', $tasks);

app.mount('#app')
