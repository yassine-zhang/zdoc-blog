# Lint Staged

> 这是一个可以防止垃圾代码存入仓库的repo,通常可以搭配Git钩子+Linters(代码格式化)实现很好的效果。

&nbsp;&nbsp;例如在`pre-commit`时调用`lint-staged` bin可执行文件，那么每当我们提交文件到暂存区之前就会出现类似下面执行步骤

```
$ git commit

✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ packages/frontend/.lintstagedrc.json — 1 file
    ↓ *.js — no files [SKIPPED]
    ❯ *.{json,md} — 1 file
      ⠹ prettier --write
  ↓ packages/backend/.lintstagedrc.json — 2 files
    ❯ *.js — 2 files
      ⠼ eslint --fix
    ↓ *.{json,md} — no files [SKIPPED]
◼ Applying modifications from tasks...
◼ Cleaning up temporary files...
```

## 如何安装和配置？

![Alt text](image.png)

## step2: 需要注册`git`钩子去运行`lint-staged`

推荐我们使用`husky`，那我们就用它，

> `Husky`提高了你的代码提交质量还有更多。
> 当您提交或推送时，您可以使用它来检查提交消息、运行测试、检查代码等。Husky 支持[所有客户端Git钩子](https://git-scm.com/docs/githooks)。

快速初始化`husky`

```shell
npx husky-init && npm install
```

::: details 它将做以下事情：

1. 添加`prepare`脚本到`package.json`，
   > 当首次拉取仓库到本地需要先执行`npm run prepare`来做预备工作

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

2. 创建一个普通`pre-commit`钩子，你能编辑它（默认在你提交时会执行`npm test`）
3. 配置Git hooks路径

使用`husky add`去添加其他钩子，例如：

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

:::

因为我们要用`lint-staged`所以可以修改.husky/pre-commit文件为如下内容：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"   // [!code --]
. "$(dirname "$0")/_/husky.sh"  // [!code ++]

npm test    // [!code --]
npx lint-staged // [!code ++]
git add ./  // [!code ++]
```

上面执行`npx lint-staged`后又执行了`git add ./`的原因是因为后面会触发lint-staged中配置的条件，调用linter的格式化功能。

因此会将文件重新写入，而这时重新写入的文件仍然处于Modify的状态，所以要将其添加到暂存区

### problem

你可能会遇到husky不能执行，不知道为什么？

> hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.

解决：可能是权限不够，无法执行此文件，我们需要将其修改为可执行文件

```shell
chmod +x .husky/pre-commit
```

## step3: 安装linter --> `Prettier`

**什么是Prettier?**

1. 固执己见的代码格式化程序
2. 支持多种语言
3. 与大多数编辑器集成
4. 另外还有一些特色etc...

---

- 首先将`Prettier`安装到本地

```shell
npm install --save-dev --save-exact prettier
```

- 然后创建一个空的配置文件，让编译器和其他工具知道你正在使用`prettier`
  ::: warning
  调用`node -e|--eval run-script`可以执行node环境下一些函数
  :::

```shell
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

&nbsp;&nbsp;如果写入`{}`为空，默认是使用`Prettier`官方标准的配置信息来格式化，也可以手动写入需要的或进入`Prettier`官网[Playground](https://prettier.io/playground/)进行配置后点击左下角`Copy config Json`将json拷贝到`.prettierrc`中

- 下一步，创建一个`.prettierignore`文件让 `Prettier CLI` 和编译器知道哪些文件不需要格式化。这里有一个案例：

```
# prettier doesn't respect newlines between chained methods
# https://github.com/prettier/prettier/issues/7884
**/*.spec.js
**/*.spec.ts
**/dist
# https://github.com/prettier/prettier/issues/5246
**/*.html
```

---

用`Prettier`格式化所有文件

```shell
npx prettier . --write
```

用`Prettier`检查所有文件是否格式化

```shell
npx prettier . --check
```

`--check`很像`--write`但它只是检查文件是否格式化

## step4: 配置`lint-staged`去运行`linters`和其他任务

- 打开`package.json`并将类似以下内容写入
  ::: warning
  配置属性名可以根据`Glob`文件路径匹配模式的语法规范来写
  :::

```json
{
  "lint-staged": {
    "*.{js,md,ts,vue,json}": ["prettier --write"]
  }
}
```

- 或者忽略上面一条配置方式，创建一个`.lintstagedrc`文件并写入类似以下内容

```
{
  "*.{js,md,ts,vue,json}": [
    "prettier --write"
  ]
}
```

---

> 这个配置将用当前暂存后的文件作为参数去执行`prettier --write`
> 所以，考虑到您这样做`git add file1.ext file2.ext`，`lint-staged`将运行以下命令

```shell
prettier --write file1.ext file2.ext
```
