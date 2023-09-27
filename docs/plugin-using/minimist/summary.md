# minimist <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

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

注意：当设置了`opts['--']`之后对参数的解析仍然在`--`之后结束。

- `opts.unknown` - 用于定义未知选项的处理方式。当有未知的选项出现时，可以使用该选项来控制 minimist 的行为,opts.unknown 可以是一个函数或布尔值。下面是对这两种用法的说明：

::: details

1. 函数用法：将 `opts.unknown` 设置为一个函数，用于自定义对未知选项的处理。该函数接收三个参数：`option`（未知选项的名称）、`value`（未知选项的值）和 `arg`（所有未解析的选项数组）。函数应返回 `true` 或一个解析后的值来覆盖未知选项的默认行为。例如：

```javascript
const args = require("minimist")(process.argv.slice(2), {
  unknown: (option, value, arg) => {
    console.log("Unknown option:", option);
    return true; // 返回 true 表示忽略未知选项
  },
});
```

这个例子中，当解析到未知选项时，会打印消息并返回 `true`，表示忽略该选项。

布尔值用法：将 `opts.unknown` 设置为 `true` 或 `false，来控制未知选项的默认行为。当设置为` true 时，未知选项将作为键值对存储在结果对象中；当设置为 `false` 时，未知选项将被忽略，默认值为 `false`。例如：

```javascript
const args = require("minimist")(process.argv.slice(2), {
  unknown: true,
});
```

在这个例子中，未知选项将被存储在结果对象中。

请注意，如果未指定 `opts.unknown`，则默认行为是忽略未知选项。
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
