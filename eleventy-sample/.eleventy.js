export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/_includes/css/"); // ICI a partir de eleventy-sample/
	eleventyConfig.addPassthroughCopy("src/_includes/img/"); 
  return {
	passthroughFileCopy: true,
	dir: {
		input: "src",    // tes fichiers sources
		includes: "_includes/templates", //layouts depuis "src/"
		data: "_data",
		output: "_site"   // build dans docs/ pour GitHub Pages
    }
  };
};
