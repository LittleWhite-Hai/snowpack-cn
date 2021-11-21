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

### 标志

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

**CLI标志将与你的配置文件值合并（并优先于）。下**面列出的每一个配置值都可以作为CLI标志传递。此外，Snowpack还支持以下标志。

- **`--config [path]`**设置你的项目配置文件的路径。
- **`--help`**显示这个帮助。
- **`--version`**显示当前的版本。
- **`--reload`**清除本地缓存。对于排除安装程序的问题很有用。
