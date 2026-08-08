// source.config.ts
import { defineConfig } from "fumadocs-mdx/config";
var source_config_default = defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: {
        id: "package-manager"
      }
    }
  }
});
export {
  source_config_default as default
};
