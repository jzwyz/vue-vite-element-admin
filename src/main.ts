import { createApp } from 'vue'

import { registerGloabCom } from '@/components/register_gloab_com'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
import { setupAxios } from '@/api'
import App from './App.vue'
import { setupRouter } from '@/router'

async function bootstrap() {
    const app = createApp(App)

    setupStore(app)

    registerGloabCom(app)

    await setupI18n(app)

    setupRouter(app)

    setupAxios(app)

    app.mount('#app')
}
bootstrap()