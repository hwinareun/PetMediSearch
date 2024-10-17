import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 빌드 결과물을 dist 폴더에 저장
    rollupOptions: {
      input: './src/main.tsx', // 진입 파일 설정
    },
  },
});
