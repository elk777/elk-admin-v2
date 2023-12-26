{
    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(),
        /* config.plugin('define') */
        new DefinePlugin(
          {
            'process.env': {
              VUE_APP_BASE_API: '"\'/dev-api\';"',
              NODE_ENV: '"development"',
              BASE_URL: '"/"'
            }
          }
        ),
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(
          {
            additionalTransformers: [
              function () { /* omitted long function */ }
            ],
            additionalFormatters: [
              function () { /* omitted long function */ }
            ]
          }
        ),
        /* config.plugin('html') */
        new HtmlWebpackPlugin(
          {
            title: 'vue2_project',
            scriptLoading: 'defer',
            templateParameters: function () { /* omitted long function */ },
            template: '/Users/lucky_elk/Desktop/demo_project/vue_demo/vue2_project/public/index.html'
          }
        ),
        /* config.plugin('copy') */
        new CopyPlugin(
          {
            patterns: [
              {
                from: '/Users/lucky_elk/Desktop/demo_project/vue_demo/vue2_project/public',
                to: '/Users/lucky_elk/Desktop/demo_project/vue_demo/vue2_project/dist',
                toType: 'dir',
                noErrorOnMissing: true,
                globOptions: {
                  ignore: [
                    '**/.DS_Store',
                    '/Users/lucky_elk/Desktop/demo_project/vue_demo/vue2_project/public/index.html'
                  ]
                },
                info: {
                  minimized: true
                }
              }
            ]
          }
        )
    ],
    entry: {
      app: [
        './src/main.js'
      ]
    }
}