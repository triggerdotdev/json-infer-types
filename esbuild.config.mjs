import { build } from "esbuild";

// Automatically exclude all node_modules from the bundled version
import { nodeExternalsPlugin } from "esbuild-node-externals";

const sharedOptions = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  plugins: [nodeExternalsPlugin()],
};

const buildForNode = build({
  ...sharedOptions,
  outfile: "lib/index.js",
  platform: "node",
  target: "node14",
});

const buildForESM = build({
  ...sharedOptions,
  outfile: "lib/index.esm.js",
  format: "esm",
});

import npmDts from "npm-dts";
const { Generator } = npmDts;

Promise.all([buildForNode, buildForESM])
  .then(() => {
    new Generator({
      entry: "src/index.ts",
      out: "lib/index.d.ts",
    });
  })
  // eslint-disable-next-line no-undef
  .catch(() => process.exit(1));
