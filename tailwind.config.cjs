const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	safelist : [
		'h-40',
		'w-1/5',
		'w-1/4',
		'w-1/2',
		'w-3/4'
	],
	theme: {
		extend: {}
	},
	plugins: [
		plugin(function({ addVariant }) {
      		addVariant('hocus', ['&:hover', '&:focus'])
    	}),
		require('flowbite/plugin')
  	],
};
