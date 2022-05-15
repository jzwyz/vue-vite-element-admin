import { fileURLToPath, URL } from 'url'

import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock';

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
  }
}