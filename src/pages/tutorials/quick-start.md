---
layout: ../../layouts/content.astro
title: 快速上手
description: A very basic guide for developers who want to run Snowpack as quickly as possible.
---

### 安装Snowpack

```bash
# npm:
npm install --save-dev snowpack
# yarn:
yarn add --dev snowpack
# pnpm:
pnpm add --save-dev snowpack
```

### 运行Snowpack CLI

```bash
npx snowpack [command]
yarn run snowpack [command]
pnpm run snowpack [command]
```

在我们的整个文档中，我们将使用`snowpack [command]`来记录CLI。要运行你本地安装的Snowpack版本，请添加你用来安装Snowpack的软件包管理器的`npx`/`yarn run``/pnpm run`前缀。

对于长期开发来说，使用Snowpack的最佳方式是使用package.json脚本。这可以减少你自己对记住确切的Snowpack命令/配置的需要，并让你与你的团队其他成员分享一些共同的脚本（如果适用）。

```js
// Recommended: package.json scripts
// npm run start (or: "yarn run ...", "pnpm run ...")
"scripts": {
    "start": "snowpack dev",
    "build": "snowpack build"
}
```

### 为你的项目提供本地服务

    snowpack dev

这将启动用于开发的本地开发服务器。默认情况下，这将向浏览器提供你当前的工作目录，并将寻找一个`index.html`文件来启动。你可以通过["mount "](/reference/configuration)配置自定义你想要服务的目录。

### 构建你的项目

    snowpack build

这将把你的项目构建成一个静态`的构建/`目录，你可以在任何地方部署。你可以通过[配置](/reference/configuration)来定制你的构建。

### 查看所有命令和选项

    snowpack --help

`--help`标志将显示有用的输出。
