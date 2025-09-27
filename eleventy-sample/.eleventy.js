export default function(eleventyConfig) {
  return {
    dir: {
      input: "src",    // tes fichiers sources
      includes: "_includes",
      output: "docs"   // build dans docs/ pour GitHub Pages
    }
  };
}

