---
layout: ../../layouts/content.astro
title: 将你常用的工具连接到Snowpack
description: "How do you use your favorite tools in Snowpack? This Guide will help you get started"
published: true
---

我们收到的最常见的问题之一是："我如何将我最喜欢的工具连接到 Snowpack？"在本指南中，我们将介绍三种不同的方式，你可以将第三方工具集成 Snowpack 开发环境或构建 pipeline 中。

- Snowpack 插件
- 集成 CLI 脚本（通过`@snowpack/plugin-run-script`)
- 独立运行，在 Snowpack 之外（例如：在`package.json`中）。

## 将一个工具与 Snowpack 插件集成在一起

将一个新的工具连接到 Snowpack 的最好方法是在我们的[插件目录](/plugins)中搜索一个相关的插件。很有可能，已经有人创建了一个插件来帮助你轻松地集成你最喜欢的工具。

要添加一个插件，首先使用包管理器进行安装，然后将插件名称添加到 Snowpack 配置文件中的`plugin`部分。许多插件有它们自己的完全可选的配置选项。这些在每个插件的文档中都有涉及。

例如，如果你想使用 sass，你可以用 npm 安装[`@snowpack/plugin-sass`](https://www.npmjs.com/package/@snowpack/plugin-sass)。

```bash
npm install @snowpack/plugin-sass
```

然后，如果你还没有一个 Snowpack 配置文件`snowpack.config.mjs`，你可以用这个命令创建一个。

```bash
snowpack init
```

打开`snowpack.config.mjs`，将新插件的名字添加到插件对象中。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
-    /* ... */
+    '@snowpack/plugin-sass',
    ],
  };
```

其他的可选配置选项呢？[ `@snowpack/plugin-sass`](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-sass)文档列出了所有的选项以及在`snowpack.config.mjs`文件中的位置。如果我想要`compress`的输出`style`，我会把`@snowpack/plugin-sass`的值变成一个包含配置对象的数组。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
-     '@snowpack/plugin-sass'
+     ['@snowpack/plugin-sass', { style: 'compressed'}]
    ],
  };
```

你可能有兴趣自己做一个:[plugin API](/reference/plugins)

## 使用 plugin-run-script 和 plugin-build-script 连接任何其他脚本/CLI

如果你找不到适合你需要的插件，又不想自己写，你也可以使用我们的两个实用插件之一，直接运行 CLI 命令，作为你构建的一部分。`@snowpack/plugin-build-script`&`@snowpack/plugin-run-script`。

#### @snowpack/plugin-build-script

```js
// snowpack.config.mjs
// [npm install @snowpack/plugin-build-script]
export default {
  plugins: [
    [
      "@snowpack/plugin-build-script",
      {
        cmd: "postcss",
        input: [".css"],
        output: [".css"],
      },
    ],
  ],
};
```

这个插件允许你将任何 CLI 连接到构建过程。只要给它一个`cmd`CLI 命令，它可以从`stdin`接受输入，并通过`stdout`发出构建结果。查看该[插件的文档](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-build-script)以了解更多信息。

#### @snowpack/plugin-run-script

```js
// snowpack.config.mjs
// [npm install @snowpack/plugin-run-script]
export default {
  plugins: [
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eleventy",
        watch: "$1 --watch",
      },
    ],
  ],
};
```

这个插件允许你运行任何 CLI 命令作为你开发和构建工作流程的一部分。这个插件并不影响构建输出，但它对于将开发人员的工具直接连接到 Snowpack 是很有用的。使用它可以在你编码时向开发控制台添加有意义的反馈，比如 TypeScript 类型检查和 ESLint lint 错误。这并不影响 Snowpack 如何构建网站。请查看[插件文档](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-run-script)以了解更多信息。

### 例子

#### PostCSS

```js
// snowpack.config.mjs
export default {
  plugins: [
    [
      "@snowpack/plugin-build-script",
      {
        cmd: "postcss",
        input: [".css"],
        output: [".css"],
      },
    ],
  ],
};
```

[`postcss-cli`](https://github.com/postcss/postcss-cli)包必须手动安装。你可以在当前工作目录下用`postcss.config.js`文件来配置 PostCSS。

#### ESLint

```js
// snowpack.config.mjs
export default {
  plugins: [
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eslint src --ext .js,.jsx,.ts,.tsx",
        // Optional: Use npm package "eslint-watch" to run on every file change
        watch: "esw -w --clear src --ext .js,.jsx,.ts,.tsx",
      },
    ],
  ],
};
```
