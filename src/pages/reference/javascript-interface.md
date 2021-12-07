---
layout: ../../layouts/content.astro
title: JavaScript API
description: Snowpack's JavaScript API is for anyone who wants to integrate with some custom build pipeline or server-side rendering engine.
---

大多数用户将通过[命令行](/reference/cli-command-line-interface)界面（CLI）与Snowpack互动。然而，Snowpack也提供了一个JavaScript API，供任何人在此基础上构建。

本页包含了关于Snowpack的公共API和所有相关数据类型的参考信息。在项目中定义的所有数据类型（公共和私有）的完整集合可以在包的[`types.d.ts`](https://unpkg.com/browse/snowpack@3.0.10/lib/types.d.ts) 文件中找到。

### createConfiguration()

`createConfiguration(config?: SnowpackUserConfig) => SnowpackConfig`

```js
import {createConfiguration} from 'snowpack';
const config = createConfiguration({...});
```

几乎所有你用Snowpack做的事情都需要一个配置对象。Snowpack被设计成可以在零配置的情况下运行，这个函数接受的`config`参数可以是完整的、空的，或者只包含几个属性。配置对象的其余部分将被填入Snowpack通常的一组默认值，在我们的[snowpack.config.mjs文档](/reference/configuration)中有介绍。

最简单的方法是，`SnowpackUserConfig`是外部记录的配置格式，而`SnowpackConfig`是我们的内部表示，所有可选/未定义的值都是用实际的默认值填充的。

### loadConfiguration()

`loadConfiguration(overrides?: SnowpackUserConfig, configPath?: string | undefined) => Promise.`

```js
import {loadConfiguration} from 'snowpack';
const config = await loadConfiguration({...}, '/path/to/snowpack.config.mjs');
```

类似于`createConfiguration`，但这个函数实际上将检查文件系统，从磁盘上加载一个配置文件。

该配置文件中的所有路径都是相对于文件本身的。

### startServer()

`startServer({config: SnowpackUserConfig}) => Promise.`

```js
import {startServer} from 'snowpack';
const config = createConfiguration({...});
const server = await startServer({config}); // returns: SnowpackDevServer
```

启动一个新的Snowpack开发服务器实例。这相当于在命令行上运行`snowpack dev`。

一旦启动，你可以从开发服务器上加载文件，Snowpack将按照要求构建它们。这是一个需要理解的重要功能。Snowpack的开发服务器在启动时不做任何文件构建，而是在通过服务器的`loadUrl`方法请求时才构建文件。

### Snowpack开发服务器(SnowpackDevServer)

#### SnowpackDevServer.port

服务器监听的端口。

#### SnowpackDevServer.loadUrl()

`loadUrl(reqUrl: string, opt?:{isSSR? : boolean; allowStale? : boolean; encoding? : string}）。)Promise>。`

```ts
const server = await startServer({config});
const {contents} = server.loadUrl('/dist/index.js', {...});
```

加载一个文件并返回结果。在第一次请求一个URL的时候，这将启动一个构建，然后在服务器的生命周期内为所有未来的请求进行缓存。

你可以通过`allowStale: true`来启用Snowpack的冷缓存，以获得过去会话的缓存结果。然而，Snowpack对冷缓存数据是否是最新的不提供任何保证。

#### SnowpackDevServer.getUrlForFile()

`getUrlForFile(fileLoc: string) => string | null;`

```ts
const server = await startServer({config});
const fileUrl = server.getUrlForFile('/path/to/index.jsx');
const {contents} = server.loadUrl(fileUrl, {...});
```

一个辅助函数，用于查找任何源文件的最终托管URL。与`loadUrl`结合使用时非常有用，因为你可能只知道一个文件在磁盘上的位置而不知道它的最终托管URL。

#### SnowpackDevServer.getUrlForPackage()

`getUrlForPackage(packageSpec: string) => Promise[string]。`

```ts
const server = await startServer({config});
const pkgUrl = await server.getUrlForPackage('preact');
```

一个用于查找任何依赖关系的最终托管URL的辅助函数。

#### SnowpackDevServer.sendResponseError()

`sendResponseError(req: http.IncomingMessage, res: http.ServerResponse, status: number) => void;`

一个辅助函数，用于在服务器响应处理程序中发送一个错误响应。在将Snowpack与Express、Koa或任何其他Node.js服务器集成时非常有用。

#### SnowpackDevServer.onFileChange()

`onFileChange({filePath: string}) => void;`

监听文件的变化事件。在你可能想自己观察文件系统变化的情况下很有用，并且可以通过挂载我们已经运行的观察器来节省开销/性能。

#### SnowpackDevServer.shutdown()

`shutdown() => Promise;`

```ts
const server = await startServer({config});
await server.shutdown();
```

关闭Snowpack开发服务器。清理任何长期运行的命令、文件观察器等。

#### SnowpackDevServer.getServerRuntime()

`getServerRuntime({invalidateOnChange?: boolean}) => ServerRuntime;`

```ts
const server = await startServer({config});
const runtime = server.getServerRuntime();
const {helloWorld} = (await runtime.importModule('/dist/index.js')).exports;
helloWorld();
```

返回一个ESM服务器运行时间，让Node.js直接从Snowpack的构建缓存中导入模块。这对SSR、测试运行前端代码以及构建管道的整体统一很有用。

欲了解更多信息，请查看我们关于使用`getServerRuntime()`API的[服务器端渲染](/guides/server-side-render)的指南。

#### 服务器运行时间（ServerRuntime）

```ts
interface ServerRuntime {
  /** Import a Snowpack-build JavaScript file into Node.js. */
  importModule(url: string) => Promise<ServerRuntimeModule>;
  /** Invalidate a module in the internal runtime cache. */
  invalidateModule(url: string) => void;
}
```

#### 服务器运行时模块（ServerRuntimeModule）

```ts
interface ServerRuntimeModule {
  /** The imported module. */
  exports: any;
  /** References to all internal CSS imports. Useful for CSS extraction. */
  css: string[];
}
```

### build()

`build({config: SnowpackUserConfig}) => Promise[SnowpackBuildResult`

```js
import {build} from 'snowpack';
const config = createConfiguration({...});
const {result} = await build({config}); // returns: SnowpackBuildResult
```

#### SnowpackBuildResult.result

一个所有构建输入和输出文件的内存清单。

#### SnowpackBuildResult.shutdown

在`-watch`模式下，`build()`函数将被解析，但构建本身将继续。使用此函数来关闭构建观察器。

在正常的构建模式下（非观察模式），该函数将抛出一个警告。

#### SnowpackBuildResult.onFileChange

在`-watch`模式下，`build()`函数将被解析，但构建本身将继续。使用这个函数来响应文件变化事件，而不需要启动你自己的文件观察程序。

在正常的构建模式下（非监视模式），该函数将抛出一个警告。

### getUrlForFile()

`getUrlForFile(fileLoc: string, config: SnowpackConfig) => string | null`

```js
import {getUrlForFile} from 'snowpack';
const fileUrl = getUrlForFile('/path/to/file.js', config);
```

一个辅助函数，用于查找任何源文件的最终托管URL。与`loadUrl`结合使用时非常有用，因为你可能只知道一个文件在磁盘上的位置而不知道它的最终托管URL。

类似于`SnowpackDevServer.getUrlForFile()`，但需要第二个`config`参数来告知结果。

### clearCache()

`clearCache() => Promise[void].`

```js
import {clearCache} from 'snowpack';
await clearCache();
```

相当于使用`snowpack`CLI的`--reload`标志。清除Snowpack中的所有缓存数据。对于故障排除很有用，或者在做了一些Snowpack无法检测到的改变之后，清除缓存。

### 记录器

```js
import {logger} from 'snowpack';
```

你可以通过导入Snowpack的内部日志器来直接控制它。请注意，这是一个高级功能，对于大多数用户来说并不需要。相反，使用`verbose`配置选项来启用调试日志和控制日志信息的冗长性。
