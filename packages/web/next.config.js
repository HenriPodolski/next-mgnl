const {
  NEXTJS_HOST,
  MGNL_HOST,
  MGNL_PREVIEW_EXPORT,
  MGNL_PATH_AUTHOR,
  MGNL_RESOURCES_PATH,
  NODE_ENV,
} = process.env;
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withTranspileModules = require('next-transpile-modules')(
  ['@next-mgnl/lib'],
  {
    debug: NODE_ENV !== 'production',
    webpack5: true,
  }
);

module.exports = withPlugins([withImages, withTranspileModules], {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix:
    MGNL_PREVIEW_EXPORT && NODE_ENV !== 'production'
      ? NEXTJS_HOST
      : MGNL_PREVIEW_EXPORT
      ? MGNL_HOST + MGNL_PATH_AUTHOR + MGNL_RESOURCES_PATH
      : '',
  distDir: MGNL_PREVIEW_EXPORT ? '/export/build' : '/build',
  cleanDistDir: true,

  generateBuildId: async () => {
    // TODO get the latest git commit hash here
    return 'my-build-id';
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
});
