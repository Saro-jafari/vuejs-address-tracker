import { createApp } from 'vue';
import '/src/assets/styles/main.scss';
import App from './App.vue';
import router from '/src/router/index';
createApp(App).use(router).mount('#app');
