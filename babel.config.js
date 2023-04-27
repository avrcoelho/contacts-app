module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.jpg', '.png'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
