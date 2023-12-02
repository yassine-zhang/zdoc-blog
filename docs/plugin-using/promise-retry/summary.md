---
aside: true
---

# promise-retry异步重试模块中文文档 {#promise-retry-cndoc}

<div style="display:flex; margin: 10px 0">
    <a href="https://npmjs.org/package/promise-retry"><img src="http://img.shields.io/npm/v/promise-retry.svg" alt="github actions"></a>
    <a style="margin-left: 4px;" href="https://npmjs.org/package/promise-retry"><img src="http://img.shields.io/npm/dm/promise-retry.svg" alt="github actions"></a>
</div>

利用`retry`模块的强大功能，重试返回一个异步函数。

已经有一些模块能够重试返回异步的函数，但是它们很难使用，或者没有提供一种简单的方法来进行条件重试<br/>
Repository: [https://github.com/IndigoUnited/node-promise-retry](https://github.com/IndigoUnited/node-promise-retry)

## Installation

`$ npm install promise-retry`

## Usage

### promiseRetry(fn, [options])

`fn`接收两个参数

- `retry` - 每次需要再次调用函数重新尝试时传入此函数一个错误信息，例如，retry(err)。
- `number` - 执行的次数，首次也算在内。

(可以直接传入一个或两个下面参数的异步函数，也可以传入一个普通函数最终返回一个异步函数)

---

> 根据`options`或默认配置信息调用`fn`异步函数，直到达到调用次数最大限制后输出传入`retry`函数的错误，或者在调用过程中因其他错误而退出，如果未调用`retry`函数则视为完成异步函数的调用。

[retry]: https://github.com/tim-kos/node-retry

`options`参数是一个映射到[retry]模块的参数对象：

- `retries`: 最大重试操作的计数，默认为`10`。
- `factor`: 要用到的指数因子，默认是`2`。
- `minTimeout`: 在首次重试之前要延迟的毫秒数，默认是`1000`。
- `maxTimeout`: 两次重试之间最大延迟毫秒数，默认是`Infinity`。
- `randomize`: 通过乘以1～2之间的指数来随机控制延迟时间，默认为`false`。

计算单次超时的公式：

```
Math.min(random * minTimeout * Math.pow(factor, attempt), maxTimeout)
```

如果你愿意的话，也可以将函数的参数进行调换，函数签名就像这样`promiseRetry([options], fn)`。

## Example

```js
import promiseRetry from "promise-retry";
import axios from "axios";

promiseRetry(
  async (retry, number) => {
    // number是执行的次数，重试计数是第一次执行完后第二次调用才算首次重试
    if (number !== 1) console.log("Retry connection", number - 1);

    let res;
    await axios
      .get(`http://localhost:${port}/init/test-db-connection`)
      .then((response) => {
        res = response;
      });

    if (!res.data.connected) {
      retry("Unable to connect to database.");
    } else {
      console.log("Database connection successful!");
      axios.get(`http://localhost:${port}/init/table`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          password: "97ucXFNME2CgcCoMFmiN",
        },
      });
    }
  },
  {
    retries: 10,
    factor: 2,
    minTimeout: 3000,
    maxTimeout: 30 * 1000,
    randomize: false,
  },
);
```

## LICENSE

[MIT License]: http://www.opensource.org/licenses/mit-license.php

Released under the [MIT License].
