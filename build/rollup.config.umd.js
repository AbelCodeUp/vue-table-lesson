import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: '101-table-lesson',
    file: 'dist/101-table-lesson.umd.js',
    format: 'umd',
    extend: true,
  },
})

export default config
