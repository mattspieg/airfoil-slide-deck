import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: ['es2015'],
		emptyOutDir: false,
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'js/index.ts'),
			name: 'RevealTransposed',
			fileName: () => 'reveal-transposed.mjs',
		},
	},
	resolve: {
		alias: [
			{
				find: './controllers/controls',
				replacement: resolve(__dirname, 'js/transposed/controllers/controls.js'),
			},
			{
				find: './controllers/overview',
				replacement: resolve(__dirname, 'js/transposed/controllers/overview.js'),
			},
			{
				find: './controllers/touch',
				replacement: resolve(__dirname, 'js/transposed/controllers/touch.js'),
			},
			{
				find: 'reveal.js/plugin',
				replacement: '/plugin',
			},
			{
				find: 'reveal.js',
				replacement: '/js',
			},
			{
				find: 'reveal.css',
				replacement: '/css/reveal.scss',
			},
		],
	},
});
