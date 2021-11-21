---
layout: ../../layouts/content.astro
title: '@web/test-runner'
tags: communityGuide
img: '/img/logos/modern-web.svg'
imgBackground: '#f2f2f8'
description: How to use @web/test-runner in your Snowpack project.
---

[@web/test-runner](https://www.npmjs.com/package/@web/test-runner)是我们为Snowpack项目推荐的测试运行器。请阅读我们在[Snowpack测试指南](/guides/testing)中推荐@web/test-runner的更多信息。

## 设置

本指南展示了如何为一个React项目设置@web/test-runner和[@snowpack/web-test-runner-plugin](https://www.npmjs.com/package/@snowpack/web-test-runner-plugin)。最终的结果是在[app-template-react](https://github.com/snowpackjs/snowpack/blob/main/create-snowpack-app/app-template-react)中重现了测试配置，这是我们的Create Snowpack App启动模板之一。如果你使用的是不同的框架，请适当调整React的具体步骤。

#### 1.安装依赖项

基础测试依赖（先别按回车键！）。

    npm install --save-dev @web/test-runner @snowpack/web-test-runner-plugin chai

如果使用React、Vue、Svelte或Preact，添加相应的[测试库](https://testing-library.com/)（此处为`@testing-library/react`）。

如果使用TypeScript，添加`@types/mocha`和`@types/chai`。

#### 2.2.配置

在你的项目根部创建一个新的`web-test-runner.config.js`文件。

```js
process.env.NODE_ENV = 'test';

module.exports = {
  plugins: [require('@snowpack/web-test-runner-plugin')()],
};
```

⚠️不要在你的`snowpack.config.mjs`文件的插件中添加@snowpack/web-test-runner-plugin!它只需要在`web-test-runner.config.js`中出现。如果你需要指定测试选项，请使用[testOptions](https://www.snowpack.dev/reference/configuration#testoptions)。

#### 3.脚本

在你的项目`package.json`中添加一个`测试`脚本。

```diff
"scripts": {
  "start": "snowpack dev",
  "build": "snowpack build",
+  "test": "web-test-runner \\\"src/**/*.test.jsx\\\"",
  ...
},
```

如果需要，将`.jsx`与包含你的测试的文件类型交换。

要指定多个测试文件类型，用大括号括起来，用逗号分开。例如，为了匹配`.jsx`、`.js`和`.ts`文件，脚本应该是。

    "test": "web-test-runner \\\"src/**/*.test.{jsx,js,ts}\\\"",

> 💡 提示：`wtr`可以作为`web-test-runner`的简写。
