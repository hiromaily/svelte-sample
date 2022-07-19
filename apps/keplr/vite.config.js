import { sveltekit } from '@sveltejs/kit/vite';
// https://github.com/rollup/plugins/tree/master/packages/node-resolve
//import resolve from '@rollup/plugin-node-resolve';
// https://github.com/rollup/plugins/tree/master/packages/alias
//import alias from '@rollup/plugin-alias';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit()
		// resolve({
		// 	extensions: ['.js', '.ts']
		// })
		// alias({
		// 	entries: [
		// 		{
		// 			find: new RegExp('protobufjs/minimal$'),
		// 			replacement: 'protobufjs/minimal.js'
		// 		}
		// 	]
		// })
	],
	build: {
		// https://vitejs.dev/config/#build-rollupoptions
		rollupOptions: {
			output: {
				// https://rollupjs.org/guide/en/#outputinterop
				interop: 'auto'
			}
		}
	},
	// resolve: {
	// 	// https://vitejs.dev/config/#resolve-extensions
	// 	extensions: ['.js', '.ts']
	// },
	// https://vitejs.dev/config/#define
	define: {
		global: {}
	}
};

export default config;
