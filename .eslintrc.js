module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    ignorePatterns: ['node_modules', 'dist', 'coverage', 'build'],
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'off',
    },
}
