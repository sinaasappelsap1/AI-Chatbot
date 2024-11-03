const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        const jsRule = oneOfRule.oneOf.find(
          (rule) =>
            rule.test &&
            rule.test.toString().includes('js|mjs|jsx|ts|tsx')
        );

        if (jsRule) {
          jsRule.include = [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/@jetbrains/ring-ui-built'),
          ];
        }
      }
      return webpackConfig;
    },
  },
};
