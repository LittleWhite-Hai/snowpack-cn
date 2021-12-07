---
layout: ../../layouts/content.astro
title: snowpack.config.js
description: Snowpack configuration API 配置目录.
---

```js
// Example: snowpack.config.mjs
// The added "@type" comment will enable TypeScript type information via VSCode, etc.

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  plugins: [
    /* ... */
  ],
};
```

要在你的 Snowpack 项目中生成一个基本的配置文件，请运行`snowpack init`。

## Mode

**类型：**`"test" | "development" | "production"`

**默认值：**`snowpack dev`为`"development"`，`snowpack build`为`"production"`

指定 Snowpack 应该在哪个模式下运行。它主要影响的是运行时`import.meta.env.MODE`的值，此外，不同模式之间还有一些其他的区别。

- `"test"`:该模式下的`testOptions.files`的文件不会被忽略，并将作为正常的源文件被扫描和构建。当在 Snowpack 上面测试的时候很有用。

## Root

**类型：**`string` **默认值：**`/`

指定 Snowpack 的项目根目录。(以前是：`config.cwd`)

## workspaceRoot

**string：**`string`

指定工作区或 monorepo 的根目录。在配置好后，Snowpack 会把工作区中的任何同级包当作源文件，并在开发过程中通过免打包式的 Snowpack 构建流程来处理它们，流程包括支持快速刷新， HMR，文件变化监听，以及在 monorepos 下开发时的其他功能。

为生产环境构建网站时，路径下的包将像其他包一样，通过打包和 tree-shaken 形成单个文件以加快加载速度。

## install

这是过时的配置，现在被移动到`packageOptions.knownEntrypoints`了。

## extends

**类型**：`string`

继承自一个单独的 "base"配置。

可以是一个相对的文件路径，一个 npm 包，或者一个 npm 包中的文件。你的配置将被合并，放在 base 配置上面。

## exclude

**类型**：`string[]`

**默认值**：`['**/node_modules/**/*']`

不需要 Snowpack 处理的文件。

支持 glob 模式匹配。

## mount

    mount: {
      [path: string]: string | {url: string, resolve: boolean, static: boolean, dot: boolean}
    }

将本地目录映射到构建的项目中的自定义 URL。

- `mount.url`|`string`|_required_: 要挂载到的 URL。
- `mount.static`|`boolean`|_optional_| **默认值**：`false`: 如果为 true，则不在此目录中构建文件。直接从磁盘复制并提供给浏览器。
- `mount.resolve`|`boolean`|_optional_| **默认值**：`true`：如果是 false，就不会在 JS、CSS 和 HTML 文件中解析 JS 和 CSS 引入，而将代码中的 import 操作直接传给浏览器。
- `mount.dot`|`boolean`|_optional_| **默认值**:`false`：如果为 true，在最终构建时包含其它类型文件（例如：`.htaccess`）。

例子。

```js
// snowpack.config.mjs
// Example: Basic "mount" usage
export default {
  mount: {
    src: "/dist",
    public: "/",
  },
};
```

你可以通过使用扩展对象符号来进一步定制任何挂载目录的构建行为。

```js
// snowpack.config.mjs
// Example: expanded object notation "mount" usage
export default {
  mount: {
    // Same behavior as the "src" example above:
    src: { url: "/dist" },
    // Mount "public" to the root URL path ("/*") and serve files with zero transformations:
    public: { url: "/", static: true, resolve: false },
  },
};
```

## env

**类型**:`Record<string, string|boolean|undefined>`

声明任何应该在运行时暴露在`import.meta.en`上的环境变量。更多信息请参见[环境变量](/reference/environment-variables)。

```js
// snowpack.config.mjs
export default {
  env: {
    API_URL: "api.google.com",
  },
};
```

## alias

**类型**:`object`(package: 包或路径)

配置目录和包的 import 别名。

注意：在 Snowpack 的旧版本中，所有挂载的目录在默认情况下也可以作为别名。从 Snowpack 2.7 开始，这种情况不再存在。

```js
// snowpack.config.mjs
// Example: alias types
export default {
  alias: {
    // Type 1: Package Import Alias
    lodash: "lodash-es",
    react: "preact/compat",
    // Type 2: Local Directory Import Alias (relative to cwd)
    components: "./src/components",
    "@app": "./src",
  },
};
```

## plugins

**类型**：包含 pluginName 的`数组`或数组[`pluginName`, {`pluginOptions`}]

参见[插件指南](/guides/plugins)

```js
// snowpack.config.mjs
// Example: enable plugins both simple and expanded
export default {
  plugins: [
    // Simple format: no options needed
    'plugin-1',
    // Expanded format: allows you to pass options to the plugin
    ['plugin-2', {'plugin-option': false}],
  ];
}
```

## devOptions

**类型**:`object`(option 名称: value)

配置 Snowpack 开发服务器。

### devOptions.secure

**类型**:`boolean`或`object` **默认**:`false`

切换 Snowpack 开发服务器是否应该在启用 HTTP2 时使用 HTTPS。更多信息请参见《[SSL 证书](/guides/https-ssl-certificates)指南》。

如果该值为`true`，Snowpack 将在`根目录`中寻找`snowpack.crt`和`snowpack.key`文件。如果该值是一个`object`，你可以直接传如自定义的`cert`和`key`文件。

```js
// snowpack.config.mjs
import fs from "fs";

const cert = await fs.promises.readFile("/path/to/server.crt");
const key = await fs.promises.readFile("/path/to/server.key");

export default {
  devOptions: {
    secure: { cert, key },
  },
};
```

### devOptions.hostname

**类型**：`string`**默认**：`localhost`

开发服务器所运行的主机名。Snowpack 使用这个信息来配置 HMR websocket，并在启动时正确打开浏览器（见：[`devOptions.open`](#devoptions.open)）。

### devOptions.port

**类型**：`数字`**默认**：`8080`

开发服务器运行的端口。

### devOptions.openUrl

**类型**:`string`

可选的路径，用于附加到开发服务器的 URL 上。也可以包括查询字符串参数，例如：`test/foo.html?bar=123`。

### devOptions.open

**类型**:`string`**默认**:`"**Default**"`

配置开发服务器启动时在浏览器中的打开方式。

任何已安装的浏览器，例如 "chrome"、"firefox"、"brave"，或浏览器的路径。设置 "none"表示禁用。

### devOptions.output

**类型**:`"stream" | "dashboard"`**默认**：`"dashboard"`

设置`dev`控制台的输出模式。

- `"dashboard"`提供一个组织过的控制台输出和任何连接的工具的日志格式。这对大多数用户来说是推荐的，它能带来最好的日志体验。
- `"stream"`在 Snowpack 与其他命令并行运行时很有用，因为清除 shell 会清除在同一 shell 中运行的其他命令的重要输出。

### devOptions.hmr

**类型**：`boolean`**默认**：`true`

在 Snowpack 开发服务器上切换 HMR。

### devOptions.hmrDelay

**类型**：`number`（毫秒）**默认**：`0`

延迟 HMR 触发的浏览器更新的毫秒。

### devOptions.hmrPort

**类型**：`number`**默认**：[`devOptions.port`](#devoptions.port)

Snowpack 的 HMR Websocket 运行的端口。

### devOptions.hmrErrorOverlay

**类型**: `boolean` **默认**:`true`

在运行 HMR 时报错是否在浏览器内显示。

### devOptions.out

**类型**：`string`**默认**：`"build"`

*注意：*已被废弃，见`buildOptions.out`。

### devOptions.tailwindConfig

**类型**：`string`

如果使用 Tailwind，指定配置文件的路径。例如：`tailwindConfig。'./tailwind.config.js'。`

## installOptions

**类型**：`object`

*注意：*已被废弃，见`packageOptions`。

## packageOptions

**类型**:`object`

配置 npm 包如何被安装和使用。

### packageOptions.external

**类型**：`string[]`**示例**。`"external":["fs"]`

将一些 import 标记为外部。Snowpack 会忽略这些 import，并在你的最终构建中保持它们的原样。

这是一个高级功能。任何主要的浏览器都不支持直接 import，所以当一个被忽略的 import 直接发送到浏览器时，通常不会生效。除非你有一个特定的用例需要它，否则这很可能会失败。

### packageOptions.source

**类型**:`"local" | "remote"`**默认**：`"local"`**例子**。`"source":"local"`

JavaScript npm 包可以以两种不同的方式被处理：**local**和**remote**。每种模式都支持一组不同的包选项。你可以通过设置`packageOptions.source`属性在这两种不同的模式之间进行选择。

### packageOptions.source=local

从本地`node_modules/`目录加载依赖项。使用`npm`（或任何其他 npm-ready 软件包管理器）和`package.json`文件安装和管理依赖。

这是传统的 Snowpack 行为，与 Snowpack v2 相匹配。 对于已经使用 npm 来管理他们的前端依赖的人，推荐使用这种模式。

#### packageOptions.knownEntrypoints

**类型**：`string[]`

用 Snowpack 安装的已知的依赖项。用于安装任何不能被自动 import 扫描器检测到的依赖项（例如： CSS 文件）。

#### packageOptions.polyfillNode

**类型**:`boolean`**默认**:`false`

这将自动为浏览器尽可能多地 polyfill 任何 Node.js 依赖

转换依赖于 Node.js 内置模块（`"fs"`、`"path"`、`"url"`等）的包。你可以在[rollup-plugin-node-polyfills 文档](https://github.com/ionic-team/rollup-plugin-node-polyfills)中看到支持的 polyfills 的完整列表

如果你想定制这种 polyfill 行为，你可以提供你自己的 Rollup 插件。

```js
// snowpack.config.mjs
// Example: If `--polyfill-node` doesn't support your use-case, you can provide your own custom Node.js polyfill behavior
import rollupPluginNodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  packageOptions: {
    polyfillNode: false,
    rollup: {
      plugins: [rollupPluginNodePolyfills({crypto: true, ...})],
    },
  },
};
```

当`source="remote"`时，所有 Node.js 包都会被 polyfill。配置该选项仅在`source="local"`模式下支持。

#### packageOptions.env

**类型**:`{[ENV_NAME: string]:(string true)}`

在已安装的依赖项中设置一个`process.env`.环境变量。

如果设置为 true（例如：`{NODE_ENV: true}`或`--env NODE_ENV`），这将继承你当前的 shell 环境变量。否则，设置为一个字符串（ex:`{NODE_ENV: 'production'}`或`--env NODE_ENV=production`）来手动设置准确的值。

这个选项只在`source="local"`模式下支持。`source="remote"`还不支持这个功能。

#### packageOptions.packageLookupFields

**类型**：`string[]`**示例**。`"packageLookupFields"。["svelte"]`

为`package.json`文件的入口设置自定义查找字段，除了默认的 "module"、"main"等。

这个选项只在`source="local"`模式下支持。`source="remote"`还不支持这个功能。

#### packageOptions.packageExportLookupFields

**类型**：`string[]`**示例**。`"packageExportLookupFields"。["svelte"]`

为`package.json`的["exports"映射](https://nodejs.org/api/packages.html#packages_package_entry_points)设置自定义 lookup 字段

这个选项只在`source="local"`模式下支持。`source="remote"`还不支持这个功能。

#### packageOptions.rollup

**类型**: `Object`

允许自定义 Snowpack 的内部 Rollup 配置。

Snowpack 内部使用 Rollup 来安装包。这个`rollup`配置选项让你更深入地控制我们使用的内部 Rollup 配置。

- packageOptions.rollup.plugins |`RollupPlugin[]`- 提供一个自定义的 Rollup 插件数组，将在每个安装的包上运行。对于处理你的 npm 包中的非标准文件类型很有用。
- packageOptions.rollup.dedupe |`string[]`- 如果需要，将一个包的多个版本/副本重复复制到一个。这有助于防止某些包在从你的 node_modules 树上安装多个版本时出现问题。参见[rollup-plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve#usage)获取更多文档。
- packageOptions.rollup.context |`string`- 指定顶级的`this`值。有助于消除由遗留的 common.js 包引起的安装错误，这些包引用了顶层的 this 变量，在纯 ESM 环境中不存在。注意`"THIS_IS_UNDEFINED"`警告（"'this'关键字等同于'undefined'......并且已经被改写"）默认是静默的，除非`--verbose`被使用。

这个选项只在`source="local"`模式下支持。`source="remote"`不支持自定义 Rollup 安装选项。

### packageOptions.source=remote

启用流式包导入。从我们的远程 CDN 加载依赖。使用`snowpack`和项目`snowpack.deps.json`文件管理依赖。

[了解更多关于流式远程导入的信息](/guides/streaming-imports)。

#### packageOptions.origin

**类型**：`string`**默认** `：https://pkg.snowpack.dev`

从哪里导入软件包的 remote source。当你导入一个新的包时，Snowpack 将从这个 URL 中获取这些资源。

目前，origin 必须实现一个特定的响应格式，以便 Snowpack 能够为 ESM 解析。在 Snowpack 的未来版本中，我们计划增加对自定义 CDN 和导入源的支持。

#### packageOptions.cache

**类型**：`string`**默认**：`.snowpack`

你的项目缓存文件夹的位置，相对于项目根来说。Snowpack 会将缓存数据保存在这个文件夹中。例如，如果`packageOptions.types`被设置为 true，Snowpack 将保存 TypeScript 类型到这个文件夹中的`type`目录。

#### packageOptions.types

**类型**:`boolean`**默认**:`false`

如果为 true，Snowpack 将为每个包下载 TypeScript 类型。

## buildOptions

**类型**:`Object`(option name: value)

配置最终构建。

### buildOptions.out

**类型**：`string`**默认**：`"build"`

构建产物最终被放置的本地目录。

### buildOptions.baseUrl

**类型**:`string`**默认值**:`/`

在 HTML 中，用这个替换所有`%PUBLIC_URL%`的实例

灵感来自于同样的[Create React App](https://create-react-app.dev/docs/using-the-public-folder/)概念。如果你的应用将被部署到一个子目录下，这很有用。

### buildOptions.clean

**类型**:`boolean`**默认**:`true`

设置为`false`以防止 Snowpack 在两次构建之间删除构建输出文件夹`（buildOptions.out`）。

### buildOptions.cacheDirPath

**类型**：`string`  
**默认**：`./node_modules/.cache/snowpack`

指定缓存目录，打包的 Node 模块将被缓存在其中。

### buildOptions.webModulesUrl

*注意：*已被弃用，见`buildOptions.metaUrlPath`。

### buildOptions.metaDir

*注意：*已废弃，请参见`buildOptions.metaUrlPath`。

### buildOptions.metaUrlPath

**类型**：`string`**默认**。`_snowpack`

重命名 Snowpack 的 metadata 默认目录。在每次构建中，Snowpack 都会创建 meta 文件，用于加载[HMR](/concepts/hot-module-replacement)、[环境变量](/reference/environment-variables)和你构建的 npm 包等。

当你构建项目时，这是相对于`buildOptions.out`目录的一个路径。

### buildOptions.sourcemap

**类型**：`boolean`**默认**：`false`

生成 sourcemap。

**Experimental**: 仍在施工，在这项支持最终完成之前，你在使用 sourcemap 时可能会遇到一些问题。

### buildOptions.watch

**类型**：`boolean`**默认**：`false`

通过一个文件观察器运行 Snowpack 的 build pipeline。当你有一个自定义的前端服务器（例如：Rails、PHP 等）而不能使用 Snowpack 开发服务器时，这个选项对本地开发有效。

### buildOptions.htmlFragments

**类型**：`boolean`**默认**：`假`

控制 HTML 是否像完整的 HTML 页面一样被转化。

HTML 片段是指不以`<！doctype html>`开头的 HTML 文件。

### buildOptions.jsxFactory

**类型**：`string`**默认**。`React.createElement`(如果检测到 Preact 引入，则为`h`)

设置用于创建 JSX 元素的函数名。

### buildOptions.jsxFragment

**类型**：`string`**默认**。`React.Fragment`(如果检测到 Preact 引入，则为`Fragment`)

设置用于创建 JSX 代码的函数名。

### buildOptions.jsxInject

**类型**：`string`**默认**：`undefined`

如果设置，这个字符串可以用来为每个 JJSX/TSX 文件自动注入 JJSX 导入。 React 用户可以使用`import React from 'react'`，而 Preact 用户可以使用`import { h, Fragment } from 'preact'`。

## TestOptions

对测试的配置。

### testOptions.files

**类型**：`string[]`**默认**。`["__tests__/**/*","**/*.@(spec|test).*"]`

指定测试文件。如果`NODE_ENV`被设置为 "test"，Snowpack 就会在你的网站构建中引入这些文件，并扫描它们的可安装依赖。否则，Snowpack 会排除这些文件。

## experiments

**类型**:`object`(option name: value)

这一部分目前是空的!在未来，这部分可能会被用于实验性的和尚未最终确定的内容。
