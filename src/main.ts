import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { i18n } from './i18n'
import App from './App.vue'
import './style.css'

import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { createNotivue } from 'notivue'
import 'notivue/animations.css'
import 'notivue/notification.css'

// Layout Components
import AdminLayout from './components/layout/AdminLayout.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Antd)

const notivue = createNotivue({
    position: 'top-right',
    limit: 5,
})
app.use(notivue)
// Register global components
app.component('AdminLayout', AdminLayout)

app.mount('#app')