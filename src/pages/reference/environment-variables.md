---
layout: ../../layouts/content.astro
title: 环境变量
description: Snowpack环境变量配置
---

为了您的安全，Snowpack只支持以`SNOWPACK_PUBLIC_*`开头的环境变量。我们这样做是因为Web应用中的所有内容都会被发送到浏览器上，我们不希望你不小心将敏感的密钥/环境变量分享给公共Web应用程序。用`SNOWPACK_PUBLIC_`作为你的前端Web环境变量的前缀有很好的语义，它们将被分享给全世界。

## 设置环境变量

你可以通过三种不同的方式用snowpack设置环境变量。

### Option 1：CLI

当你运行snowpack CLI时设置环境变量。

```bash
SNOWPACK_PUBLIC_API_URL=api.google.com snowpack dev
```

### Option 2: 配置文件

**v3.1.0中的新内容**将环境变量作为一个对象传递给`env`属性。注意，这些环境变量不需要使用`SNOWPACK_PUBLIC_`前缀，在这里设置的任何东西都可以在`import.meta.env`（见下文）上使用。

```js
// snowpack.config.mjs
export default {
  env: {
    API_URL: 'api.google.com',
  },
};
```

**在以前的版本中**，我们建议通过在你的`snowpack.config.mjs`文件的顶部加入`process.env.`\*来设置环境变量。这最终会造成混乱，所以现在推荐使用`env`属性。

```js
// snowpack.config.mjs
process.env.SNOWPACK_PUBLIC_API_URL = 'api.google.com';
// ...rest of config
```

### Option 3：插件

使用一个插件，如[plugin-dotenv](https://www.npmjs.com/package/@snowpack/plugin-dotenv)，从`.env`文件中加载环境变量。

## 读取环境变量

你可以通过`import.meta.en`直接在web应用中读取环境变量。如果你曾经在Create React App或任何Webpack应用程序中使用过`process.env`，其行为是完全一样的。

```js
// `import.meta.env` - Read process.env variables in your web app
fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/users`).then(...)

// Supports destructuring as well:
const {SNOWPACK_PUBLIC_API_URL} = import.meta.env;
fetch(`${SNOWPACK_PUBLIC_API_URL}/users`).then(...)

// Instead of `import.meta.env.NODE_ENV` use `import.meta.env.MODE`
if (import.meta.env.MODE === 'development') {
  // ...
```

`import.meta.env.MODE`和`import.meta.env.NODE_ENV`也都被设置为当前`process.env.NODE_ENV`值，这样你就可以根据开发和构建来改变应用行为。在`snowpack dev`期间，env值被设置为`开发`，而在`snowpack build`期间被设置为`production`。在你的应用中使用这个值而不是`process.env.NODE_ENV`。

你也可以在HTML文件中使用环境变量。所有出现的`%SNOWPACK_PUBLIC_*%`,`%PUBLIC_URL%`, 和`%MODE%`将在构建时被替换。

**Note：**这些环境变量是在**构建时**静态地注入到你的应用中的，而不是在运行时。
