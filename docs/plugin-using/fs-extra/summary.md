---
aside: true
---

## Node.js:fs-extra

`fs-extra` 添加了原生`fs`不支持的更为便捷的文件系统方法，并为`fs`方法添加了异步支持。它还使用了[graceful-fs](https://github.com/isaacs/node-graceful-fs)来防止`EMFILE`错误，它也是`fs`的替代品。

::: details 什么是EMFILE
"EMFILE" 是一个常见的 Node.js 错误，通常是因为打开的文件描述符数量已经超过操作系统所允许的限制而导致的。文件描述符是计算机操作系统中用于访问文件或其他输入/输出资源的唯一标识符。
:::

## Why?

我厌倦了在我的大多数项目中包括`mkdirp`、`rimraf`和`ncp`这种繁琐操作。

## Installation

```shell
npm install fs-extra
```

## Usage

### CommonJS <Badge type="danger" text="obsolete" />

`fs-extra`是原生`fs`的替代品，`fs`中所有方法都附加到了`fs-extra`中。在`fs`原生异步函数上，如果没有传入callback参数那么将通过promise来返回信息。

你再也不需要导入原来的`fs`模块。

```js
const fs = require("fs"); // this is no longer necessary
```

你现在可以这样做：

```js
const fs = require("fs-extra");
```

或者，如果你想明确你使用的是fs-extra而不是fs，你可能想把你的fs变量命名为fse，像这样:

```js
const fse = require("fs-extra");
```

你也可以保留两者，但这是多余的：

```js
const fs = require("fs");
const fse = require("fs-extra");
```

### ESM <Badge type="tip" text="recommend" />

还有一个`fs-extra/esm`导入，它既支持默认全部导入，也支持摇树优化解构导入。然而，需要注意`fs`的方法并没有包含在`fs-extra/esm`中；你仍然需要分别导入`fs`或`fs/promises`亦或者两者一起导入。下面是使用摇树进行导入：

```js
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { outputFile, outputFileSync } from "fs-extra/esm";
```

默认导入如下：

```js
import fs from "fs";
import fse from "fs-extra/esm";
// fse.readFileSync is not a function; must use fs.readFileSync
```

但是就默认导入而言，你可能只是想直接使用`fs-extra`来替代`fs-extra/esm`：

```js
import fs from "fs-extra";
// both fs and fs-extra methods are defined
```

## Sync vs Async vs Async/Await

1. 默认情况下大部分方法都是异步的。如果没有传入callback回调函数，所有异步方法都将返回一个promise。
2. 另一方面，在同步函数上如果发生错误，将被throw。
3. 此外，使用Async/Await如果发生错误也将被抛出throw。

案例：

```js
const fs = require("fs-extra");

// Async with promises:
fs.copy("/tmp/myfile", "/tmp/mynewfile")
  .then(() => console.log("success!"))
  .catch((err) => console.error(err));

// Async with callbacks:
fs.copy("/tmp/myfile", "/tmp/mynewfile", (err) => {
  if (err) return console.error(err);
  console.log("success!");
});

// Sync:
try {
  fs.copySync("/tmp/myfile", "/tmp/mynewfile");
  console.log("success!");
} catch (err) {
  console.error(err);
}

// Async/Await:
async function copyFiles() {
  try {
    await fs.copy("/tmp/myfile", "/tmp/mynewfile");
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

copyFiles();
```

## Methods

### Async

- [copy](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)
- [emptyDir](https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir.md)
- [ensureFile](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureFile.md)
- [ensureDir](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md)
- [ensureLink](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureLink.md)
- [ensureSymlink](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureSymlink.md)
- [mkdirp](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md)
- [mkdirs](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md)
- [move](https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md)
- [outputFile](https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md)
- [outputJson](https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputJson.md)
- [pathExists](https://github.com/jprichardson/node-fs-extra/blob/master/docs/pathExists.md)
- [readJson](https://github.com/jprichardson/node-fs-extra/blob/master/docs/readJson.md)
- [remove](https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove.md)
- [writeJson](https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md)

### Sync

- [copySync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md)
- [emptyDirSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir-sync.md)
- [ensureFileSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureFile-sync.md)
- [ensureDirSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md)
- [ensureLinkSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureLink-sync.md)
- [ensureSymlinkSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureSymlink-sync.md)
- [mkdirpSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md)
- [mkdirsSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md)
- [moveSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/move-sync.md)
- [outputFileSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile-sync.md)
- [outputJsonSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputJson-sync.md)
- [pathExistsSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/pathExists-sync.md)
- [readJsonSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/readJson-sync.md)
- [removeSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove-sync.md)
- [writeJsonSync](https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson-sync.md)

注意：你仍然可以使用原生Node.js方法。可以肯定那些方法已经拷贝到`fs-extra`中。<br/>
[notes on fs.read(), fs.write(), & fs.writev()](https://github.com/jprichardson/node-fs-extra/blob/master/https://github.com/jprichardson/node-fs-extra/blob/master/docs/fs-read-write-writev.md)

### What happened to `walk` and `walkSync` ?

[klaw]: https://github.com/jprichardson/node-klaw
[klaw-sync]: https://github.com/manidlou/node-klaw-sync

他们在`fs-extra` v2.0.0被移除。如果你需要这个功能，`walk`和`walkSync`作为单独的软件包提供，请看[klaw]和[klaw-sync]

## Third Party

### CLI

[fse-cli]: https://www.npmjs.com/package/@atao60/fse-cli
[npm]: https://www.npmjs.com/

[fse-cli]允许你从console控制台或[npm]脚本中运行`fs-extra`。

### TypeScript

如果你喜欢用TypeScript，你也可以在TS项目中使用`fs-extra`<br/>
[https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fs-extra](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fs-extra)

### File /Directory Watching

[chokidar]: https://github.com/paulmillr/chokidar

如果你想监视文件或目录的更改，那么你应该使用[chokidar]

### Obtain Filesystem (Devices, Partitions) Information

[fs-filesystem]: https://github.com/arthurintelligence/node-fs-filesystem

[fs-filesystem]允许你读取主机上运行文件系统的状态。它返回关于设备和系统分区（卷）的信息。

### Misc.

[fs-extra-debug]: https://github.com/jdxcode/fs-extra-debug
[debug]: https://npmjs.org/package/debug
[mfs]: https://github.com/cadorn/mfs

- [fs-extra-debug] - 使用[debug]监控`fs-extra`调用耗时并打印到控制台。
- [mfs] - 监视对node-fs-extra的调用以进行调试。

## Naming

我在这些函数的命名上花了很多心思。受@coolaj86的请求启发。因此，他提出这个问题的功劳很大。

[Node.js naming schemes]: http://nodejs.org/api/fs.html

首先，我认为在尽可能多的情况下，应该选择[Node.js naming schemes]。然而，Node.js自己的命名方案存在一些问题。

例如，`fs.readFile()`和`fs.readdir()`: File中F大写，dir中d不大写。也许有点迂腐，但它们应该是一致的。此外，Node.js选择了很多POSIX命名方案，我认为这很好。参见:`fs.mkdir()`， `fs.rmdir()`， `fs.chown()`等。

但是我们有一个两难的问题。如何一致地命名执行以下POSIX命令的方法:`cp`、`cp -r`、`mkdir -p`和`rm -rf`?

我的观点是:当有疑问时，宁可简单。目录只是目录和文件的分层分组。考虑一下这个问题。所以当你想要复制或删除它时，在大多数情况下你会想要复制或删除它的所有内容。当您想要创建一个目录时，如果假定包含该目录的目录不存在，那么在大多数情况下，您也会希望创建该目录。

因此，如果您想删除一个文件或目录，而不管它是否有内容，只需调用`fs.remove(path)`。如果您想复制一个文件或目录，无论它是否有内容，只需调用`fs.copy(source, destination)`。如果您想创建一个目录，而不管它的父目录是否存在，只需调用`fs.mkdirs(path)`或`fs.mkdirp(path)`。

## License

[JP Richardson]: https://github.com/jprichardson

Licensed under MIT

Copyright (c) 2011-2017 [JP Richardson]
