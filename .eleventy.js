const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, cls="shadow-xl", sizes="(min-width: 1024px) 100vw, 50vw") {
  let metadata = await Image(src, {
    widths: [300, 600, 1200],
    formats: ["avif", "jpeg"],
    urlPath: "/img/",
    outputDir: "./src/img/"
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (config) => {
  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addPassthroughCopy({ 'public': './' })
  config.addPassthroughCopy("./src/img/");
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: true,
  })
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
  }
}
