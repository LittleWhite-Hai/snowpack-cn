---
layout: ../../layouts/content.astro
title: 测试
published: true
description: How to choose and use a JavaScript test runner for your Snowpack site.
---

Snowpack支持所有你已经熟悉的流行JavaScript测试框架。Mocha、Jest、Jasmine、AVA和Cypress在Snowpack应用程序中都得到了支持，如果能正确集成的话。

**我们目前推荐[@web/test-runner](https://www.npmjs.com/package/@web/test-runner)**（WTR）用于Snowpack项目的测试。在进行基准测试时，它比Jest（我们之前的推荐）表现得更快，同时还提供了一个与生产更接近的测试环境。最重要的是，WTR运行你已经为你的项目配置的相同的Snowpack构建管道，所以不需要第二次构建配置来运行你的测试。这提高了测试的信心，同时消除了项目中100多个额外的构建依赖。

### 测试指南

- [@web/test-runner](/guides/web-test-runner)(推荐)
- [jest](/guides/jest)
