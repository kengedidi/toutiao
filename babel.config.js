module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //添加配置
  // 添加了配置之后要重新启动当前的项目，否则配置不生效
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
