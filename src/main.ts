import { createApp } from 'vue'

import { registerGloabCom } from '@/components/register_gloab_com'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
import { setupAxios } from '@/api'
import { setupRouter } from '@/router'
import App from './App.vue'

async function bootstrap() {
    const app = createApp(App)

    setupStore(app)
    setupRouter(app)
    registerGloabCom(app)
    await setupI18n(app)
    setupAxios(app)

    app.mount('#app')
}
bootstrap()