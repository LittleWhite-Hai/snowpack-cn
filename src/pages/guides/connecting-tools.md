---
layout: ../../layouts/content.astro
title: 将你常用的工具连接到Snowpack
description: 'How do you use your favorite tools in Snowpack? This Guide will help you get started'
published: true
---

我们收到的最常见的问题之一是："我如何将我最喜欢的工具连接到Snowpack？"在本指南中，我们将介绍三种不同的方式，你可以将第三方工具集成到你的Snowpack开发环境或构建管道中。

- Snowpack插件
- 集成CLI脚本（通过`@snowpack/plugin-run-script`)
- 独立运行，在Snowpack之外（例如：在你的`package.json`中）。

## 将一个工具与Snowpack插件集成在一起

将一个新的工具连接到Snowpack的最好方法是在我们的[插件目录](/plugins)中搜索一个相关的插件。很有可能，已经有人创建了一个插件来帮助你轻松地集成你最喜欢的工具。

要添加一个插件，首先使用你的软件包管理器进行安装，然后将插件名称添加到你的Snowpack配置文件中的`插件`部分。许多插件有它们自己的完全可选的配置选项。这些在每个插件的文档中都有涉及。

例如，如果你想使用sass，你可以用npm安装[`@snowpack/plugin-sass`](https://www.npmjs.com/package/@snowpack/plugin-sass)。

```bash
npm install @snowpack/plugin-sass
```

然后，如果你还没有一个Snowpack配置文件`（snowpack.config.mjs`），你可以用这个命令创建一个。

```bash
snowpack init
```

打开`snowpack.config.mjs`，将你的新插件的名字添加到插件对象中。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
-    /* ... */
+    '@snowpack/plugin-sass',
    ],
  };
```

其他的可选配置选项呢？[ `@snowpack/plugin-sass`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-sass)文档列出了所有的选项以及在`snowpack.config.mjs`文件中的位置。如果我想要`压缩`的输出`风格`，我会把`@snowpack/plugin-sass`的值变成一个包含配置对象的数组。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
-     '@snowpack/plugin-sass'
+     ['@snowpack/plugin-sass', { style: 'compressed'}]
    ],
  };
```

如果还没有一个插件，你可能有兴趣做一个。请查看我们的[插件API](/reference/plugins)

## 使用plugin-run-script和plugin-build-script连接任何其他脚本/CLI

如果你找不到适合你需要的插件，又不想自己写，你也可以使用我们的两个实用插件之一，直接运行CLI命令，作为你构建的一部分。`@snowpack/plugin-build-script`&`@snowpack/plugin-run-script`。

#### @snowpack/plugin-build-script

```js
// snowpack.config.mjs
// [npm install @snowpack/plugin-build-script]
export default {
  plugins: [
    [
      '@snowpack/plugin-build-script',
      {
        cmd: 'postcss',
        input: ['.css'],
        output: ['.css'],
      },
    ],
  ],
};
```

这个插件允许你将任何CLI连接到你的构建过程。只要给它一个`cmd`CLI命令，它可以从`stdin`接受输入，并通过`stdout`发出构建结果。查看该[插件的文档](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-build-script)以了解更多信息。

#### @snowpack/plugin-run-script

```js
// snowpack.config.mjs
// [npm install @snowpack/plugin-run-script]
export default {
  plugins: [
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eleventy',
        watch: '$1 --watch',
      },
    ],
  ],
};
```

这个插件允许你运行任何CLI命令作为你开发和构建工作流程的一部分。这个插件并不影响你的构建输出，但它对于将开发人员的工具直接连接到Snowpack是很有用的。使用它可以在你打字时向你的开发控制台添加有意义的反馈，比如TypeScript类型检查和ESLint lint错误。这并不影响Snowpack如何构建你的网站。请查看[插件文档](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-run-script)以了解更多信息。

### 例子

#### PostCSS

```js
// snowpack.config.mjs
export default {
  plugins: [
    [
      '@snowpack/plugin-build-script',
      {
        cmd: 'postcss',
        input: ['.css'],
        output: ['.css'],
      },
    ],
  ],
};
```

[`postcss-cli`](https://github.com/postcss/postcss-cli)包必须手动安装。你可以在当前工作目录下用`postcss.config.js`文件来配置PostCSS。

#### ESLint

```js
// snowpack.config.mjs
export default {
  plugins: [
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eslint src --ext .js,.jsx,.ts,.tsx',
        // Optional: Use npm package "eslint-watch" to run on every file change
        watch: 'esw -w --clear src --ext .js,.jsx,.ts,.tsx',
      },
    ],
  ],
};
```
