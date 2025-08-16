import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerPlugins } from './plugins'
import './assets/css/style.css'
import '@mdi/font/css/materialdesignicons.css' 
const app = createApp(App)
app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer'

app.use(createPinia())
app.use(router)
registerPlugins(app)

app.mount('#app')
