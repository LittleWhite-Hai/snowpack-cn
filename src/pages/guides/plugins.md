---
layout: ../../layouts/content.astro
title: 创造你自己的插件
description: Learn the basics of our Plugin API through working examples.
---

一个**Snowpack 插件**可以让你用新的行为扩展 Snowpack。插件可以与 Snowpack 构建管道的不同阶段挂钩，以增加对新文件类型和你最喜欢的开发工具的支持。添加插件以支持 Svelte，将 Sass 编译为 CSS，将 SVG 转换为 React 组件，打包你的最终构建，在开发过程中进行类型检查，以及更多。

本指南将带领你创建和发布你的第一个插件。

- Snowpack 插件的基本结构
- 如何从 Snowpack Plugin API 中选择正确的钩子
- 如何发布你的插件并将其添加到我们的[插件](/plugins)目录中

先决条件：Snowpack 插件是用 JavaScript 编写的，并通过 Node.js 运行，因此需要具备这两方面的基本知识。

## 创建和测试你的第一个插件

在这一步中，你将创建一个简单的插件支架，你可以根据指南中的例子把它变成一个有效的插件。

为你的插件创建一个名为`my-snowpack-plugin`的目录，并在其中创建一个`my-snowpack-plugin.js`文件。

```js
// my-snowpack-plugin.js
// Example: a basic Snowpack plugin file, customize the name of the file and the value of the name in the object
// snowpackConfig = The Snowpack configuration object
// pluginOptions = user-provided configuration options
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "my-snowpack-plugin",
  };
};
```

为了测试你的新插件，运行`npm init`来创建一个基本的`package.json`，然后在你的插件目录中运行`npm link`，在全局范围内（在你的开发机器上）公开该插件。

为了测试，在不同的目录下[创建一个新的 Snowpack 示例项目](/tutorials/getting-started)。在你的示例 Snowpack 项目中，运行`npm install && npm link my-snowpack-plugin`（使用你的插件的`package.json`中的名称）。

> 另一种方法是使用`npm install --save-dev path_to_your_plugin`，这将在你的 Snowpack 项目的`package.`json 中创建 "类似 symlink "的条目。

在你的示例 Snowpack 项目中，将你的插件和任何你想测试的插件选项一起添加到`snowpack.config.mjs`中。

```js
// snowpack.config.mjs
// Example: enabling a Snowpack plugin called "my-snowpack-plugin"
export default {
  plugins: ["my-snowpack-plugin"],
};
```

## 测试和故障排除

- TODO: 创建一个完整的测试程序
- 提示：在命令中添加`--verbose`以查看步骤，例如，`snowpack dev --verbose`或`snowpack build --verbose`。

## 为你的插件添加用户可配置的选项

TODO 让这成为一个真实的例子 在这一步，你将学习如何为你的插件添加用户可配置的选项，并在你的插件代码中使用它们。

在你的例子 Snowpack 项目中，不要把插件启用为一个包含插件名称的字符串，而是使用一个数组。第一项是你的插件的名称，第二项是包含插件选项的新对象。

```diff
  // snowpack.config.mjs
  export default {
    plugins: [
-     'my-snowpack-plugin'
+     ['my-snowpack-plugin', { optionA: 'foo', optionB: true }]
    ]
  };
```

你可以通过`pluginOptions`来访问这些

```diff
  // my-snowpack-plugin.js
  module.exports = function (snowpackConfig, pluginOptions) {
+   let optionA = pluginOptions.optionA;
+   let optionB = pluginOptions.optionB;
    return {
      name: 'my-snowpack-plugin',
    };
  };
```

### 插件使用案例

Snowpack 使用一个内部的**构建管道**来构建你的应用程序中的文件，用于开发和生产。每个源文件都会经过构建管道，这意味着 Snowpack 可以构建的不仅仅是 JavaScript。图片、CSS、SVG 等都可以由 Snowpack 构建。

#### 构建插件

Snowpack 找到第一个声称可以`解决`给定文件的插件。然后它调用该插件的`load()`方法，将文件加载到你的应用程序中。这就是编译语言（TypeScript、Sass、JJSX 等）被加载并编译成可以在网络上运行的东西（JS、CSS 等）。

#### 转换插件

一旦加载，每个文件都会再次通过构建管道，通过所有提供该方法的插件的匹配`转化（）`方法运行。插件可以在完成文件构建之前对文件进行转换以修改其内容。

#### 开发工具插件

Snowpack 插件支持一个`run()`方法，它可以让你运行任何 CLI 工具并将其输出连接到 Snowpack 中。你可以用它来运行你最喜欢的开发工具（linters，TypeScript 等）与 Snowpack，并通过 Snowpack 开发者控制台自动报告其输出。如果命令失败，你可以选择让你的生产构建失败。

#### 打包工具插件

Snowpack 默认为你构建一个可运行的、未打包的网站，但你可以通过插件`optimize()`方法用你喜欢的打包工具（webpack、Rollup、Parcel 等）来优化这个最终构建。当使用打包插件时，Snowpack 会在你的构建中自动运行打包工具来优化它。

请参阅我们的官方[@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack)bundler 插件，了解使用当前接口的例子。

### 例子：入门

要创建一个 Snowpack 插件，你可以从以下文件模板开始。

```js
// my-snowpack-plugin.js
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "my-snowpack-plugin",
    // ...
  };
};
```

```js
// snowpack.config.mjs
export default {
  plugins: [
    [
      "./my-snowpack-plugin.js",
      {
        optionA: "foo",
        optionB: "bar",
      },
    ],
  ],
};
```

一个 Snowpack 插件应该以一个函数的形式发布，这个函数可以通过调用插件特定的选项来返回一个插件对象。 Snowpack 会自动调用这个函数来加载你的插件。该函数接受 2 个参数，按照这个顺序。

1. [Snowpack 配置对象](/reference/configuration)`(snowpackConfig`)
1. (可选）用户提供的配置选项`（pluginOptions`）。

### 例子：转换一个文件

对于我们的第一个例子，我们将看看如何转换一个文件。

```js
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "my-commenter-plugin",
    async transform({ id, contents, isDev, fileExt }) {
      if (fileExt === ".js") {
        return `/* I’m a comment! */ ${contents}`;
      }
    },
  };
};
```

这个函数返回的对象是一个**Snowpack Plugin**。一个插件由一个`名称`属性和一些进入 Snowpack 生命周期的钩子组成，以定制你的构建管道或开发环境。在上面的例子中，我们有。

- **名称**属性。你的插件的名称。如果发布到 npm，这通常与你的软件包名称相同。
- **转换方法**。一个允许你转换和修改已建文件的函数。在这种情况下，我们在你构建的每个 JS 文件的开头添加一个简单的注释`（/*我是一个注释*/`）。

这涵盖了单文件转换的基础知识。在下一个例子中，我们将展示如何编译一个源文件并在此过程中改变文件扩展名。

### 例子：从源码构建

当你从源代码构建文件时，你也有能力将文件类型从源代码转换为网络代码。在这个例子中，我们将使用 Babel 加载几种类型的文件作为输入，并在最终构建时输出 JavaScript。

```js
const babel = require("@babel/core");

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "my-babel-plugin",
    resolve: {
      input: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
      output: [".js"],
    },
    async load({ filePath }) {
      const result = await babel.transformFileAsync(filePath);
      return result.code;
    },
  };
};
```

这是官方 Snowpack Babel 插件的简化版，它用`load()`方法构建应用程序中的所有 JavaScript、TypeScript 和 JSX 文件。

`load()`方法负责从磁盘加载和构建文件，而`resolve`属性则告诉 Snowpack 插件可以加载哪些文件，以及期望输出什么。在这种情况下，该插件要求负责匹配在`resolve.input` 中发现的任何文件扩展名的文件，并输出`.js`JavaScript（通过`resolve.output` 声明）。`resolve.output`也可以使用多部分扩展名，如`.module.css`或`.hbs.js`-文件将从最具体的扩展名到最小的扩展名进行匹配。

**请看它的操作**。假设我们有一个源文件在`src/components/App.jsx`。因为`.jsx`文件的扩展名与我们的插件的`resolve.input`数组中的扩展名相匹配，所以 Snowpack 让这个插件负责加载这个文件。`load()`执行，Babel 从磁盘中构建 JJSX 输入文件，JavaScript 被返回到最终构建。

### 例子：多文件构建

对于一个更复杂的例子，我们将采取一个输入文件（`.svelte`），并使用它来生成两个输出文件（`.js`和`.css`）。

```js
const fs = require("fs").promises;
const svelte = require("svelte/compiler");

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "my-svelte-plugin",
    resolve: {
      input: [".svelte"],
      output: [".js", ".css"],
    },
    async load({ filePath }) {
      const fileContents = await fs.readFile(filePath, "utf-8");
      const { js, css } = svelte.compile(fileContents, { filename: filePath });
      return {
        ".js": js && js.code,
        ".css": css && css.code,
      };
    },
  };
};
```

这是官方 Snowpack Svelte 插件的一个简化版本。如果你不熟悉 Svelte，不要担心，只要知道构建一个 Svelte 文件（`.svelte`）会生成 JS 和 CSS，供我们最终构建。

在这种情况下，`resolve`属性只接受一个`输入`文件类型（`['.svelte']`），但有两个`输出`文件类型（`['.js', '.css']`）。这与 Svelte 的构建过程和我们的`load()`方法的返回项相匹配。

**请看它的操作**。假设我们有一个源文件在`src/components/App.svelte`。因为`.svelte`文件的扩展名与我们的插件的`resolve.input`数组中的扩展名相匹配，所以 Snowpack 让这个插件负责加载这个文件。`load()`执行后，Svelte 从磁盘中构建文件，JavaScript 和 CSS 都被返回到最终构建中。

请注意，`.svelte`在`resolve.output`中没有出现，也没有被`load()`返回。只有`load()`方法返回的文件才包括在最终构建中。如果你想让你的插件在最终构建中保留原始源文件，你可以在返回对象中添加`{ '.svelte': contents }`。到返回对象中。

### 例子：服务器端渲染(SSR)

插件可以通过`load()`插件钩子为 SSR 产生服务器优化的代码。`isSSR`标志告诉插件，Snowpack 正在为服务器请求你的文件，并且它将期待一个在服务器上运行的响应。

一些框架/语言（如 React）在浏览器和服务器上都运行相同的代码。其他的（如 Svelte）将为服务器创建不同于浏览器的输出。在下面的例子中，我们使用`isSSR`标志来告诉 Svelte 编译器在 Snowpack 的要求下生成服务器优化的代码。

```js
const svelte = require("svelte/compiler");
const fs = require("fs");

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "basic-svelte-plugin",
    resolve: {
      input: [".svelte"],
      output: [".js", ".css"],
    },
    async load({ filePath, isSSR }) {
      const svelteOptions = {
        /* ... */
      };
      const codeToCompile = fs.readFileSync(filePath, "utf-8");
      const result = svelte.compile(codeToCompile, {
        ...svelteOptions,
        ssr: isSSR,
      });
      // ...
    },
  };
};
```

如果你不确定你的插件是否需要特殊的 SSR 支持，你可能可以跳过这一点，忽略插件中的`isSSR`标志。许多语言不需要这个，而且 SSR 总是由用户有意选择的。

### 例子：优化和打包

Snowpack 通过`optimize()`钩子支持可插拔的打包插件和其他构建优化。该方法在构建后运行，给插件一个优化最终构建目录的机会。Webpack、Rollup 和其他只针对构建的优化应该使用这个钩子。

```js
module.exports = function(snowpackConfig, pluginOptions) {
  return {
    name: 'my-custom-webpack-plugin',
    async optimize({ buildDirectory }) {
      await webpack.run({...});
    }
  };
};
```

这是`@snowpack/plugin-webpack`插件的一个（明显）简化版本。当构建命令完成构建你的应用程序时，这个插件钩子被调用，并以`buildDirectory`路径作为参数。由该插件从该目录读取构建文件，并将任何更改写回该目录。更改应该在原地进行，所以只在最后写入文件，并确保自己清理干净（如果一个文件在优化/打包后不再需要，就可以安全地删除）。

### 测试

要开发和测试一个 Snowpack 插件，其策略与其他 npm 包相同。

- 创建你的新插件项目（可以用`npm init`或`yarn init`），例如 npm name:`my-snowpack-plugin`，并在其中粘贴上述的代码片段
- 在你的插件的项目文件夹中运行`npm link`，在全局范围内公开该插件（就你的开发机器而言）。
- 在不同的地方创建一个新的 Snowpack 示例项目进行测试
- 在你的示例 Snowpack 项目中，运行`npm install && npm link my-snowpack-plugin`（使用你的插件的`package.json`中的名称）。
  - 请注意，`npm install`会删除你的链接插件，所以在任何安装中，你都需要重新做`npm link my-snowpack-plugin`。
  - (另一种方法是使用`npm install --save-dev `，这将在你的 Snowpack 项目的`package.`json 中创建 "symlink-like "条目)

在你的示例 Snowpack 项目中，将你的插件和任何你想测试的插件选项一起添加到`snowpack.config.mjs`中。

```js
export default {
  plugins: [
    [
      "my-snowpack-plugin",
      {
        "option-1": "testing",
        "another-option": false,
      },
    ],
  ],
};
```

### 发布插件

要与世界分享一个插件，你可以把它发布到 npm。例如，看看[snowpack-plugin-starter-template](https://github.com/snowpackjs/snowpack-plugin-starter-template)，它可以让你快速启动和运行。你可以直接复制它，也可以简单地拿走你需要的东西。

一般来说，请确保注意以下的检查清单。

- ✔️ 你的`package.json`文件有一个指向最终构建的`主`条目
- ✔️ 你的代码被编译成可以在 Node >= 10 上运行。
- ✔️ 你的软件包 README 包含一个自定义选项列表，如果你的插件是可配置的。

### 提示/问题

- 请记住。一个源文件将总是被第一个`load()`插件加载，以索取它，但构建结果将通过每个`转换`函数运行。
- Snowpack 将始终保持原始文件名`（App`），只在构建过程中改变扩展名。
- Snowpack 中的扩展名总是有一个领先的`.`字符（例如：`.js`，`.ts`）。这是为了匹配 Node 的`path.extname()`行为，同时确保我们不匹配扩展名子串（例如，如果我们在文件末尾匹配`js`，我们也不希望意外地匹配`.mjs`文件；我们希望在这里明确一点）。
- `resolve.input`和`resolve.output`文件扩展数组对于 Snowpack 如何理解你的构建管道至关重要，并且总是需要`load()`正确运行。
- 如果`load()`没有返回任何东西，该文件就不会被加载，而会调用下一个合适的插件的`load()`。
- 如果`transform()`没有返回任何东西，文件就不会被转化。
- 如果你想建立一个只在初始化时运行一些代码的插件（比如`@snowpack/plugin-dotenv`），把你的副作用代码放在返回插件的函数里面。但一定要确保仍然返回一个插件对象。一个简单的`{ name }`对象就可以了。
