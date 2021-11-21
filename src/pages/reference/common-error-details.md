---
layout: ../../layouts/content.astro
title: 常见错误
description: How to troubleshoot common issues and error messagesm, plus our resources for getting help.
---

本页详细介绍了几个常见的问题和错误信息。对于进一步的帮助，我们有一个活跃的[GitHub讨论论坛](https://github.com/snowpackjs/snowpack/discussions)和[Discord](https://discord.gg/snowpack)。开发人员和社区贡献者经常在这两个论坛上回答问题。

### 没有这样的文件或目录

    ENOENT: no such file or directory, open …/node_modules/csstype/index.js

这个错误信息有时会出现在旧版本的Snowpack中。

**要解决这个问题**。升级到Snowpack`v2.6.0`或更高版本。如果你在较新版本的Snowpack中继续看到这个意外的错误，请提交一个问题。

### 包存在，但package.json的 "exports "不包括条目

Node.js最近增加了对package.json "exports "条目的支持，该条目定义了哪些文件可以从一个包内导入，哪些不能。例如，Preact定义了一个 "exports "地图，允许你导入 "preact/hooks"，但不能导入 "preact/some/custom/file-path.js"。这使得包可以控制它们的 "公共 "接口。

如果你看到这个错误信息，这意味着你导入了一个导出地图中不允许的文件路径。如果你认为这是一个错误，请与包的作者联系，要求将该文件添加到他们的导出地图中。

### 未发现的语法错误。请求的模块'./XXXX.js'不提供名为'YYYYY'的导出文件。

如果你使用的是TypeScript，如果你导入或导出的东西只存在于TypeScript中（比如一个类型或接口），而实际上并不存在于最终的JavaScript代码中，就会出现这个错误。

我们内置的TypeScript支持可以检测到纯类型的导入，并会尝试自动删除它们。然而，这对于纯类型的导出语句来说要困难得多，因为Snowpack无法检测到导出的符号是一个类型，而没有在多个文件中保持上下文。例如，像`export { MyInterfaceName }`这样的语句在Snowpack中不会起作用。

**要解决这个问题**。在`tsconfig.json`中启用[`孤立的模块`](https://www.typescriptlang.org/tsconfig#isolatedModules)，以识别有问题的情况。使用`import type { MyInterfaceName }`和`export type { MyInterfaceName }`来帮助 Snowpack 忽略类型。

如果命名的导入与旧的Common.js npm包一起使用，也会出现这个错误。由于我们的软件包扫描器的改进，对于大多数软件包来说，这不再是一个常见的问题。然而，有些包的编写或编译方式使得自动导入扫描无法进行。

**要解决这个问题**。对于不能被分析的传统Common.js/UMD包，使用默认的导入`（import pkg from 'my-old-package'`）。或者，在你的`packageOptions.namedExports`配置中添加包的名称，以便在运行时进行导入扫描。

```js
// snowpack.config.mjs
export default {
  packageOptions: {
    namedExports: ['@shopify/polaris-tokens'],
  },
};
```

### 安装非JS包

当从npm安装包时，你可能会遇到一些文件格式，只有在额外的解析/处理下才能运行。首先检查一下是否有[针对该类型文件的Snowpack插件](/plugins)。

因为我们的内部安装程序是由Rollup驱动的，你也可以在你的[Snowpack配置](/reference/configuration)中添加Rollup插件来处理这些特殊的、罕见的文件。

```diff
  // snowpack.config.mjs
  export default {
+   rollup: {
+     plugins: [require('rollup-plugin-sass')()],
+   },
  };
```

更多信息请参考[Rollup关于插件的文档](https://rollupjs.org/guide/en/#using-plugins)。

### RangeError:无效的WebSocket框架。RSV1必须是清晰的

**要解决这个问题**。为开发服务器使用`8080`以外的任何其他端口。要做到这一点，在你的[Snowpack配置](/reference/configuration)中指定一个端口。

```diff
  // snowpack.config.mjs
  export default {
+   devOptions: {
+     port: 3000,
+   },
  };
```

### 没有找到软件包"\[name]"。你安装了它吗？

当Snowpack认为某些东西在`node_modules`中，但找不到它时，就会出现这个警告。这通常是因为你试图导入一些没有前导词`/`、`./`、或`./`的东西。

下面是一些可能的解决方法。

#### 我正试图从npm导入一个文件

如果你试图导入一个npm包，试着运行以下程序。

    npm install [package].

然后重新运行Snowpack。如果问题仍然存在，可以尝试用[别名](https://www.snowpack.dev/reference/configuration#alias)告诉Snowpack在哪里可以找到它。

```diff
  // snowpack.config.mjs
  export default {
+   alias: {
+     myPackage: './path/to/myPackage',
+   },
  };
```

#### 我正在尝试导入一个本地的`.js`文件。

如果你在试图导入一个本地文件时遇到这个错误，修复方法通常是这样的。

```diff
- import myFile from 'myFile.js';
+ import myFile from './myFile.js';
```

如果这个问题仍然存在，[请开一个问题](https://github.com/snowpackjs/snowpack/issues/new/choose)。

#### 我正在尝试导入一个本地的`.css`文件

对`.css`文件的修复与JS类似。在导入路径前加一个`./，`像这样。

```diff
- @import "myfile.css";
+ @import "./myfile.css";
```

虽然你可能习惯于在写CSS时不加`./`，而且浏览器也会尊重它，但Snowpack的工作方式有些不同。因为我们允许你从npm无缝导入，`myfile.css`将被解析为一个npm包，而`/myfile.c`ss、`./myfile.css`和`./myfile.`css将被解析为本地项目文件。

另外，`./myfile.css`是完全有效的，养成一致使用它的习惯是很好的，可以防止模糊的解析。
