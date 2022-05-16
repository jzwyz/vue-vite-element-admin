import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/styles/index.scss'
import type { App } from 'vue'

export function registerGloabCom(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}