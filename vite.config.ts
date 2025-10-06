import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Numer/', // 👈 ใส่ชื่อ repo ตรงนี้ (ถ้า repo เธอชื่อ Numer)
  plugins: [react()],
})

