# esbuild-plugin-license

<div style="display:flex; margin: 10px 0">
    <a href="https://www.npmjs.com/package/esbuild-plugin-license"><img src="https://img.shields.io/npm/v/esbuild-plugin-license/latest?style=flat-square" alt="npm (tag)"></a>
    <a style="margin-left: 4px;"><img src="https://img.shields.io/npm/dm/esbuild-plugin-license?style=flat-square" alt="npm"></a>
</div>

<!-- [![npm (tag)](https://img.shields.io/npm/v/esbuild-plugin-license/latest?style=flat-square)](https://www.npmjs.com/package/esbuild-plugin-license)
![npm](https://img.shields.io/npm/dm/esbuild-plugin-license?style=flat-square) -->

---

[[TOC]]

## 用法 {#usage}

```shell
npm i -D esbuild-plugin-license
```

```js
import * as esbuild from 'esbuild'
import esbuildPluginLicense from 'esbuild-plugin-license';

esbuild.build({
  entryPoints: ['index.ts'],
  outdir: 'dist',
  plugins: [esbuildPluginLicense({...})],
  bundle: true,
  platform: 'node',
  packages: "external",    // [!code --]
})

```

<font color="#FF6666">注意：如果为esbuild添加上`packages`属性，使其所有依赖为外部引用，那么会导致`esbuild-plugin-license`无法获取`allDependencies`</font>

## 配置 {#config}

| Param           |    Type    | Description                                                                                                                                                                                                                |
| --------------- | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| includePrivate  | `boolean`  | 用于控制是否在生成的许可证文件中包含私有包的信息。需要注意的是，如果你的项目中包含私有包，请确保遵循相应的许可证协议和法律要求。此外，包含私有包的信息可能会泄露一些敏感信息，因此在使用 includePrivate 选项时请谨慎处理。 |
| output          |  `object`  | 许可证输出信息配置位置                                                                                                                                                                                                     |
| output.file     |  `string`  | 输出文件名称                                                                                                                                                                                                               |
| output.template | `function` | 输出内容模版函数，函数签名(allDependencies)，其中 allDependencies 指获取到package.json中的所有依赖信息，return返回的字符串为实际输出内容。                                                                                 |

**配置案例：（这是 create-vue 的 esbuild-plugin-license 处使用案例）**

```js
esbuildPluginLicense({
  thirdParty: {
    includePrivate: false,
    output: {
      file: "LICENSE",
      template(allDependencies) {
        // There's a bug in the plugin that it also includes the `create-vue` package itself
        const dependencies = allDependencies.filter(
          (d) => d.packageJson.name !== "create-vue",
        );
        const licenseText =
          `# create-vue core license\n\n` +
          `create-vue is released under the MIT license:\n\n` +
          CORE_LICENSE +
          `\n## Licenses of bundled dependencies\n\n` +
          `The published create-vue artifact additionally contains code with the following licenses:\n` +
          [
            ...new Set(
              dependencies.map((dependency) => dependency.packageJson.license),
            ),
          ].join(", ") +
          "\n\n" +
          `## Bundled dependencies\n\n` +
          dependencies
            .map((dependency) => {
              return (
                `## ${dependency.packageJson.name}\n\n` +
                `License: ${dependency.packageJson.license}\n` +
                `By: ${dependency.packageJson.author.name}\n` +
                `Repository: ${dependency.packageJson.repository.url}\n\n` +
                dependency.licenseText
                  .split("\n")
                  .map((line) => (line ? `> ${line}` : ">"))
                  .join("\n")
              );
            })
            .join("\n\n");

        return licenseText;
      },
    },
  },
});
```

<font color="#FF6666">注意：在上面代码案例中`\n`表示换一次行，指光标从当前行换到下一行，并非换两次行的效果，`\n\n`才可以看到上文和下文之间有一道空白间隔。在下面将展示CORE_LICENSE的默认核心信息</font>

::: details CORE_LICENSE

```js
const CORE_LICENSE = `MIT License

Copyright (c) 2021-present vuejs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
```

:::
