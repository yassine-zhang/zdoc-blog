# minimist <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

<div style="display:flex; margin: 10px 0">
    <a href="https://github.com/minimistjs/minimist/actions"><img src="https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/minimistjs/minimist" alt="github actions"></a>
    <a style="margin-left: 4px;" href="https://app.codecov.io/gh/minimistjs/minimist/"><img src="https://codecov.io/gh/minimistjs/minimist/branch/main/graphs/badge.svg" alt="coverage"></a>
    <a style="margin-left: 4px;" href="https://github.com/minimistjs/minimist/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/minimist.svg" alt="License"></a>
    <a style="margin-left: 4px;" href="https://npm-stat.com/charts.html?package=minimist"><img src="https://img.shields.io/npm/dm/minimist.svg" alt="Downloads"></a>
</div>

<!-- [![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url] -->

[![npm badge][npm-badge-png]][package-url]

解析参数选项

这是一个参数解析核心模块，没有任何花里胡哨的样式。

## 案例

```js
var argv = require("minimist")(process.argv.slice(2));
console.log(argv);
```

```
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

```
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{
	_: ['foo', 'bar', 'baz'],
	x: 3,
	y: 4,
	n: 5,
	a: true,
	b: true,
	c: true,
	beep: 'boop'
}
```

## 安全

在以前的版本有一个环境保护bug，当处理不受信任的用户输入时，它能引发提权（privilege escalation）。

请使用1.2.6及之后的版本：

- https://security.snyk.io/vuln/SNYK-JS-MINIMIST-2429795 (version <=1.2.5)
- https://snyk.io/vuln/SNYK-JS-MINIMIST-559764 (version <=1.2.3)

## 方法

```js
var parseArgs = require("minimist");
```

## var argv = parseArgs(args, opts={})

返回一个`argv`参数对象，其中用args的数组参数赋值。

`argv._`包含了所有没有关联选项的参数。

数值型参数将作为数字返回，除非为参数名设置`opts.string`或`opts.boolean`。

`--`之后的任何参数都不会被解析，而是直接将数据存到`argv._`中。

选项包括：

- `opts.string` - 用于指定哪些命令行参数应该被解析为字符串类型
- `opts.boolean` - 用于指定哪些命令行参数应该被解析为布尔类型
  - 一旦在数组中定义了某个参数名，那么即使在调用脚本时没有添加参数项，也会默认返回该参数并赋值`false`，这一点和`opts.string`不同
- `opts.alias` - 用于为命令行参数设置别名
- `opts.default` - 用于为命令行参数设置默认值
- `opts.stopEarly` - 用于指定在遇到非选项参数时是否停止解析后续的命令行参数
- `opts['--']` - 当为`true`时`argv._`填充`--`之前的参数，`argv['--']`填充`--`之后的参数。这里有一个案例：

```
> require('./')('one two three -- four five --six'.split(' '), { '--': true })
{
  _: ['one', 'two', 'three'],
  '--': ['four', 'five', '--six']
}
```

::: warning 注意：

1. `opts['--']`可以当作分隔符，将参数数据分割到相应变量中。
2. 如果不需要此功能请将`{ '--': true }`注释掉并且应避免在调用时向参数内添加`--`。

错误案例：（这里已将script.js改为可执行脚本，只需在首行添加`#!/usr/bin/env node`）

```shell
./script.js --age 17 --sex -- one two three --beautiful
```

3. `--`是固定的，不应使用其他字符串信息来代替
   :::

- `opts.unknown` - 用于定义未知选项的处理方式。当有未知的选项出现时，可以使用该选项来控制 `minimist` 的行为,`opts.unknown` 下面是对用法的说明：

::: details

将 `opts.unknown` 设置为一个函数，用于自定义对未知选项的处理。该函数接收三个参数：`option`（未知选项的名称）、`value`（未知选项的值）和 `arg`（所有未解析的选项数组）。函数应返回 `true` 或一个解析后的值来覆盖未知选项的默认行为。例如：

```javascript
const args = require("minimist")(process.argv.slice(2), {
  unknown: (option, value, arg) => {
    console.log("Unknown option:", option);
    return true; // 返回 true 表示忽略未知选项
  },
});
```

这个例子中，执行代码时，当解析到未知选项时，会在控制台打印消息并返回 `true`，表示忽略该选项。此时`argv._`中将没有任何数据，而当返回 `false` 时将表示不忽略未知选项

:::

## 安装

使用[npm][npm-url]应该执行以下命令

```shell
npm install minimist
```

## 许可证

MIT

[package-url]: https://npmjs.org/package/minimist
[npm-version-svg]: https://versionbadg.es/minimistjs/minimist.svg
[npm-badge-png]: ./npm-install.png
[license-image]: https://img.shields.io/npm/l/minimist.svg
[license-url]: https://github.com/minimistjs/minimist/blob/main/LICENSE
[downloads-image]: https://img.shields.io/npm/dm/minimist.svg
[downloads-url]: https://npm-stat.com/charts.html?package=minimist
[codecov-image]: https://codecov.io/gh/minimistjs/minimist/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/minimistjs/minimist/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/minimistjs/minimist
[actions-url]: https://github.com/minimistjs/minimist/actions
[npm-url]: https://npmjs.org/
