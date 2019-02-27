module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue/'
    : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('vue-i18n-loader2')
        .loader('vue-i18n-loader2')
        .options({
          quite: false,
          target: 'src/locales',
          character: 'utf-8',
        })
  }
}
