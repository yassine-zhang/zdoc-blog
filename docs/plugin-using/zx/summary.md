# zx - 面向前端的Shell编程利器

### Shell 简介

Shell，或者说命令行，对于处理工作中遇到的重复性工作有极大的帮助。

说到 Shell，很多人都能想到 `ls / cat / grep / sort / sed / awk` 等各种常用命令，它们组合起来可以完成各种各样的任务。在这一点上，Shell是极棒的。

举例来说，要统计一个目录及其所有子目录中的文件数量，可以用

```shell
find . | wc -l
```

这样的命令组合来实现。

当问题更复杂的时候，单行的命令往往难以实现，需要加入一些循环控制，条件判断等，这时候就需要使用到 Shell 脚本编程了。

然而 Shell 脚本并不像单条命令那样酷，它里面有很多的难以记忆的语法，对新手来说极不友好。

基于这个问题，复杂的脚本很多都迁移到了一些更友好的编程语言之上，如前些年的 Perl，近些年的 Python / Ruby，大多数情况下，它们的定位是“胶水”，在核心的单行 Shell 命令之间，做一些逻辑判断和循环控制等处理。当然近些年随着 Python 的发展，也有越来越多的直接使用 Python 库而非 Shell 命令进行脚本编程的场景，这就是另一回事了。

## 前端的脚本编程

不同于运维、后端常用的 Shell、Python 脚本，前端更熟悉 Javascript / Typescript 这些，也有很多前端的工程化工具都是用 JS 写的。

但是 JS 的脚本使用起来有较长的成本，如果完全不使用 Shell 的话，就需要安装很多的依赖项和库，当任务的复杂度没到一定级别的时候，这样做反而不如 Shell 简单。

因此在处理一些相对简单，又比单条命令略复杂的任务场景时，Shell 编程依旧是一个不错的选择。有没有办法用 JS 作为胶水语言呢？Google 给出了一个比较酷的方案：[zx](https://github.com/google/zx)。

### ZX 示例

先看一个使用 [zx](https://github.com/google/zx) 的例子：

```js
#!/usr/bin/env zx

await $`cat package.json | grep name`;

let branch = await $`git branch --show-current`;
await $`dep deploy --branch=${branch}`;

await Promise.all([$`sleep 1; echo 1`, $`sleep 2; echo 2`, $`sleep 3; echo 3`]);

let name = "foo bar";
await $`mkdir /tmp/${name}`;
```

很容易可以看到上面的 `let / await / Promise` 等都是 JS 编程中的关键字、全局变量等，而 `cat package.json | grep name` 等则是 Shell 命令。

这样 zx 的用途就比较好理解了，它是一个使用 JS 语法编程，支持使用 `$` 作为函数，调用 Shell 命令的脚本工具。

同时在这个示例中我们还可以看到，它直接在脚本最顶层使用了 `await` 关键字，这是`Node.js` `14.x` 版本中才支持的， `zx` 的文档中有要求需要安装 `Node.js` 的 `14.13.1` 以上的版本。

如果不熟悉 Shell 编程的同学，可能对如何运行上面的脚本有些疑问，它有两种用法，和其它的脚本语言没有区别：

```bash
# 先保存上面的脚本内容到 test.mjs 或任意其它的文件中（后缀名随意）
# 使用之前，需要安装 zx 全局包：
npm i -g zx

# 第一种方式，使用解释器 + 文件名的方式
zx test.mjs

# 第二种方式，给文件加可执行权限，然后直接执行
chmod a+x test.mjs  # 加权限 （仅类 Unix 系统，如 Linux / MacOS 等）
./test.mjs   # 执行

# 第二种方式需要在文件头部有 #!/usr/bin/env zx 这一行(shbang)，第一种方式不需要
```

### 内置函数

zx 提供的不仅仅是一个 `$` 函数，它还提供了一些其它在脚本编程中常用的工具函数。

- `cd()` 切换当前目录
- `fetch()` 内置的 [node-fetch](https://www.npmjs.com/package/node-fetch) 包，用于网络请求
- `question()` 内置的 [readline](https://nodejs.org/api/readline.html) 包，用于读取用户输入，询问用户选项等
- `sleep()` 使用 setTimeout 实现的一个等待函数
- `nothrow()` 捕捉 `$` 执行命令时遇到的非0返回值，使其不抛异常。一般来说，Shell 编程中 Exit Code不为0代表有异常

### 内置的全局变量

zx 还内置了一些 package 的引用，并做了成全局变量。

- `chalk` 即 [chalk](https://www.npmjs.com/package/chalk) 包，用于输出彩色的内容。
- `fs` 引用的 [fs-extra](https://www.npmjs.com/package/fs-extra) 包，用于完成常见的文件操作。
- `globby` 引用的 [globby](https://github.com/sindresorhus/globby) 包，用于模糊搜索文件名。
- `os` 引用的 [os](https://nodejs.org/api/os.html) 包，用于获取系统信息。
- `path` 引用的 [path](https://nodejs.org/api/path.html) 包，用于对路径做处理。
- `minimist` 引用的 [minimist](https://www.npmjs.com/package/minimist) 包，用于处理命令行参数。

### 比较酷的功能

zx提供了一些看起来比较酷的功能，如它可以直接执行远程脚本。

```bash
zx https://myhost.com/myscript
```

还可以把脚本放在 Markdown中

````markdown
## 非常酷的脚本

这是一个 JS 代码块，它里面的内容会被执行

```js
let myvar = 1;
console.log("hello js");
```

这是一个 Shell 代码块，它里面的内容也会被执行

```shell
echo hello shell
```

其它的编程语言的代码块，会被忽略掉。

同一语言不同的代码块之间，变量是不隔离的，可以继续使用之前定义的变量

```js
console.log(myvar);
```
````

还有一些的配置选项及FAQ，此处不再赘述，需要的同学可以直接访问 [Github](https://github.com/google/zx) 或 [NPM](https://www.npmjs.com/package/zx) 查看。

## 使用心得

- 可以引用其它的 npm 包，像正常的 JS 项目一样安装到 node_modules 中即可，如 lodash 等。
- Markdown 模式可以提供良好的文档，但是不利于脚本的调试，变量跳转、批量重命名等
- zx 适合写 胶水式的 Shell 脚本，一般会有一些约定的前提条件（如安装了 xx 命令），如果想要实现通用的复杂脚本，还是直接上 npm 包更好一些。
