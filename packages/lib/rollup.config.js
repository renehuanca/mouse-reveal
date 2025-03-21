import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/mouse-reveal.cjs.js',
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: 'dist/mouse-reveal.esm.js',
      format: 'esm',
      plugins: [terser()]
    },
    {
      file: 'dist/mouse-reveal.min.js',
      format: 'umd',
      name: 'mouse-reveal',
      plugins: [terser()]
    }
  ],

  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    postcss({
      extract: 'style.min.css',
      plugins: [cssnano()]
    }),
    copy({
      targets: [
        { src: 'src/assets/*.svg', dest: 'dist/assets' }
      ]
    })
  ],

  external: []
}
