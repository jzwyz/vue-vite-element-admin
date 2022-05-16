import { fileURLToPath, URL } from 'url'

import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const OUTPUT_DIR = './dist'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {

  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isBuild = command === 'build';
  console.log('vite.config.ts: ', root, env, isBuild)

  return {
    plugins: [
      vue(),
      vueJsx(),
      // 自动导入
      AutoImport({
        resolvers: [
          ElementPlusResolver()
        ],
      }),
      // 自动注册
      Components({
        resolvers: [
          ElementPlusResolver()
        ],
      }),
      // TODO:只在开发、预览环境中使用 mock demo 数据
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: !isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createMockServer';
          setupProdMockServer();
          `
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./typings', import.meta.url))
      }
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
  }
}