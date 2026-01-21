import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  base: '/signage-annotator/', // 注意：这里必须是你的 GitHub 仓库名，前后都要有斜杠
})