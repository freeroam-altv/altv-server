import { build } from "./shared";

build({
    esbuild: {
        platform: "node",
        entryPoints: ["src/server/main.ts"],
        outfile: "resources/freeroam/server.js",
    },
    altvEsbuild: {
        mode: "server",
    },
}).then();
