const pug = require("pug");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("pug", pug);
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy({ "./src/static": "./" });

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

