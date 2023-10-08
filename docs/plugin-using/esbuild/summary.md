<p style="display: flex; align-items: center;">
  <img src="./favicon.svg" alt="esbuild" width="80" style="display: inline-block;" /><span style="display: inline-block; font-size: 38px; margin-left: 10px;">esbuild</span>
</p>

一个极快的前端打包工具。

![Production bundle](production-bundle.png)

上图：使用默认设置，包括最小化和源映射，从头开始制作一个包含10个three.js库副本的生产包所消耗的时间。更多信息[点击这里](https://esbuild.github.io/faq/#benchmark-details)

我们当前的Web构建工具比他们原本可能的速度慢了10-100倍。esbuild 构建工具的核心目标是开创构建工具性能的新时代，同时创建一个易于使用的现代构建工具。

主要特性：

- 极快的速度，无需缓存
- 支持 ES6 和 CommonJS 模块
- 支持对 ES6 模块进行 tree shaking
- [API](https://esbuild.github.io/api/) 可同时用于 JavaScript 和 Go
- 兼容 [TypeScript](https://esbuild.docschina.org/content-types/#typescript) 和 [JSX](https://esbuild.docschina.org/content-types/#jsx) 语法
- 支持 [Source maps](https://esbuild.docschina.org/api/#sourcemap)
- 支持 [Minification](https://esbuild.docschina.org/api/#minify)
- 支持 [plugins](https://esbuild.docschina.org/plugins/)

如想使用 esbuild，请查阅[快速入门](https://esbuild.docschina.org/getting-started/)章节。

---

[[TOC]]

## 安装 esbuild {#install-esbuild}

首先，在本地命令行下载并安装 esbuild。同时会自动安装预构建本地可执行文件。

```shell
npm install --save-exact --save-dev esbuild
```

安装好之后我们可以在本地`node_modules`文件夹中找到esbuild，你可以执行以下命令验证是否能正常工作。

```shell
./node_modules/.bin/esbuild --version
```

## 第一个捆绑包 {#your-first-bundle}

我们可以使用后缀为 `.js  .ts  .jsx  .css` 的文件来通过 esbuild 打包，

举个例子，这里有一个包含以下代码的 `app.jsx` 文件

```jsx
import * as React from "react";
import * as Server from "react-dom/server";

let Greet = () => <h1>Hello, world!</h1>;
console.log(Server.renderToString(<Greet />));
```

之后，使用 esbuild 去打包此文件

```shell
./node_modules/.bin/esbuild app.jsx --bundle --outfile=out.js
```

注意：esbuild 也能转换jsx语句到js，除了`.jsx`后缀，没有任何其他配置。

## 构建脚本 {#build-scripts}

&nbsp;&nbsp;您的构建命令是您将反复执行的命令，所以你会想着如何让它自动化。一种自然的方式是在你的`package.json`文件中添加构建脚本，就像下面这样：

```json
{
  "scripts": {
    "build": "esbuild app.jsx --bundle --outfile=out.js"
  }
}
```

注意：这里直接使用`esbuild`命令，而不是一个相对路径。这是有效的，因为脚本部分中的所有内容都是与路径中已经存在的esbuild命令一起运行的（只要你[安装了这个包](#install-esbuild)）。

这个构建脚本能够像下面这样被调用：

```shell
npm run build
```

&nbsp;&nbsp;然而，如果您需要传递多个选项给esbuild，那么使用命令行接口可能会变的笨拙。对于更复杂的用途，您可能需要使用esbuild的JavaScript API在JavaScript中编写构建脚本。这可能看起来像这样(<font color="#FF6666">注意，这段代码必须保存在一个扩展名为.mjs的文件中，因为它使用了import关键字</font>):

```js
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["app.jsx"],
  bundle: true,
  outfile: "out.js",
});
```

&nbsp;&nbsp;构建函数在子进程中运行esbuild可执行文件，并返回一个承诺，该承诺将在构建完成时进行解析。还有一个buildSync API不是异步的，但异步API更适合构建脚本，因为插件只能使用异步API（这里插件是指esbuild plugin）。您可以在[API文档](https://esbuild.github.io/api/#build)中阅读有关构建API的配置选项的更多信息。

## 在浏览器构建 {#bounding-browser}

&nbsp;&nbsp;默认情况下构建工具输出浏览器代码，因此不需要额外的配置就可以开始。

- 对于开发构建，您可能想要用`--sourcemap`来开启源映射
- 对于生产构建，您可能希望使用`--minify`启用最小化

您可能还想为您支持的浏览器配置目标环境，以便将太新的JavaScript语法转换为较旧的JavaScript语法，所以可能看起来像这样：

```js
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["app.jsx"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["chrome58", "firefox57", "safari11", "edge16"],
  outfile: "out.js",
});
```

## 在node构建 {#bounding-node}

&nbsp;&nbsp;尽管在使用node时不需要打包工具，但有时在node中运行代码之前使用esbuild处理代码仍然有益。捆绑可以自动剥离TypeScript类型，将ECMAScript模块语法转换为CommonJS，并将较新的JavaScript语法转换为特定版本节点的旧语法。

&nbsp;&nbsp;如果要打包将要在`node`中运行的代码，则应通过传递`--platform=node`给esbuild来配置平台设置。

> 这会同时将几个不同的设置更改为节点推荐的默认值。例如所有内置到node的包（例如fs）都会自动标记为外部，因此esbuild不会尝试打包它们。此设置还会禁用对`package.json`中浏览器字段的解释。

如果您的代码中使用了在您node版本不起作用的较新JavaScript语法，则需要配置节点的目标版本：

```js
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["app.js"],
  bundle: true,
  platform: "node",
  target: ["node10.4"],
  outfile: "out.js",
});
```

&nbsp;&nbsp;您也可能不希望将依赖项与 esbuild 打包在一起。~~esbuild 在打包时不支持许多特定于node的功能，例如 `__dirname` 、 `import.meta.url` 、 `fs.readFileSync` 和 `*.node` 本机二进制模块。~~ 您可以通过将包设置为外部包来从捆绑包中排除所有依赖项：

```js
require("esbuild").buildSync({
  entryPoints: ["app.jsx"],
  bundle: true,
  platform: "node",
  packages: "external",
  outfile: "out.js",
});
```

<font color="#FF6666">如果执行此操作，则依赖项在运行时必须仍存在于文件系统上，因为它们不再包含在捆绑包中。</font>

> esbuild主要用于打包浏览器JS代码，如果要在node端打包使用要时刻注意兼容问题。

## 案例

```js
import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["index.ts"],
  outfile: "outfile.cjs",
  format: "cjs",
  platform: "node",
  target: "node14",

  plugins: [...plugins],
});
```
