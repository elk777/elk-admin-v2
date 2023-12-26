module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  //配置开发环境用import代替require 从而加快热更新速度 yarn add -D babel-plugin-dynamic-import-node

  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  }
}
