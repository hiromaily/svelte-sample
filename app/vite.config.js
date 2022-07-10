import { sveltekit } from '@sveltejs/kit/vite';
//import resolve from '@rollup/plugin-node-resolve';
// https://github.com/rollup/plugins/tree/master/packages/alias
//import alias from '@rollup/plugin-alias';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(), 
		// resolve({
		//   extensions: ['.js', '.ts']
    // })
    // alias({
    //   entries: [
    //     {
    //       find: new RegExp('protobufjs/minimal.js$'),
    //       replacement: "protobufjs/dist/minimal/protobuf.min.js"
    //     }
    //   ]
    // })		
  ],
  build: {
    rollupOptions: {
			output: {
				interop: "auto"
			}
    }
	},	
	// resolve: {
  //   extensions: ['.js', '.ts'],
  // },	
	define: {
		global: {}
	}
};

export default config;
