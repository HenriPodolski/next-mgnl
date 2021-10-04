const {
  MGNL_PREVIEW,
  MGNL_HOST,
  MGNL_PREVIEW_EXPORT,
  MGNL_PATH_AUTHOR,
  MGNL_RESOURCES_PATH,
  NEXTJS_PREVIEW_HOST,
} = process.env;
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withTranspileModules = require('next-transpile-modules')(
  ['@next-mgnl/lib'],
  {
    debug: process.env.NODE_ENV !== 'production',
    webpack5: true,
  }
);

module.exports = withPlugins([withImages, withTranspileModules], {
  reactStrictMode: true,
  assetPrefix: MGNL_PREVIEW_EXPORT
    ? MGNL_HOST + MGNL_PATH_AUTHOR + MGNL_RESOURCES_PATH
    : MGNL_PREVIEW
    ? NEXTJS_PREVIEW_HOST
    : '',

  generateBuildId: async () => {
    // TODO get the latest git commit hash here
    return 'my-build-id';
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
});
