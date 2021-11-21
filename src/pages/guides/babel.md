---
layout: ../../layouts/content.astro
title: 'Babel'
tags: communityGuide
published: true
img: '/img/logos/babel.svg'
imgBackground: '#323330'
description: How to use Babel in your Snowpack project.
---

[Babel](https://babeljs.io/)是一个流行的JavaScript转码器，包括一个巨大的插件生态系统。

**你可能不需要Babel!S**nowpack已经内置了对JJSX和TypeScript转译的支持。只有当你需要使用自定义的Babel插件/预设来定制你的JavaScript/TypeScript文件的构建方式时才使用Babel。

**要在Snowpack中使用Babel：**在你的项目中添加[@snowpack/plugin-babel](https://www.npmjs.com/package/@snowpack/plugin-babel)插件。

```diff
  // snowpack.config.mjs
  export default {
    "plugins": [
+     ['@snowpack/plugin-babel'],
    ],
  };
```
