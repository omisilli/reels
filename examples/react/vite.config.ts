import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// The package's own folder: imported from its source, so an edit there
// shows at once — no build, no release.
const pkg = fileURLToPath(new URL("../../", import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@plusguard/reels/index.css", replacement: `${pkg}index.css` },
            { find: /^@plusguard\/reels$/, replacement: `${pkg}index.ts` },
        ],
    },
    // public/media is a link to the static example's media.
    server: { port: 5110, strictPort: true, fs: { allow: [pkg] } },
});
