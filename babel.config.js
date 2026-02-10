module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@context': './src/context',
            '@i18n': './src/i18n',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@constants': './src/constants',
            '@providers': './src/providers',
            '@utils': './src/utils',
            '@services': './src/services',
            '@store': './src/store',
            '@types': './src/types',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
