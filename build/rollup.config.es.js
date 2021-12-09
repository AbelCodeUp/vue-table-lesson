import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: '101-table-lesson',
    file: 'dist/101-table-lesson.esm.js',
    format: 'es',
    extend: true,
  },
})

export default config
