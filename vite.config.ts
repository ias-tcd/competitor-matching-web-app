import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        define: {
            'process.env.VITE_APP_API_URL': JSON.stringify(env.VITE_APP_API_URL),
        },
        base: '/',
        plugins: [react()],
        preview: {
            port: 5173,
            strictPort: true,
        },
        server: {
            port: 5173,
            strictPort: true,
            host: true,
            origin: 'http://0.0.0.0:5173',
        },
        envPrefix: 'VITE_APP_',
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: './tests/setup.js',
        },
    };
});
