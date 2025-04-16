module.exports = {
  root: true,
  extends: '@react-native',
};

// npm install --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native

// module.exports = {
//   root: true,
//   extends: [
//     'airbnb',
//     'plugin:react/recommended',
//     'plugin:react-native/all',
//   ],
//   parser: '@babel/eslint-parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     requireConfigFile: false,
//   },
//   plugins: ['react', 'react-native'],
//   env: {
//     'react-native/react-native': true,
//   },
//   rules: {
//     'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
//     'react/react-in-jsx-scope': 'off', // Not needed in React Native
//     'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// };