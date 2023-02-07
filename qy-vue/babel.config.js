module.exports = {
  presets: [
    "@vue/app",
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    [
      "component",
      {
        "libraryName":"element-ui",
        "styleLibraryName":"theme-chalk"
      }
    ]
  ]
}
