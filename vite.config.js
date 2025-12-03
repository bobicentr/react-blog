import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Твой правильный импорт!

export default defineConfig({
  // Плагин нужно добавлять сюда, в основной массив плагинов Vite
  plugins: [react(), tailwindcss()],
})