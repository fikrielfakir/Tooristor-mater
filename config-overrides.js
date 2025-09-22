const { override, fixBabelImports, overrideDevServer } = require('customize-cra');

const devServerConfig = () => config => {
  return {
    ...config,
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 5000,
  };
};

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    })
  ),
  devServer: overrideDevServer(devServerConfig())
};
