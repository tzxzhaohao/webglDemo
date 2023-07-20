import { resolve } from 'path'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'

export default ({ mode }: ConfigEnv) => {
  const root = process.cwd()
  const ENV = loadEnv(mode, root)

  return defineConfig({
    base: ENV.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          nested: resolve(__dirname, 'pages/page1.html'),
        },
      },
    },
  })
}
