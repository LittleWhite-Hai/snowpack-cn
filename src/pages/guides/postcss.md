---
layout: ../../layouts/content.astro
title: 'PostCSS'
tags: communityGuide
published: true
img: '/img/logos/postcss.svg'
imgBackground: '#f8f8f2'
description: How to use PostCSS in your Snowpack project.
---

[PostCSS](https://postcss.org/)是一个流行的CSS转码器，支持[一个庞大的插件生态系统。](https://github.com/postcss/postcss#plugins)

**要在Snowpack中使用PostCSS**。安装[@snowpack/plugin-postcss](https://www.npmjs.com/package/@snowpack/plugin-postcss)、[PostCSS](https://www.npmjs.com/package/postcss)和你的PostCSS插件，然后将该插件添加到你的Snowpack配置中。

```diff
// snowpack.config.mjs
export default {
+  plugins: ['@snowpack/plugin-postcss'],
};
```

最后，添加一个`postcss.config.js`文件。默认情况下，@snowpack/plugin-postcss会在你项目的根目录下寻找这个文件，但你可以用`配置`选项来定制。参见[插件README中的](https://www.npmjs.com/package/@snowpack/plugin-postcss)所有可用选项。

```js
// postcss.config.js
module.exports = {
  plugins: [
    // Replace below with your plugins
    require('cssnano'),
    require('postcss-preset-env'),
  ],
};
```

请注意，这个插件将在你的项目中的所有CSS上运行，包括任何编译成CSS的文件（如`.scss`Sass文件）。
