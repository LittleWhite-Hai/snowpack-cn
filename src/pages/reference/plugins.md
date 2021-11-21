---
layout: ../../layouts/content.astro
title: 插件 API
description: The Snowpack Plugin API and how to use it.
---

想开始编写你自己的插件吗？请看我们的[插件指南](/guides/plugins)，它概述了插件的工作原理，并提供了帮助你创建自己的插件的方法。

想找一个好的总结吗？请看我们的["SnowpackPlugin" TypeScript定义](https://github.com/snowpackjs/snowpack/blob/main/snowpack/src/types.ts#L130)，它是对插件API和所有支持选项的完整记录和最新概述。

### 概述

```js
// my-first-snowpack-plugin.js
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'my-first-snowpack-plugin',
    config() {
      console.log('Success!');
    },
  };
};

// To use this plugin, add it to your snowpack.config.mjs:
//
// export default {
//   plugins: [
//     ["./my-first-snowpack-plugin.js", {/* pluginOptions */ }],
//   ],
// };
```

一个**Snowpack Plugin**是一个对象接口，可以让你定制Snowpack的行为。Snowpack为你的插件提供了不同的钩子来连接。例如，你可以添加一个插件来处理Svelte文件，优化CSS，将SVG转换成React组件，在开发过程中运行TypeScript，等等。

Snowpack的插件界面受到[Rollup](https://rollupjs.org/)的启发。如果你以前写过一个Rollup插件，那么希望这些概念和术语感觉很熟悉。

### 生命周期钩子

#### config()

```js
config(snowpackConfig) {
  // modify or read from the Snowpack configuration object
}
```

使用这个钩子来读取或修改完成的Snowpack配置对象。这是目前访问Snowpack配置的推荐方式，因为传递给顶级插件函数的配置还没有最终确定，可能是不完整的。

#### load()

从磁盘上加载一个文件，并为你的应用程序构建它。这对于获取不能在浏览器中运行的文件类型（TypeScript、Sass、Vue、Svelte）并返回JS和/或CSS最为有用。它甚至可以用来直接从磁盘加载JS/CSS文件，并使用Babel或PostCSS等构建步骤。

#### transform()

转换文件的内容。对所有类型的构建输出（JS、CSS等）进行修改是非常有用的，无论它们最初是如何从磁盘加载的。

#### run()

运行一个CLI命令，并把它的输出连接到Snowpack控制台。对连接TypeScript等工具很有用。

#### optimize()

Snowpack的捆绑器插件API仍然是实验性的，在未来的版本中可能会有变化。请参阅我们的官方捆绑器插件，了解使用当前接口的例子。

- 例子: [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack)
- 例子: [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle)

#### onChange()

在被观察的文件发生变化时获得通知。这在与`markChanged()`插件方法配对时很有用，可以一次标记多个文件的变化。

参见[@snowpack/plugin-sass](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-sass/plugin.js)了解如何使用此方法的例子。

### 插件属性

#### 已知Entrypoints

    // Example: Svelte plugin needs to make sure this dependency can be loaded.
    knownEntrypoints: ["svelte/internal"]

Snowpack需要了解的作为`load()`或`transform(`)的一部分而添加的任何npm依赖项的列表。Snowpack在扫描一个项目的源代码时，会自动分析大多数依赖关系的导入，但有些导入是作为`load()`或`transform(`)步骤的一部分添加的，这意味着Snowpack不会看到它们。如果你的插件是这样做的，请在这里添加它们。

#### 解决

    // Example: Sass plugin compiles Sass files to CSS.
    resolve: {input: [".sass"], output: [".css"]}

    // Example: Svelte plugin compiles Svelte files to JS & CSS.
    resolve: {input: [".svelte"], output: [".js", ".css"]}

如果你的插件定义了一个`load()`方法，Snowpack将需要知道你的插件负责加载哪些文件，以及它的输出会是什么样子**。只有当你也定义了一个`load()`方法时才需要`resolve`**。

- `input`: 这个插件要加载的文件扩展名的数组。
- `output`: 这个插件的`load()`方法将输出的所有文件扩展名的集合。
- [完整的TypeScript定义](https://github.com/snowpackjs/snowpack/tree/main/snowpack/src/types/snowpack.ts)。

### 插件方法

#### this.markChanged()

```js
// Called inside any plugin hooks
this.markChanged('/some/file/path.scss');
```

手动标记一个文件为已更改，无论该文件是否在磁盘上改变。当与`markChanged()`插件钩子配对时，这可能是有用的，可以一次标记多个文件改变。

- 参见[@snowpack/plugin-sass](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-sass/plugin.js)以了解如何使用此方法的例子。
- [完整的TypeScript定义](https://github.com/snowpackjs/snowpack/blob/main/snowpack/src/types.ts)。
