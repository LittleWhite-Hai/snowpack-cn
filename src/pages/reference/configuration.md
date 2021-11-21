---
layout: ../../layouts/content.astro
title: snowpack.config.js
description: The Snowpack configuration API reference.
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

要在你的Snowpack项目中生成一个基本的配置文件支架，请运行`snowpack init`。

## 模式

**类型**。`"test" | "development" | "production"`**默认**：`snowpack dev`为`"development"`，`snowpack build`为`"production"`。

指定Snowpack应该在哪个 "模式 "下运行。它的主要影响是在运行时`import.meta.env.MODE`的值，尽管模式之间还有一些其他的关键区别。

- `"test"`:`testOptions.文件`不被排除，并将作为正常的源文件被扫描和构建。当在Snowpack上面运行测试的时候很有用。

## 根

**类型**：`字符串`**默认**。`/`

指定一个使用Snowpack的项目的根。(以前是：`config.cwd`)

## workspaceRoot

**类型**:`字符串`

指定你的工作区的根，如果你使用的是monorepo。当配置好后，Snowpack将把你的工作区中的任何同级包当作源文件，并在开发过程中通过你的非捆绑式Snowpack构建管道来传递它们。这允许快速刷新，支持HMR，观察文件变化，以及在单端口工作时的其他开发改进。

当你为生产构建你的网站时，symlinked软件包将像其他软件包一样被处理，被捆绑和树形摇动成单个文件，以加快加载速度。

## 安装

废弃了!移至`packageOptions.knownEntrypoints`

## 延伸

**类型**：`字符串`

继承自一个单独的 "基础 "配置。

可以是一个相对的文件路径，一个npm包，或者一个npm包中的文件。你的配置将被合并在扩展的基本配置之上。

## 排除

**类型**：`字符串[]`**默认**。`['**/node_modules/**/*']`

从Snowpack管道中排除任何文件。

支持glob模式匹配。

## 挂载

    mount: {
      [path: string]: string | {url: string, resolve: boolean, static: boolean, dot: boolean}
    }

将本地目录挂载到你构建的应用程序中的自定义URL。

- `mount.url`|`string`|_required_: 要挂载到的URL，与上面的简单表格中的字符串相匹配。
- `mount.static`|`boolean`|_optional_|**默认**：`false`: 如果为真，则不在此目录中构建文件。直接从磁盘复制并提供给浏览器。
- `mount.resolve`|`boolean`|_optional_|**默认值**：`true`：如果是false，就不要在JS、CSS和HTML文件中解析JS和CSS导入。相反，将每一个导入的文件都发送给浏览器，就像写的那样。
- `mount.dot`|`boolean`|_optional_|**默认值**:`false`。如果为true，在最终构建时包括点文件（例如：`.htaccess`）。

例子。

```js
// snowpack.config.mjs
// Example: Basic "mount" usage
export default {
  mount: {
    src: '/dist',
    public: '/',
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
    src: {url: '/dist'},
    // Mount "public" to the root URL path ("/*") and serve files with zero transformations:
    public: {url: '/', static: true, resolve: false},
  },
};
```

## env

**类型**。`记录。`

声明任何应该在运行时暴露在`import.meta.en`上的环境变量。更多信息请参见[环境变量](/reference/environment-variables)。

```js
// snowpack.config.mjs
export default {
  env: {
    API_URL: 'api.google.com',
  },
};
```

## 别名

**类型**:`对象`(package: 包或路径)

配置目录和包的导入别名。

注意：在Snowpack的旧版本中，所有挂载的目录也可以作为**默认**的别名。从Snowpack 2.7开始，这种情况不再存在，**默认情况下**没有别名被定义。

```js
// snowpack.config.mjs
// Example: alias types
export default {
  alias: {
    // Type 1: Package Import Alias
    lodash: 'lodash-es',
    react: 'preact/compat',
    // Type 2: Local Directory Import Alias (relative to cwd)
    components: './src/components',
    '@app': './src',
  },
};
```

## 插件

**类型**：包含pluginName`字符串`的`数组`或数组`[pluginName`, {`pluginOptions`}。

启用Snowpack插件和它们的选项。

也请看我们的[插件指南](/guides/plugins)

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

**类型**:`对象`(选项名称: 值)

配置Snowpack开发服务器。

### devOptions.secure

**类型**:`布尔值`或`对象`**默认**:`false`

切换Snowpack开发服务器是否应该在启用HTTP2时使用HTTPS。更多信息请参见《[SSL证书](/guides/https-ssl-certificates)指南》。

如果该值为`true`，Snowpack将在你的`根目录`中寻找`snowpack.crt`和`snowpack.key`文件。如果该值是一个`对象`，你可以直接传递你的自定义`证书`和`密钥`文件。

```js
// snowpack.config.mjs
import fs from 'fs';

const cert = await fs.promises.readFile('/path/to/server.crt');
const key = await fs.promises.readFile('/path/to/server.key');

export default {
  devOptions: {
    secure: {cert, key},
  },
};
```

### devOptions.hostname

**类型**：`字符串`**默认**：`localhost`

开发服务器所运行的主机名。Snowpack使用这个信息来配置HMR websocket，并在启动时正确打开你的浏览器（见：[`devOptions.open`](#devoptions.open)）。

### devOptions.port

**类型**：`数字`**默认**：`8080`

开发服务器运行的端口。

### devOptions.openUrl

**类型**:`字符串`

可选的路径，用于附加到开发服务器的URL上。也可以包括查询字符串参数，例如：`test/foo.html?bar=123`。

### devOptions.open

**类型**:`字符串`**默认**:`"**Default**"`

配置开发服务器启动时在浏览器中的打开方式。

任何已安装的浏览器，例如 "chrome"、"firefox"、"brave"，或浏览器的路径。设置 "none "表示禁用。

### devOptions.output

**类型**。`"stream" | "dashboard"`**默认**：`"dashboard"`

设置`开发`控制台的输出模式。

- `"dashboard "`提供一个有组织的控制台输出和任何连接的工具的日志布局。这对大多数用户来说是值得推荐的，并能带来最好的日志体验。
- `"stream "`在Snowpack与其他命令并行运行时很有用，因为清除shell会清除在同一shell中运行的其他命令的重要输出。

### devOptions.hmr

**类型**：`布尔型`**默认**：`true`

在Snowpack开发服务器上切换HMR。

### devOptions.hmrDelay

**类型**：`数字`（毫秒）**默认**：`0`

延迟HMR触发的浏览器更新的毫秒。

### devOptions.hmrPort

**类型**：`数字`**默认**：[`devOptions.port`](#devoptions.port)

Snowpack的HMR Websocket运行的端口。

### devOptions.hmrErrorOverlay

**类型**: 布尔`型`**默认**:`true`

在运行HMR时切换显示JavaScript运行时错误的浏览器叠加。

### devOptions.out

**类型**：`字符串`**默认**：`"build"`

_注意：_已被废弃，见`buildOptions.out`。

### devOptions.tailwindConfig

**类型**：`字符串`

如果使用Tailwind，指定你的配置文件的路径。例如：`tailwindConfig。'./tailwind.config.js'。`

## installOptions

**类型**：`对象`

_注意：_已被废弃，见`packageOptions`。

## packageOptions

**类型**:`对象`

配置npm包如何被安装和使用。

### packageOptions.external

**类型**：`字符串[]`**示例**。`"external":["fs"]`

将一些导入标记为外部。Snowpack会忽略这些导入，并在你的最终构建中保持它们的原样。

这是一个高级功能。任何主要的浏览器都不支持裸露的导入，所以当一个被忽略的导入直接发送到浏览器时，通常会失败。除非你有一个特定的用例需要它，否则这很可能会失败。

### packageOptions.source

**类型**。`"本地" | "远程"`**默认**：`"本地"`**例子**。`"源"。"本地"`

你的JavaScript npm包可以以两种不同的方式被消费：**本地**和**远程**。每种模式都支持一组不同的包选项。你可以通过设置`packageOptions.source`属性在这两种不同的模式之间进行选择。

### packageOptions.source=local

从你的本地`node_modules/`目录加载你的依赖项。使用`npm`（或任何其他npm-ready软件包管理器）和项目`package.json`文件安装和管理你的依赖项。

这是传统的Snowpack行为，与Snowpack v2相匹配。 对于已经使用npm来管理他们的前端依赖的人，推荐使用这种模式。

#### packageOptions.knownEntrypoints

**类型**：`字符串[]`

用Snowpack安装的已知的依赖项。用于安装任何不能被我们的自动导入扫描器检测到的依赖项（例如：包的CSS文件）。

#### packageOptions.polyfillNode

**类型**:`布尔型`**默认**:`false`

这将自动为浏览器尽可能多地填充任何Node.js的依赖项

转换依赖于Node.js内置模块（`"fs"`、`"path"`、`"url "`等）的包。你可以在[rollup-plugin-node-polyfills文档](https://github.com/ionic-team/rollup-plugin-node-polyfills)中看到支持的polyfills的完整列表

如果你想定制这种polyfill行为，你可以为安装程序提供你自己的Rollup插件。

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

当`source="remote "`时，总是提供Node.js polyfills。配置该选项仅在`source="local "`模式下支持。

#### packageOptions.env

**类型**。`{[ENV_NAME: string]:(string true)}`

在已安装的依赖项中设置一个`process.env`.环境变量。

如果设置为true（例如：`{NODE_ENV: true}`或`--env NODE_ENV`），这将继承你当前的shell环境变量。否则，设置为一个字符串（ex:`{NODE_ENV: 'production'}`或`--env NODE_ENV=production`）来手动设置准确的值。

这个选项只在`source="local "`模式下支持。`source="remote "`还不支持这个功能。

#### packageOptions.packageLookupFields

**类型**：`字符串[]`**示例**。`"packageLookupFields"。["svelte"]`

为依赖性`package.json`文件的入口设置自定义查找字段，除了默认的 "module"、"main "等。

这个选项只在`source="local "`模式下支持。`source="remote "`还不支持这个功能。

#### packageOptions.packageExportLookupFields

**类型**：`字符串[]`**示例**。`"packageExportLookupFields"。["svelte"]`

为依赖性`package.json`的["出口 "映射](https://nodejs.org/api/packages.html#packages_package_entry_points)设置自定义查找字段[。](https://nodejs.org/api/packages.html#packages_package_entry_points)

这个选项只在`source="local "`模式下支持。`source="remote "`还不支持这个功能。

#### packageOptions.rollup

**类型**。`对象`

允许自定义Snowpack的内部Rollup配置。

Snowpack内部使用Rollup来安装你的软件包。这个`rollup`配置选项让你更深入地控制我们使用的内部Rollup配置。

- packageOptions.rollup.plugins |`RollupPlugin[]`- 提供一个自定义的Rollup插件数组，将在每个安装的软件包上运行。对于处理你的npm包中的非标准文件类型很有用。
- packageOptions.rollup.dedupe |`string[]`- 如果需要，将一个软件包的多个版本/副本重复复制到一个。这有助于防止某些包在从你的node_modules树上安装多个版本时出现问题。参见[rollup-plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve#usage)获取更多文档。
- packageOptions.rollup.context |`string`- 指定顶级的`这个`值。有助于消除由遗留的common.js包引起的安装错误，这些包引用了顶层的this变量，在纯ESM环境中不存在。注意`"THIS_IS_UNDEFINED "`警告（"'this'关键字等同于'undefined'......并且已经被改写"）默认是沉默的，除非`--verbose`被使用。

这个选项只在`source="local "`模式下支持。`source="remote "`不支持自定义Rollup安装选项。

### packageOptions.source=remote

启用流式软件包导入。从我们的远程CDN加载依赖性。使用`snowpack`和项目`snowpack.deps.json`文件管理你的依赖关系。

[了解更多关于流式远程导入](/guides/streaming-imports)的信息。

#### packageOptions.origin

**类型**：`字符串`**默认** `：https://pkg.snowpack.dev`

从哪里导入软件包的远程起源。当你导入一个新的包时，Snowpack将从这个URL中获取这些资源。

目前，原点必须实现一个特定的响应格式，以便Snowpack能够为ESM解析。在Snowpack的未来版本中，我们计划增加对自定义CDN和导入源的支持。

#### packageOptions.cache

**类型**：`字符串`**默认**：`.snowpack`

你的项目缓存文件夹的位置，相对于项目根来说。Snowpack会将缓存数据保存在这个文件夹中。例如，如果`packageOptions.types`被设置为true，Snowpack将保存TypeScript类型到这个文件夹中的`类型`目录。

#### packageOptions.types

**类型**:`布尔值`**默认**:`false`

如果为true，Snowpack将为每个包下载TypeScript类型。

## buildOptions

**类型**:`对象`(选项名称: 值)

配置你的最终构建。

### buildOptions.out

**类型**：`字符串`**默认**：`"build"`

我们将你的最终构建输出到的本地目录。

### buildOptions.baseUrl

**类型**:`字符串`**默认值**:`/`

在你的HTML中，用这个替换所有`%PUBLIC_URL%`的实例

灵感来自于同样的[Create React App](https://create-react-app.dev/docs/using-the-public-folder/)概念。如果你的应用将被部署到一个子目录下，这很有用。

### buildOptions.clean

**类型**:`布尔值`**默认**:`true`

设置为`false`，以防止Snowpack在两次构建之间删除构建输出文件夹`（buildOptions.out`）。

### buildOptions.cacheDirPath

**类型**：`字符串`  
**默认**：`./node_modules/.cache/snowpack`

指定缓存目录，捆绑的Node模块将被缓存在其中。

### buildOptions.webModulesUrl

_注意：_已被弃用，见`buildOptions.metaUrlPath`。

### buildOptions.metaDir

_注意：_已废弃，请参见`buildOptions.metaUrlPath`。

### buildOptions.metaUrlPath

**类型**：`字符串`**默认**。`_snowpack`

重命名Snowpack元数据的默认目录。在每次构建中，Snowpack都会创建元文件，用于加载[HMR](/concepts/hot-module-replacement)、[环境变量](/reference/environment-variables)和你构建的npm包等东西。

当你构建你的项目时，这将是磁盘上相对于`buildOptions.out`目录的一个路径。

### buildOptions.sourcemap

**类型**：`布尔值`**默认**：`false`

生成源码图。

**_实验性：_**仍在进行中，在这项支持最终完成之前，你在使用源码图时可能会遇到一些问题。

### buildOptions.watch

**类型**：`布尔值`**默认**：`false`

通过一个文件观察器运行Snowpack的构建管道。当你有一个自定义的前端服务器（例如：Rails、PHP等）而不能使用Snowpack开发服务器时，这个选项对本地开发最有效。

### buildOptions.htmlFragments

**类型**：`布尔型`**默认**：`假`

切换HTML片段是否像完整的HTML页面一样被转化。

HTML片段是指不以`<！doctype html>`开头的HTML文件。

### buildOptions.jsxFactory

**类型**：`字符串`**默认**。`React.createElement`(如果检测到Preact导入，则为`h`)

设置用于创建 JSX 元素的函数的名称。

### buildOptions.jsxFragment

**类型**：`字符串`**默认**。`React.Fragment`(如果检测到Preact导入，则为`Fragment`)

设置用于创建JSX片段的函数的名称。

### buildOptions.jsxInject

**类型**：`字符串`**默认**：`未定义`

如果设置，这个字符串可以用来为每个JJSX/TSX文件自动注入JJSX导入。 React用户可以使用`从'react'导入React`，而Preact用户可以使用`从'preact'导入{ h, Fragment }`。

## TestOptions

配置你的测试。

### testOptions.files

**类型**：`字符串[]`**默认**。`["__tests__/**/*", "**/*.@(spec|test).*"]`

指定你的测试文件。如果`NODE_ENV`被设置为 "test"，Snowpack就会在你的网站构建中包括这些文件，并扫描它们的可安装依赖性。否则，Snowpack排除这些文件。

## 实验

**类型**:`对象`(选项名称: 值)

这一部分目前是空的!在未来，这部分可能会被用于实验性的和尚未最终确定的。
