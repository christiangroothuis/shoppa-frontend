const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");

module.exports = {
	plugins: [
		tailwindcss("./tailwind.config.js"),
		process.env.NODE_ENV === "production" && require("autoprefixer"),
		process.env.NODE_ENV === "production" && cssnano({ preset: "default" }),
		// require("@fullhuman/postcss-purgecss")({
		// 	content: [
		// 		"./src/**/*.js",
		// 		"./src/**/*.jsx",
		// 		"./src/**/*.ts",
		// 		"./src/**/*.tsx",
		// 		"./public/index.html",
		// 	],
		// 	defaultExtractor: (content) =>
		// 		content.match(/[A-Za-z0-9-_:/]+/g) || [],
		// }),
	],
};
