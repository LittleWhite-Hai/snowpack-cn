---
layout: ../../layouts/content.astro
title: Snowpack 升级指南
published: true
description: How to upgrade to Snowpack v3 from older versions of Snowpack.
---

Snowpack v3.0于1月12日发布，有几个新功能和一些突破性的变化。本指南旨在帮助你从Snowpack v1或v2的旧版本升级一个项目。

## 从Snowpack v3候选版本升级

我们的v3.0候选版本来是一个接近最终版本的版本，但在当时和v3.0最终版本之间仍有一些重大变化。当使用任何过时的API时，Snowpack会发出警告，并指导你完成升级过程。

在未来，Snowpack候选版本将更接近于最终的API。

## 从Snowpack v2升级

Snowpack v3.0主要是围绕新功能而设计的，因此没有引入很多重大的突破性变化。然而，有一些变化是需要注意的。

- **配置名称的变化**。有一些遗留行为的清理和旧配置值的重命名。当第一次运行Snowpack v3.0时，Snowpack会警告你所有已知的名称变化，并提供说明以帮助你升级。
- **package.json "homepage" 不再设置 "baseUrl"**。这是Create React App的一个行为，我们最初试图匹配。然而，它在向用户解释时变得很混乱。在Snowpack v3.0中，直接设置 "buildOptions.baseUrl"。
- **改进了对配置中相对路径的支持。配**置文件中的所有相对路径现在都是相对于配置文件本身的。以前，所有相对的配置文件路径都是基于你运行Snowpack的当前工作目录来解决的，这意味着配置文件的行为会根据你运行它的位置而改变。你现在还可以设置项目的`"根"`/`--根目录`，如果你从一个与项目本身不同的目录中运行Snowpack（例如：在monorepos），这很有用。
- **更清晰的构建文件命名**。Snowpack v3.0引入了一些围绕构建文件名的清理工作，你在升级项目时可能会看到。最大的变化是像`.svelte`和`.vue`这样的文件，现在它们的JS和CSS分别构建为`.svelte.js`和`.svelte.css`。这一变化对大多数人来说应该是不明显的，但知道这一点是很好的。
- **更清晰地处理绝对导入URL。例**如，`导入"/dist/index.js"`，现在将导入任何建立在`/dist/index.js`的文件。在此之前，这种行为是未定义的。相对的URL仍然可以被用来导入相对于源文件本身的文件。

## 从Snowpack v1升级

Snowpack v1只支持以ESM的方式安装npm包，而且范围比现在的Snowpack更有限。如果你是从Snowpack v1.0来的，你也许可以直接使用我们的内部包安装程序库[esinstall](https://www.npmjs.com/package/esinstall)。`esinstall`是一个JavaScript库，实现了Snowpack v1.0通过命令行给你的大部分功能。

`snowpack build`将你的网站构建成网络原生JS、CSS和HTML文件。这种 "非捆绑式 "部署对于小型网站来说已经足够了，但许多开发者更愿意优化和捆绑他们的最终网站，以提高生产性能。

Snowpack可以在你的最终构建中运行各种优化，以处理传统的浏览器支持、代码最小化、代码拆分、树形晃动、死代码消除、预加载、捆绑等等。

Snowpack的构建优化有两种类型：**内置**（esbuild）和**插件**（webpack、rollup或其他你可能想运行的东西）。

### 选项1：内置优化

Snowpack最近发布了一个由[esbuild](https://esbuild.github.io/)支持的内置优化管道。使用这个内置的优化器，你现在可以比Webpack或Rollup快10倍到100倍地捆绑、转码和最小化你的生产构建。然而，esbuild还很年轻，还[没有为生产做好准备](https://esbuild.github.io/faq/#production-readiness)。目前，我们只推荐小型项目使用。

```js
// snowpack.config.mjs
// Example: Using Snowpack's built-in bundling support
export default {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
```

完整的支持界面是。

```ts
export interface OptimizeOptions {
  entrypoints: 'auto' | string[] | ((options: {files: string[]}) => string[]);
  preload: boolean;
  bundle: boolean;
  loader?: {[ext: string]: Loader};
  sourcemap: boolean | 'external' | 'inline' | 'both';
  splitting: boolean;
  treeshake: boolean;
  manifest: boolean;
  minify: boolean;
  target: 'es2020' | 'es2019' | 'es2018' | 'es2017';
}
```

### 选项2：优化插件

Snowpack通过插件支持流行的捆绑器。

- webpack（推荐！）。[@snowpack/plugin-webpack](https://www.npmjs.com/package/@snowpack/plugin-webpack)
- Rollup:[snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle)

**目前，我们建议使用@snowpack/plugin-webpack，直到我们的内置优化支持更加成熟**。

查看我们的[插件目录](/plugins)，浏览所有可用的Snowpack插件，如果你对创建自己的插件感兴趣，请阅读[插件指南](/guides/plugins)。
