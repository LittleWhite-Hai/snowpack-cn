---
layout: ../../layouts/content.astro
title: 流式导入
published: true
stream: Fetch your npm dependencies on-demand from a remote ESM CDN.
---

Snowpack v3.0引入了一个名为 "**流式导入**"的新功能，在开发和构建期间按需获取导入的软件包。通过用Snowpack管理你的前端依赖，你可以把`npm`留给你的工具专用包，甚至可以完全放弃对`npm`/`yarn``/pnpm`的依赖。

## 启用流式导入

```js
// snowpack.config.mjs
export default {
  packageOptions: {
    source: 'remote',
  },
};
```

将`packageOptions.source`设置为 "remote "来启用流式导入。这告诉Snowpack从Skypack CDN获取你的导入，而不是在本地捆绑它们。阅读我们[关于`packageOptions`](/reference/configuration#packageoptions.source%3Dremote)的[完整文档](/reference/configuration#packageoptions.source%3Dremote)，了解更多关于定制这种行为的信息。

## 流式导入如何工作

当你启用流式导入并运行`snowpack dev` 时，本地服务器将开始从`https://pkg.snowpack.dev` 获取所有的导入。例如，在你的项目中`导入 "preact "`会变成在浏览器中`导入 "https://pkg.snowpack.dev/preact "`的样子。这告诉Snowpack（或浏览器）通过URL导入你的包，并且只在需要时获取包的ESM。Snowpack能够对响应进行缓存，以便将来离线使用。

翻译是由网络服务器完成的，所以你的源文件仍将包含裸露的`导入 "preact "`语句。当你运行`snowpack build`时，build文件夹中生成的文件将包含`import '.../_snowpack/pkg/preact.js';` 。

`pkg.snowpack.dev`是我们的ESM包CDN，由[Skypack](https://www.skypack.dev/)支持。每一个npm包都被托管为ESM，任何传统的非ESM包都在CDN本身上被向上转换为ESM。

> _**注意：**在某些罕见的情况下，从包中嵌套导入会导致Skypack上的资源引用无效。明确设置`packageOptions.origin`为`"https://cdn.skypack.dev"`（而不是使用默认的`pkg.snowpack.dev`shim）似乎可以解决这个问题。_

## 流式导入的好处

与传统的 "npm安装+本地捆绑 "方式相比，流式依赖有几个好处。

- **速度：**跳过安装+构建依赖关系的步骤，将你的依赖关系作为预构建的ESM代码直接从ESM CDN（如[Skypack](https://www.skypack.dev/)）加载。依赖项被缓存在本地，以便离线重用。
- **安全性**。ESM包是预先构建的，并且从未被赋予[在你的机器上运行代码](https://www.usenix.org/system/files/sec19-zimmermann.pdf)的权限。包只在浏览器沙盒中运行。
- **简单性**。ESM包由Snowpack管理，因此不需要Node.js的前端项目（Rails、PHP等）可以完全放弃`npm`CLI，如果他们选择。
- **对最终构建没有影响**。流式导入仍会被转译，并与最终构建的其他部分捆绑在一起，并根据你的精确导入进行树状摇动。最后的结果是，最终的构建与其他情况下的构建几乎是一样的。

## Snowpack管理的依赖关系

默认情况下，Snowpack会获取每个软件包的最新版本。如果没有办法按版本管理你的依赖关系，那么随着时间的推移，可能会出现破坏性的变化。

Snowpack在你的项目中使用`snowpack.deps.json`来管理你的依赖版本。如果你熟悉`npm install`，你的`snowpack.deps.j`son文件就像一个合并的`package.json`和`package-lock.json`。

有两个命令可以用来处理这个文件：`snowpack add`和`snowpack rm`。

第一次运行`snowpack add [package-name]`将在你的项目中创建一个新的`snowpack.deps.json`文件来存储关于你的新依赖关系的信息，比如所需的SemVer版本范围和lockfile信息。

## 使用TypeScript的流导入

```js
// snowpack.config.mjs /w TypeScript Support
export default {
  packageOptions: {
    source: 'remote',
    types: true,
  },
};
```

设置`types=true`告诉Snowpack在你的项目中安装TypeScript类型。Snowpack会将这些类型安装到你的项目中的本地`.snowpack/types`目录中，然后你可以在你的项目`tsconfig.json`中指向这个目录，以便为你的npm包获得自动类型。

```js
// Example: tsconfig.json /w Snowpack streaming imports
"baseUrl": "./",
"paths": {"*": [".snowpack/types/*"]},
```

当你启动你的项目时（使用`snowpack dev`或`snowpack build`），Snowpack将同步这个`.snowpack/types`目录并下载你可能需要的任何新类型。你也可以随时通过`snowpack prepare`手动触发一次同步。

## 在非JS包中使用流式导入（Svelte、Vue等）。

Skypack（支持`pkg.snowpack.dev` 的 CDN）总是喜欢软件包的 JavaScript 入口而不是任何源`.svelte`和`.vue`文件。这对大多数软件包（包括大多数Svelte和Vue软件包）都有效，但在一些项目中可能会造成麻烦。在未来的版本中，我们将添加更好的支持来本地构建这些类型的包。

## 如果一个软件包不被支持/不工作，我应该怎么做？

Skypack（支持`pkg.snowpack.dev` 的 CDN）一直在改进，其目标是支持所有软件包。如果你发现某个软件包无法使用，请向GitHub上的[Skypack问题追踪器](https://github.com/snowpackjs/skypack-cdn/issues)报告。许多Snowpack的核心贡献者也在Skypack上工作，他们会很乐意看一下这个坏掉的软件包。

在未来的版本中，我们将添加更好的支持，以便在本地替换损坏的软件包。
