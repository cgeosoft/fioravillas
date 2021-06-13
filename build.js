var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var static = require('metalsmith-static');
var sass = require('metalsmith-sass');
var moveUp = require('metalsmith-move-up')
var discoverPartials = require('metalsmith-discover-partials')
var buildinfo = require("metalsmith-build-info");
var registerHelpers = require("metalsmith-register-helpers")

var metadata = require('./metadata.json');

Metalsmith(__dirname)
  .metadata(metadata)
  .source("./src")
  .destination('./dist')
  .ignore(["layouts", "assets", "partials", "helpers", "public"])
  .clean(true)
  .use(moveUp('pages/*'))
  .use(static([{
    src: "src/public/",
    dest: "."
  }]))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(collections({
    articles: {
      pattern: 'posts/**/*.md',
      refer: false,
      sortBy: 'date',
      reverse: true,
    }
  }))
  .use(buildinfo())
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(discoverPartials({
    directory: './src/partials',
    pattern: /\.hbs$/
  }))
  .use(registerHelpers({
    directory: './src/helpers',
  }))
  .use(layouts({
    default: "index.hbs",
    pattern: "**/*.html",
    directory: "./src/layouts"
  }))
  .build((err, files) => {
    if (err) throw err;
  });

