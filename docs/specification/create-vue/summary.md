# create-vue

Github Reponsitory: https://github.com/vuejs/create-vue/tree/main

`create-vue`是一个基于Vite脚手架搭建的多种Vue项目模版，

我们可以调用以下命令安装并且会出现一些命令提示符形式的选项

```shell
npm create vue@latest
```

下面是运行的大致过程CLI截图，此工具可以让我们有选择的创建项目，不过影响不大，如果一个插件在之后需要用到再用包管理工具去装就好了

<p align="center">
  <img src="./screenshot-cli.png" width="800">
</p>

## 项目目录

<p align="center">
  <img src="./catalogue.png" width="800">
</p>

**目录分析**：

- `.github/workflows` 用于Github仓库的一种自动化action工具，例如当你搭建了一个VitePress博客仓库，那么可以在代码推送后采用Github Actions去自动化构建和部署项目

- `.husky` 提供git的所有hooks，这里方便在每次commit前一刻调用pre-commit脚本

- `media` 像图片音视频素材都可以存到这里

- `playground @ cd1ae6d` 可以通过[子模块](https://zhuanlan.zhihu.com/p/143100657)或[子树](https://zhuanlan.zhihu.com/p/143100657)来嵌入其他的项目。这种方式可以使你的项目包含其他项目的代码，并且可以保持这些嵌入项目的独立性和版本控制。

- `scripts` 方便操作的可执行脚本通常放到这里

- `template` 根据开发者安装时CLI选项来将制定模版合并到创建的项目中

- `utils` 工具脚本存放位置

- `.gitignore` 在使用git提交代码时设置哪些可以忽略不提交

- `.gitmodules` git子模块配置文件

- `.prettierignore` Prettier格式化工具在格式化时所需忽略的文件

- `.prettierrc` Prettier格式化配置文件

- `LICENSE` 当前仓库的开源协议，例如MIT、GPL、Apache、BSD...

- `tsconfig.json` ts项目配置文件，如果图方便可以使用[@tsconfig/node18](https://www.npmjs.com/package/@tsconfig/node18)提供的公用配置文件来作为扩展，

```json
{ "extends": "@tsconfig/node18/tsconfig.json" }
```

## 文件分析

## .gitmodule

```shell
[submodule "playground"]
	path = playground
	url = https://github.com/vuejs/create-vue-templates.git
```

在上面文件中，可以看出定义了一个子模块名叫`playground，之后分别指定了path&url，非常简单的一个文件

## .prettierignore

```shell
pnpm-lock.yaml

# prettier doesn't respect newlines between chained methods
# https://github.com/prettier/prettier/issues/7884
**/*.spec.js
**/*.spec.ts
**/dist
# https://github.com/prettier/prettier/issues/5246
**/*.html

playground
```

在这个文件中指定了一些无意义无需格式化的文件及目录，

其中

- `pnpm-lock.yaml` 本身就是自动生成的文件，像格式也理应不发生变化否则后续可能会出一些依赖的问题，
- `playground` 这是子模块负责的板块，理应子模块负责

## package.json

```json
{// [!code focus]
  "name": "create-vue",
  "version": "3.7.5",
  "description": "An easy way to start a Vue project",
  "type": "module", // [!code focus]
  "bin": {// [!code focus]
    "create-vue": "outfile.cjs" // [!code focus]
  }, // [!code focus]
  "files": [// [!code focus]
    "outfile.cjs", // [!code focus]
    "template" // [!code focus]
  ], // [!code focus]
  "engines": {
    "node": ">=v16.20.0"
  },
  "scripts": {// [!code focus]
    "prepare": "husky install", // [!code focus]
    "format": "prettier --write .", // [!code focus]
    "build": "zx ./scripts/build.mjs", // [!code focus]
    "snapshot": "zx ./scripts/snapshot.mjs", // [!code focus]
    "pretest": "run-s build snapshot", // [!code focus]
    "test": "zx ./scripts/test.mjs", // [!code focus]
    "prepublishOnly": "zx ./scripts/prepublish.mjs" // [!code focus]
  }, // [!code focus]
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/create-vue.git"
  },
  "keywords": [],
  "author": "Haoqun Jiang <haoqunjiang+npm@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/vuejs/create-vue/issues"
  },
  "homepage": "https://github.com/vuejs/create-vue#readme",
  "devDependencies": {// [!code focus]
    "@tsconfig/node18": "^18.2.2", // [!code focus]
    "@types/eslint": "^8.44.2", // [!code focus]
    "@types/node": "^18.17.17", // [!code focus]
    "@types/prompts": "^2.4.4", // [!code focus]
    "@vue/create-eslint-config": "^0.3.2", // [!code focus]
    "@vue/tsconfig": "^0.4.0", // [!code focus]
    "ejs": "^3.1.9", // [!code focus]
    "esbuild": "^0.18.20", // [!code focus]
    "esbuild-plugin-license": "^1.2.2", // [!code focus]
    "husky": "^8.0.3", // [!code focus]
    "kolorist": "^1.8.0", // [!code focus]
    "lint-staged": "^14.0.1", // [!code focus]
    "minimist": "^1.2.8", // [!code focus]
    "npm-run-all2": "^6.0.6", // [!code focus]
    "prettier": "^3.0.3", // [!code focus]
    "prompts": "^2.4.2", // [!code focus]
    "zx": "^7.2.3" // [!code focus]
  }, // [!code focus]
  "lint-staged": {// [!code focus]
    "*.{js,ts,vue,json}": [// [!code focus]
      "prettier --write" // [!code focus]
    ] // [!code focus]
  } // [!code focus]
}// [!code focus]
```

[点我查看npm package.json配置官方文档](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

上面文件中模糊部分是发布包到npm所需基本属性，我在此假借隐藏

## tsconfig.json
