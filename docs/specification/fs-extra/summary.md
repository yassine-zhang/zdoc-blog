# 前言

`fs-extra` 是一个基于 `node` 框架中 `fs` 模块扩展的包，可以方便调用一些复杂操作，比如：`copy, move, ensureFile` 等等

Github Reponsitory: [https://github.com/jprichardson/node-fs-extra/tree/master](https://github.com/jprichardson/node-fs-extra/tree/master)

之后我会写出项目整个源码所采用的设计规范，不断强化自身学习

## 1. 目录结构

```
node-fs-extra
├── .github
├── docs
│   ├── copy-sync.md
│   ├── copy.md
│   ├── emptyDir-sync.md
│   ├── emptyDir.md
│   └── ...
├── lib
│   ├── __tests__
│   │   └── promise.test.js
│   ├── copy
│   │   ├── __tests__
│   │   │   ├── copy.test.js
│   │   │   ├── copy-sync-file.test.js
│   │   │   └── copy-sync-dir.test.js
│   │   ├── copy-sync.js
│   │   ├── copy.js
│   │   └── index.js
│   ├── empty
│   ├── path-exists
│   └── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── LICENSE
└── CHANGELOG.md
```

如上结构，各种文件及其文件夹所代表的意义：

`.github`: 创建GitHub自动化工作流所需的文件夹;

`docs`: 每个功能所需的文档目录;

`lib`: 类库，功能的总文件夹;

`lib/__tests__/`: 用于测试其余杂功能的文件夹;

`lib/**/__tests__/`: 用于测试单个模块内部功能的文件夹;

`lib/**/index.js`: 单独模块功能汇总在此文件中，内容较多最好拆分开;

`lib/index.js`: 整个项目所有功能的汇总文件;

`package.json`: npm 配置信息;

`package-lock.json`: 当前依赖包的状态信息;

`README.md`: 用于新访客访问仓库的起始页文档;

`LICENSE`: 身份认证版权信息;

`CHANGELOG.md`: 改动Log.

::: danger
文件名称前面带符号“.”代表隐藏文件
:::

## 命名格式

### 文件夹：

1. 测试文件夹应该遵循：`__tests__`
2. 其他文件夹应该遵循：单个英文单词-单个英文单词，例如：`path-exists`

### 文件：

1. 测试文件：单个英文单词-单个英文单词.test.js, 例如：`copy-sync-dir.test.js`

### 函数&接口&常量

应该遵循：小驼峰写法

## lib/index.js如何继承

案例：

```js
export { calculatePercent, getPercent } from "./cal-percent/index.js";
export { arrayReplaceMultp } from "./filter-raw-data/index.js";
export { loadRawData, loadRawDataSync } from "./load-raw-data/index.js";
export { refresh, refreshSync } from "./refresh/index.js";
```

## ts项目

如果要使用`TS`进行开发那么也非常简单，只需要留意`tsconfig.json`，具体像如下这样：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "include": ["lib/**/*"],
  "exclude": ["node_modules"]
}
```

我自己根据此项目规范编写了一个项目：一个可以将一组中文字符串提取正负面情绪字词并转换为百分比的库。

[emotional-percentage](https://github.com/yassine-zhang/emotional-percentage/tree/main)
