import esbuild from "esbuild";
import { altvEsbuild } from "altv-esbuild";

const dev = process.argv[2] === "-dev";
console.log("dev:", dev);

export const build = async ({ esbuild: esbuildOptions, altvEsbuild: altvEsbuildOptions }) => {
    const ctx = await esbuild.context({
        bundle: true,
        format: "esm",
        target: "esnext",
        logLevel: "info",
        sourcemap: dev ? "both" : false,
        minify: !dev,
        keepNames: dev,
        plugins: [
            altvEsbuild({
                dev: {
                    enabled: dev,
                    enhancedRestartCommand: true,
                },
                altvEnums: true,
                bugFixes: {
                    playerDamageOnFirstConnect: true,
                },

                ...altvEsbuildOptions,
            }),
        ],

        ...esbuildOptions,
    });

    if (dev) {
        ctx.watch().then();
    } else {
        ctx.rebuild().then();
        ctx.dispose().then();
    }
};
