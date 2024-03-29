import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from "element-plus";
import '@/styles/index.scss'
import type { App } from 'vue'


export function registerGloabCom(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('ElMessage', ElMessage)
  app.component('ElMessageBox', ElMessageBox)
}