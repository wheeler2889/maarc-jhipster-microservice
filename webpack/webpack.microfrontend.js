const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { DefinePlugin } = require('webpack');

const packageJson = require('../package.json');
const appVersion = packageJson.version;

module.exports = ({ serve }) => {
  return {
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      runtimeChunk: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'maarc',
        filename: 'remoteEntry.js',
        shareScope: 'default',
        exposes: {
          './entities-router': './src/main/webapp/app/router/entities',
          './entities-menu': './src/main/webapp/app/entities/entities-menu',
        },
        shared: {
          '@vuelidate/core': { singleton: true, shareScope: 'default' },
          '@vuelidate/validators': { singleton: true, shareScope: 'default' },
          axios: { singleton: true, shareScope: 'default' },
          'vue-loader': { eager: true, singleton: false, shareScope: 'default' },
          'bootstrap-vue': { singleton: true, shareScope: 'default' },
          vue: { singleton: true, shareScope: 'default' },
          'vue-i18n': { singleton: true, shareScope: 'default' },
          'vue-router': { singleton: true, shareScope: 'default' },
          pinia: { singleton: true, shareScope: 'default' },
          '@/shared/security/authority': {
            singleton: true,
            shareScope: 'default',
            import: '@/shared/security/authority',
            requiredVersion: appVersion,
          },
          '@/shared/alert/alert.service': {
            singleton: true,
            shareScope: 'default',
            import: '@/shared/alert/alert.service',
            requiredVersion: appVersion,
          },
          '@/locale/translation.service': {
            singleton: true,
            shareScope: 'default',
            import: '@/locale/translation.service',
            requiredVersion: appVersion,
          },
        },
      }),
      new DefinePlugin({
        MAARC_I18N_RESOURCES_PREFIX: JSON.stringify(''),
      }),
    ],
    output: {
      publicPath: 'auto',
    },
  };
};
