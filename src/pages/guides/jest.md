---
layout: ../../layouts/content.astro
title: 'Jest'
tags: communityGuide
img: '/img/logos/jest.svg'
imgBackground: '#d14c53'
published: true
description: How to use Jest, a popular test runner, with Snowpack.
---

[Jest](https://jestjs.io/)是一个流行的Node.js测试运行器，用于Node.js和Web项目。Jest可以用于任何前端项目，只要你配置Jest应该如何构建你的前端文件以在Node.js上运行。许多项目会尝试为你管理这个配置，因为它可能会变得很复杂。

Snowpack为几个流行的框架提供了预建的Jest配置文件。如果你因为任何原因需要使用Jest，可以考虑扩展这些包中的一个。

- React。[@snowpack/app-scripts-react](https://www.npmjs.com/package/@snowpack/app-scripts-react)
- Preact:[@snowpack/app-scripts-preact](https://www.npmjs.com/package/@snowpack/app-scripts-preact)
- Svelte:[@snowpack/app-scripts-svelte](https://www.npmjs.com/package/@snowpack/app-scripts-svelte)

注意：你需要在你项目的根目录下有一个`jest.setup.js`文件。

### 例子

```js
// jest.config.js
// Example: extending a pre-built Jest configuration file
module.exports = {
  ...require('@snowpack/app-scripts-preact/jest.config.js')(),
};
```
