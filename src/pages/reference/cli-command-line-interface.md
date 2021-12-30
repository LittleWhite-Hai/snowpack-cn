---
layout: ../../layouts/content.astro
title: 命令行 API
description: The Snowpack Command Line tool's API, commands, and flags.
---

### 命令

    $ snowpack --help

    snowpack init         Create a new project config file.
    snowpack dev          Develop your app locally.
    snowpack build        Build your app for production.

    ...

### options

```bash
# Show helpful info
$ snowpack --help

# Show additional debugging logs
$ snowpack --verbose

# {devOptions: {open: 'none'}}
$ snowpack dev --open none

# {buildOptions: {clean: true/false}}
$ snowpack build --clean
$ snowpack build --no-clean
```

**CLI options 项将与你的配置文件值一起生效(CLI options 优先)**。下面列出的每一个配置值都可以作为 CLI 的 option 传递。此外，Snowpack 还支持以下 option。

- `--config [path]` 设置项目配置文件的路径。
- `--help` 显示帮助。
- `--version` 显示当前版本。
- `--reload` 清除本地缓存。对于清理安装依赖的问题很有用。
