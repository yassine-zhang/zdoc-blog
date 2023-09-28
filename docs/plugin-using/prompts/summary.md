<p align="center">
  <img src="./prompts.png" alt="Prompts" width="500" />
</p>

<h1 align="center">❯ Prompts</h1>

<p align="center">
  <a href="https://npmjs.org/package/prompts">
    <img src="https://img.shields.io/npm/v/prompts.svg" alt="version" />
  </a>
  <a href="https://github.com/terkelg/prompts/actions/workflows/test.yml">
    <img src="https://github.com/terkelg/prompts/actions/workflows/test.yml/badge.svg" alt="test" />
  </a>
  <a href="https://npmjs.org/package/prompts">
    <img src="https://img.shields.io/npm/dm/prompts.svg" alt="downloads" />
  </a>
  <!---
   <a href="https://packagephobia.now.sh/result?p=prompts">
    <img src="https://packagephobia.now.sh/badge?p=prompts" alt="install size" />
  </a>
  --->
</p>

<p align="center">
  <b>轻量化、漂亮、友好的可交互式提示</b><br />
  <sub>>_ 更容易使用CLI prompts去询问用户信息▌</sub>
</p>

<br />

- **简单**: prompts是一个[很小的依赖包](http://npm.anvaka.com/#/view/2d/prompts)，它不像[dozen](http://npm.anvaka.com/#/view/2d/inquirer)体积过于庞大，prompts是一种极小的模块能够很好的协同工作。
- **友好**: 提问使用的布局和颜色来创建漂亮的CLI界面。
- **承诺**: 使用 promises 和 `async`/`await`. 可以避免 Callback hell（回调地狱）。
- **灵活**: 所有 prompts 都是独立的并且能够被他们自己使用。
- **统一**: 所有人的体验一致 [prompts](#-types)。
- **可测试性**: 提供一个方式去保存编程式的用户输入内容。

![split](./split.png)

## ❯ 安装

```
$ npm install --save prompts
```

> 这个包支持Node 14及以上版本

![split](./split.png)

## ❯ 用法

<img src="https://github.com/terkelg/prompts/raw/master/media/example.gif" alt="example prompt" width="499" height="103" />

```js
const prompts = require("prompts");

(async () => {
  const response = await prompts({
    type: "number",
    name: "value",
    message: "How old are you?",
    validate: (value) => (value < 18 ? `Nightclub is 18+ only` : true),
  });

  console.log(response); // => { value: 24 }
})();
```

> 看 [`example.js`](https://github.com/terkelg/prompts/blob/master/example.js) 查看更多选项。

![split](./split.png)

## ❯ 多个案例

### 单个提问

传入单个提问对象它会等待用户输入并返回一个带有响应的对象。

```js
const prompts = require("prompts");

(async () => {
  const response = await prompts({
    type: "text",
    name: "meaning",
    message: "What is the meaning of life?",
  });

  console.log(response.meaning);
})();
```

### 链条式提问

Prompt可以传入一个提问列表数组对象，最终返回一个响应对象。
确保每个提问对象都必须包含一个唯一 `name` 属性以防止值覆盖。

```js
const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "number",
    name: "age",
    message: "How old are you?",
  },
  {
    type: "text",
    name: "about",
    message: "Tell something about yourself",
    initial: "Why should I?",
  },
];

(async () => {
  const response = await prompts(questions);

  // => response => { username, age, about }
})();
```

### 动态提问

提问属性也能变成函数。
如果将`type`设置成`false`值，那么此提问对象将被忽略。

```js
const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "dish",
    message: "Do you like pizza?",
  },
  {
    type: (prev) => (prev == "pizza" ? "text" : null),
    name: "topping",
    message: "Name a topping",
  },
];

(async () => {
  const response = await prompts(questions);
})();
```

![split](./split.png)

## ❯ API

### prompts(prompts, options)

Type: `Function`<br>
Returns: `Object`

Prompter函数，它接受[提问对象](#-prompt-objects)并返回一个带有响应的对象。

#### prompts

Type: `Array|Object`<br>

参数接收单个[提问对象](#-prompt-objects)或多个[提问对象](#-prompt-objects)结合的数组。
这是将要展示到用户面前的提问配置信息。你可以看下列表所中所支持的[提问类型](#-types)。

Prompts能够被保存 (<kbd>return</kbd>, <kbd>enter</kbd>) 或取消 (<kbd>esc</kbd>, <kbd>abort</kbd>, <kbd>ctrl</kbd>+<kbd>c</kbd>, <kbd>ctrl</kbd>+<kbd>d</kbd>)而且当提问被取消时没有任何属性被定义在返回的响应对象中。

#### options.onSubmit

Type: `Function`<br>
Default: `() => {}`

每次提问提交后都会调用此回调函数。
此函数可以传入三个参数 `(prompt, answer, answers)` ，其中 `prompt` 是当前提问对象，`answer` 是用户回答的当前问题的答案，`answers` 是用户从之前到现在回答的所有问题的答案。支持异步函数调用。

返回 `true` 退出提问链并且返回到目前为止所有响应结果，否则继续迭代之后的提问对象。

**案例:**

```js
(async () => {
  const questions = [{ ... }];
  const onSubmit = (prompt, answer) => console.log(`Thanks I got ${answer} from ${prompt.name}`);
  const response = await prompts(questions, { onSubmit });
})();
```

#### options.onCancel

Type: `Function`<br>
Default: `() => {}`

当用户取消或退出提问时此回调将被调用。
此函数可以传入两个参数`(prompt, answers)`，其中 `prompt` 是当前提问对象，`answers` 是之前用户的回答数据。此函数支持异步调用。

返回 `true` 继续，防止提问循环终止。
如果取消将返回到目前为止收集到的响应结果。

**Example:**

```js
(async () => {
  const questions = [{ ... }];
  const onCancel = prompt => {
    console.log('Never stop prompting!');
    return true;
  }
  const response = await prompts(questions, { onCancel });
})();
```

### override

Type: `Function`

Preanswer questions by passing an object with answers to `prompts.override`.
Powerful when combined with arguments of process.

**Example**

```js
const prompts = require("prompts");
prompts.override(require("yargs").argv);

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "twitter",
      message: `What's your twitter handle?`,
    },
    {
      type: "multiselect",
      name: "color",
      message: "Pick colors",
      choices: [
        { title: "Red", value: "#ff0000" },
        { title: "Green", value: "#00ff00" },
        { title: "Blue", value: "#0000ff" },
      ],
    },
  ]);

  console.log(response);
})();
```

### inject(values)

Type: `Function`<br>

Programmatically inject responses. This enables you to prepare the responses ahead of time.
If any injected value is found the prompt is immediately resolved with the injected value.
This feature is intended for testing only.

#### values

Type: `Array`

Array with values to inject. Resolved values are removed from the internal inject array.
Each value can be an array of values in order to provide answers for a question asked multiple times.
If a value is an instance of `Error` it will simulate the user cancelling/exiting the prompt.

**Example:**

```js
const prompts = require("prompts");

prompts.inject(["@terkelg", ["#ff0000", "#0000ff"]]);

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "twitter",
      message: `What's your twitter handle?`,
    },
    {
      type: "multiselect",
      name: "color",
      message: "Pick colors",
      choices: [
        { title: "Red", value: "#ff0000" },
        { title: "Green", value: "#00ff00" },
        { title: "Blue", value: "#0000ff" },
      ],
    },
  ]);

  // => { twitter: 'terkelg', color: [ '#ff0000', '#0000ff' ] }
})();
```

![split](./split.png)
