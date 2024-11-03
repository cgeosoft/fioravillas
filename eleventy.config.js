import pugPlugin from "@11ty/eleventy-plugin-pug";
import yaml from "js-yaml";

export default function (eleventyConfig) {

  eleventyConfig.addGlobalData("env", process.env);
  eleventyConfig.setServerOptions({
    liveReload: true,
    port: 3000,
  })
	eleventyConfig.addPlugin(pugPlugin);
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ "./static/*": "./" });
  eleventyConfig.addPassthroughCopy({ "./static": "./" });

  global.filters = eleventyConfig.javascriptFunctions;

  eleventyConfig.setPugOptions({
    pretty: true,
    globals: ['filters']
  })

  return {
    html: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  };
};

