---
layout: ../../layouts/content.astro
title: 快速上手
description: A very basic guide for developers who want to run Snowpack as quickly as possible.
---

### 安装 Snowpack

```bash
# npm:
npm install --save-dev snowpack
# yarn:
yarn add --dev snowpack
# pnpm:
pnpm add --save-dev snowpack
```

### 运行 Snowpack CLI

```bash
npx snowpack [command]
yarn run snowpack [command]
pnpm run snowpack [command]
```

在我们的整个文档中，我们将在命令行中使用`snowpack [command]`。如果你想运行本地安装的特定 Snowpack 版本，请添加你用来安装 Snowpack 的软件包管理器`npx/yarn run/pnpm run`前缀。

对于长期开发来说，使用 Snowpack 的最佳方式是配合 package.json 脚本。这可以让你少记很多确切的 Snowpack 命令/配置，并让你与团队共享一些常用的脚本。

```js
// Recommended: package.json scripts
// npm run start (or: "yarn run ...", "pnpm run ...")
"scripts": {
    "start": "snowpack dev",
    "build": "snowpack build"
}
```

### 本地启动项目

    snowpack dev

这将启动用于开发的本地服务。默认情况下会向浏览器提供当前的工作目录，并将寻找一个`index.html`文件来启动。你可以通过["mount "](/reference/configuration)配置提供服务的目录。

### 构建项目

    snowpack build

这将把项目构建成一个静态的`build/`目录，你可以在任何地方部署。你可以通过[configuration](/reference/configuration)来定制构建。

### 查看所有命令和选项

    snowpack --help

`--help`标志将显示有用的输出。
