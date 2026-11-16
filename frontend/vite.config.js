import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    // `vite preview` serves the built app in Autonoma preview environments,
    // whose hostnames aren't known ahead of time.
    preview: {
        allowedHosts: true,
    },
})
