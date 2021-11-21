---
layout: ../../layouts/content.astro
title: SSL 证书
description: How to use HTTPs during development and generate SSL certifcates for your Snowpack build.
---

<div class="notification">
本指南有一个实例 repo。
<a href="https://github.com/snowpackjs/snowpack/tree/main/examples/https-ssl-certificates/">
    examples/https-ssl-certificates
</a>
</div>

    npm start -- --secure

Snowpack提供了一个简单的方法，通过使用`-secure`标志在开发过程中使用本地HTTPS服务器。当启用时，Snowpack将在根目录下寻找`snowpack.key`和`snowpack.crt`文件，并使用它来创建一个支持HTTP2的HTTPS服务器。另外，你可以通过将TLS证书和私钥文件直接传递给`devOptions.secure`来定制它们。

```js
const fs = require('fs');

const cert = fs.readFileSync('/path/to/server.crt');
const key = fs.readFileSync('/path/to/server.key');

module.exports = {
  devOptions: {
    secure: {cert, key},
  },
};
```

### 生成SSL证书

你可以通过以下两种方式为你的项目自动生成证书。

- [devcert（不需要安装，但openssl是先决条件）](https://github.com/davewasmer/devcert-cli)：`npx devcert-cli generate localhost`
- [mkcert（需要安装）](https://github.com/FiloSottile/mkcert)：`mkcert -install && mkcert -key-file snowpack.key -cert-file snowpack.crt localhost`

在大多数情况下，你应该将个人生成的证书文件`（snowpack.key`和`snowpack.crt`）添加到你的`.gitignore`文件中。