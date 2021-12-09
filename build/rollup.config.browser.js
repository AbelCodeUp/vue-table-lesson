import base from './rollup.config.base'
import { terser } from "rollup-plugin-terser";

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: '101-table-lesson',
    file: 'dist/101-table-lesson.min.js',
    format: 'iife',
    extend: true,
  },
})

config.plugins.push(terser())

export default config
