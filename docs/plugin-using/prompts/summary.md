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

[[TOC]]

![split](./split.png)

## ❯ 安装 {#-install}

```
$ npm install --save prompts
```

> 这个包支持Node 14及以上版本

![split](./split.png)

## ❯ 用法 {#-usage}

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

## ❯ 案例 {#-examples}

### 单个提问 {#-single-prompt}

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

### 链条式提问 {#-prompt-chain}

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

### 动态提问 {#-dynamic-prompt}

提问属性也能变成函数。
如果将`type`设置成假值（例如：undefined, null, false等不在规定范围内所有值），那么此提问对象将被忽略。

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

## ❯ API {#-api}

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
函数签名：(prompt, answer, answers) ，

- `prompt` - 当前提问对象，
- `answer` - 用户回答的当前问题的答案，
- `answers` - 用户从之前到现在回答的所有问题的答案。支持异步函数调用。

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
函数签名：(prompt, answers) ，

- `prompt` - 当前提问对象
- `answers` - 之前用户的回答数据。此函数支持异步调用。

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

![split](./split.png)

## ❯ Prompt Objects {#-prompt-objects}

提问对象是定义问题和[提问类型](#-types)的JS对象。
几乎所有的提问对象都遵循以下属性结构：

```js
{
  type: String | Function,
  name: String | Function,
  message: String | Function,
  initial: String | Function | Async Function
  format: Function | Async Function,
  onRender: Function
  onState: Function
  stdin: Readable
  stdout: Writeable
}
```

每个属性都可以是函数类型，并在提问用户之前调用。

函数签名：(prev, values, prompt) ,

- `prev` - 前一个提问的值
- `values` - 到目前为止响应对象收集的所有值
- `prompt` - 上一个提问对象

**函数案例：**

```js
{
  type: prev => prev > 3 ? 'confirm' : null,
  name: 'confirm',
  message: (prev, values) => `Please confirm that you eat ${values.dish} times ${prev} a day?`
}
```

如果上一个提问值小于3将跳过上面代码这个提问。

### type

Type: `String|Function`

定义要显示的提问类型，请看[提问类型](#-types)列表获取更多有效值。

如果 `type` 是一个假值，那么提问器将跳过此问题。

```js
{
  type: null,
  name: 'forgetme',
  message: `I'll never be shown anyway`,
}
```

### name

Type: `String|Function`

响应数据将保存在此键作为的属性中，最终添加到响应对象中。
当你有多个提问对象使用了同一 `name` 的情况下，只存储最新的响应值。

> 如果你不想被覆盖之前的值，请确保为prompts提供唯一的名字。

### message

Type: `String|Function`

要显示给用户的信息。

### initial

Type: `String|Function`

可选的默认提问值，也支持异步函数。

### format

Type: `Function`

接收用户输入并返回要在程序中使用的格式化值。
返回的值将被添加到响应对象中。

函数签名： (val, values) ,

- `val` - 当前提问的值
- `values` - 当前响应对象，以防止你需要根据以前的响应进行格式化。

**Example:**

```js
{
  type: 'number',
  name: 'price',
  message: 'Enter price',
  format: val => Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(val);
}
```

### onRender

Type: `Function`

提问被渲染时的回调函数。
这个函数接收[kleur](https://github.com/lukeed/kleur)作为第一个参数并且 `this` 指针指向当前提问。

**Example:**

```js
{
  type: 'number',
  message: 'This message will be overridden',
  onRender(kleur) {
    this.msg = kleur.cyan('Enter a number');
  }
}
```

### onState

Type: `Function`

当前提问状态发生变化时的回调。

函数签名：(state)

- `state` - 一个捕捉当前状态的对象
  状态对象有两个属性：`value` 和 `aborted`。例如 `{ value: 'This is ', aborted: false }`

> aborted 属性我会把它理解为用户的聚焦输入已经离开了此提问，当然像退出程序前一帧也算。

### stdin 和 stdout {#-stdin-and-stdout}

Type: `Stream`

默认情况下， prompts 使用`process.stdin`来接收输入信息，`process.stdout` 来打印输出。
如果你需要使用不同的流，例如[process.stderr](https://www.nodeapp.cn/process.html#process_process_stderr)，你可以用`stdin`和`stdout`设置这些属性。

![split](./split.png)
