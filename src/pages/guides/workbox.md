---
layout: ../../layouts/content.astro
title: Workbox
tags: communityGuide
description: The Workbox CLI integrates well with Snowpack.
---

<div class="stub">
这篇文章是一个存根，你可以帮助把它扩展成<a href="https://diataxis.fr/how-to-guides/">指南的格式</a>
</div>

[Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli)与Snowpack整合得很好。运行向导来引导你的第一个配置文件，然后运行`workbox generateSW`来生成你的服务工作者。

请记住，Workbox 希望在你每次部署时都能运行，作为生产构建过程的一部分。如果你还没有，请创建package.json[`"部署 "`和/或`"构建 "`](https://michael-kuehnel.de/tooling/2018/03/22/helpers-and-tips-for-npm-run-scripts.html)脚本，使你的生产构建过程自动化。
