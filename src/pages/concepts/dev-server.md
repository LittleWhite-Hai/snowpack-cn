---
layout: ../../layouts/content.astro
title: 开发时服务
description: Snowpack,热更新,ESM,开发时服务
---

![dev command output example](/img/snowpack-dev-startup-2.png)

`snowpack dev`- Snowpack 的开发时服务是一个用于[免打包式开发](/concepts/how-snowpack-works)的即时开发环境。开发时服务只有在浏览器要求时才会构建文件。这意味着 Snowpack 可以即时启动（通常<50ms），并且可以扩展到无限大的项目而不减慢速度。相比之下，使用传统的打包工具构建大型应用程序时，通常会看到 30 多秒的开发启动时间。

Snowpack 默认支持 JSX 和 TypeScript 源代码。你可以通过[自定义插件](/plugins)进一步扩展你的构建功能，将 Snowpack 与你喜欢的构建工具连接起来。TypeScript、Babel、Vue、Svelte、PostCSS、Sass。。。尽情发挥吧!
