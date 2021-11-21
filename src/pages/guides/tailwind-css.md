---
layout: ../../layouts/content.astro
title: 'Tailwind CSS'
tags: communityGuide
published: true
img: '/img/logos/tailwind.svg'
imgBackground: '#f2f8f8'
description: How to use Tailwind CSS with Snowpack.
---

[Tailwind](https://tailwindcss.com)是一个流行的基于类的CSS工具库。在Snowpack中加载它是很容易的，只需要几个步骤就可以了

## 设置

Tailwind的\[JIT模式]\[tailwind-jit]是使用Tailwind的新推荐方式。要在一个Snowpack项目中设置这个模式，请做以下工作。

#### 1.安装依赖项

从你项目的根目录下，安装tailwindcss、PostCSS和Snowpack PostCSS插件。

    npm install --save-dev tailwindcss @snowpack/plugin-postcss postcss

#### 2.2.配置

你需要在你的项目根部创建两个文件：`postcss.config.js`和`tailwind.config.js`。

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    // other plugins can go here, such as autoprefixer
  },
};
```

```js
// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  // specify other options here
};
```

_注意：请确保为你的项目结构正确设置`purge:[]`正确设置你的项目结构_

另外，你需要将Snowpack PostCSS插件添加到你的Snowpack配置中，并设置\[Tailwind配置选项]\[config-tailwind]，如果你还没有的话。

```diff
  // snowpack.config.mjs
  export default {
    mount: {
      src: '/_dist',
      public: '/',
    },
+   devOptions: {
+     tailwindConfig: './tailwind.config.js',
+   },
+   plugins: [
+     '@snowpack/plugin-postcss',
+   ],
  };
```

#### 3.在你的CSS中导入Tailwind

从任何全局CSS文件中，添加你需要的\[Tailwind utilites]\[tailwind-utilities]（如果你没有一个全局CSS文件，我们建议在`/public/global.css`创建一个）。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

当你用Snowpack加载这些文件时，你应该看到这些文件被Tailwind的CSS所代替。

⚠️确保你在你的主HTML文件中导入这个文件，像这样。

```diff
  <head>
+   <link rel="stylesheet" type="text/css" href="/global.css" />
  </head>
```

## 更多阅读

- \[Tailwind官方文档]\[tailwind-postcss)
- \[PostCSS + Snowpack]\[snowpack-postcss)

[config-tailwind]: https://snowpack.dev/reference/configuration#devoptions.tailwindConfig

[snowpack-postcss]: /guides/postcss/

[tailwind-jit]: https://tailwindcss.com/docs/just-in-time-mode

[tailwind-postcss]: https://tailwindcss.com/docs/installation/#using-tailwind-with-postcss

[tailwind-utilities]: https://tailwindcss.com/docs/adding-new-utilities#using-css
