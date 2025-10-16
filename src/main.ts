import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { i18n } from './i18n'
import App from './App.vue'
import './style.css'

// Layout Components
import AdminLayout from './components/layout/AdminLayout.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Register global components
app.component('AdminLayout', AdminLayout)

app.mount('#app')