import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerPlugins } from './plugins'
import './assets/css/style.css'
import '@mdi/font/css/materialdesignicons.css' 


import { getItem } from './core/helpers/localeStorage'
import { DOCUMENT_DIRECTION } from './core/constants'
import "vue-awesome-paginate/dist/style.css";
const app = createApp(App)
app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer'

document.dir = getItem(DOCUMENT_DIRECTION) || 'ltr'
app.use(createPinia())
app.use(router)
registerPlugins(app)

app.mount('#app')
