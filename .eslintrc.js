module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 1,
        'space-in-parens': 0,
        'no-tabs': 0,
        'space-before-blocks': 0,
        'comma-spacing': 0,
        'block-spacing': 0,
        'space-before-function-paren': 0,
        'indent': ['error','tab'],
        'arrow-parens': 0,
        'arrow-spacing': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
