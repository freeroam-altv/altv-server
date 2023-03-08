import { build } from "./shared";

build({
    esbuild: {
        entryPoints: ["src/client/main.ts"],
        outfile: "resources/freeroam/client.js",
    },
    altvEsbuild: {
        mode: "client",
    },
}).then();
