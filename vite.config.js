import { defineConfig } from 'vite'
import { resolve } from 'path'
import federation from "@originjs/vite-plugin-federation"
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // libInjectCss(),
    federation({
      name: 'synergy-elka-ui-kit',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
        './vue': './node_modules/vue/dist/vue',
      },
      shared: ['vue']
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "./src/assets/styles/style.css";',
  //     },
  //   },
  // },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  }
  // build: {
  //   target: "esnext",
  //   outDir: './lib',
  //   lib: {
  //     name: 'vite-vue2-mf.js',
  //     entry: './src/lib/main.js',
  //     formats: ['es']
  //   }
  // }
})
