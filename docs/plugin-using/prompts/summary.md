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
  style: String,
  name: String | Function,
  message: String | Function,
  initial: String | Function | Async Function
  format: Function | Async Function,
  validate: Function,
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

### style

Type: `String`

它的作用不大，表示用户输入的内容显示样式。这里`'default'`代表样式随`type`设定而变化。
当然可以输入这些渲染样式可选值（`default`, `password`, `invisible`, `emoji`），默认该值为`'default'`。

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

### validate

Type: `Function`

接收用户输入，如果值有效你应该返回`true`，否则返回一个错误信息`String`。如果返回`false`，将显示一条默认的错误消息。

**Example:**

```js
{
    name: 'packageName',
    type: () => (isValidPackageName(targetDir) ? null : 'text'),
    message: 'Package name:',
    initial: () => toValidPackageName(targetDir),
    validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
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

## ❯ Types {#-types}

- [text](#textmessage-initial-style)
- [password](#passwordmessage-initial)
- [invisible](#invisiblemessage-initial)
- [number](#numbermessage-initial-max-min-style)
- [confirm](#confirmmessage-initial)
- [list](#listmessage-initial)
- [toggle](#togglemessage-initial-active-inactive)
- [select](#selectmessage-choices-initial-hint-warn)
- [multiselect](#multiselectmessage-choices-initial-max-hint-warn)
- [autocompleteMultiselect](#multiselectmessage-choices-initial-max-hint-warn)
- [autocomplete](#autocompletemessage-choices-initial-suggest-limit-style)
- [date](#datemessage-initial-warn)

> 为了省事，我将所有提问通用的配置选项都取消了解释，也就是上方[提问对象](#-prompt-objects)里介绍的属性

---

### text(message, [initial], [style]) {#textmessage-initial-style}

> 自由文本输入。

按下 <kbd>tab</kbd> 自动填充提供的初始值。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/text.gif" alt="text prompt" width="499" height="103" />

```js
{
  type: 'text',
  name: 'value',
  message: `What's your twitter handle?`
}
```

**↑ back to:** [Prompt types](#-types)

---

### password(message, [initial]) {#passwordmessage-initial}

> 带有屏蔽输入的密码提问。

这个提示类似于 `text` 类型提示，需将`type` 设置为 `'password'`。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/password.gif" alt="password prompt" width="499" height="103" />

```js
{
  type: 'password',
  name: 'value',
  message: 'Tell me a secret'
}
```

**↑ back to:** [Prompt types](#-types)

---

### invisible(message, [initial]) {#invisiblemessage-initial}

> 用户可以输入不可见的文本

隐藏提问的工作方式类似于`sudo`，无论任何情况输入是不可见的。
隐藏提问就像`'text'`提问类型，只需将`style`设置为`'invisible'`。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/invisible.gif" alt="invisible prompt" width="499" height="103" />

```js
{
  type: 'invisible',
  name: 'value',
  message: 'Enter password'
}
```

**↑ back to:** [Prompt types](#-types)

---

### number(message, initial, [max], [min], [style]) {#numbermessage-initial-max-min-style}

> 允许用户输入数字。

当使用数字类型（type）时，你可以使键入<kbd>up</kbd><kbd>down</kbd>去增减值。只有数字允许输入进来，敲击<kbd>tab</kbd>自动填充`initial`内的默认值。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/number.gif" alt="number prompt" width="499" height="103" />

```js
{
  type: 'number',
  name: 'value',
  message: 'How old are you?',
  initial: 0,
  style: 'default',
  min: 2,
  max: 10
}
```

#### Options

| Param     |   Type    | Description                           |
| --------- | :-------: | ------------------------------------- |
| max       | `number`  | 最大值，默认`Infinity`                |
| min       | `number`  | 最小值，默认`-infinity`               |
| float     | `boolean` | 允许输入浮点数，默认值为`false`       |
| round     | `number`  | 将`float`值四舍五入到x位，默认值为`2` |
| increment | `number`  | 当使用方向键时的步长，默认为`1`       |

**↑ back to:** [Prompt types](#-types)

---

### confirm(message, [initial]) {#confirmmessage-initial}

> 经典的yes/no提问。

敲击 <kbd>y</kbd>或<kbd>n</kbd>来确认或拒绝。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/confirm.gif" alt="confirm prompt" width="499" height="103" />

```js
{
  type: 'confirm',
  name: 'value',
  message: 'Can you confirm?',
  initial: true
}
```

**↑ back to:** [Prompt types](#-types)

---

### list(message, [initial]) {#listmessage-initial}

> 可以返回一个数组的列表提问。

像`text`提问一样，但输出是一个`Array`，它通过`separator`进行字符串分割。

```js
{
  type: 'list',
  name: 'value',
  message: 'Enter keywords',
  initial: '',
  separator: ','
}
```

<img src="https://github.com/terkelg/prompts/raw/master/media/list.gif" alt="list prompt" width="499" height="103" />

| Param     |   Type   | Description                                                             |
| --------- | :------: | ----------------------------------------------------------------------- |
| separator | `string` | 字符串分割符，添加此属性自动去除数组每个字符串前后的空白，默认值：`','` |

**↑ back to:** [Prompt types](#-types)

---

### toggle(message, [initial], [active], [inactive]) {#togglemessage-initial-active-inactive}

> 交互式 toggle/switch 提问。

使用<kbd>arrow keys</kbd>/<kbd>tab</kbd>/<kbd>space</kbd>来切换之间的选项。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/toggle.gif" alt="toggle prompt" width="499" height="103" />

```js
{
  type: 'toggle',
  name: 'value',
  message: 'Can you confirm?',
  initial: true,
  active: 'yes',
  inactive: 'no'
}
```

#### Options

| Param    |   Type   | Description                           |
| -------- | :------: | ------------------------------------- |
| active   | `string` | 文本`active`状态，默认显示为`'on'`    |
| inactive | `string` | 文本`inactive`状态，默认显示为`'off'` |

**↑ back to:** [Prompt types](#-types)

---

### select(message, choices, [initial], [hint], [warn]) {#selectmessage-choices-initial-hint-warn}

> 交互式选项提问。

使用 <kbd>up</kbd>/<kbd>down</kbd> 进行导航，使用 <kbd>tab</kbd> 循环列表。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/select.gif" alt="select prompt" width="499" height="130" />

```js
{
  type: 'select',
  name: 'value',
  message: 'Pick a color',
  choices: [
    { title: 'Red', description: 'This option has a description', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff' }
  ],
  initial: 1
}
```

#### Options

| Param   |   Type   | Description                                                                                                             |
| ------- | :------: | ----------------------------------------------------------------------------------------------------------------------- |
| hint    | `string` | 为用户显示一些提示信息                                                                                                  |
| warn    | `string` | 当单独选中选项被禁用时，为用户显示的一些警告信息                                                                        |
| choices | `Array`  | 字符串或choices对象数组 `[{ title, description, value, disabled }, ...]`， 如果未指定，将使用数组中选择项的索引为其值。 |

**↑ back to:** [Prompt types](#-types)

---

### multiselect(message, choices, [initial], [max], [hint], [warn]) {#multiselectmessage-choices-initial-max-hint-warn}

### autocompleteMultiselect(same)

> 交互式多选提问。

> 自动搜索是一个可搜索的多选项提问，具有相同的选项。对于长列表很有用。

使用 <kbd>space</kbd> to toggle select/unselect and <kbd>up</kbd>/<kbd>down</kbd> 进行导航，使用 <kbd>tab</kbd> 循环列表。你也能使用 <kbd>right</kbd> 来选择， <kbd>left</kbd> 来取消选择。
默认情况下这种提问返回一个包含选择物品的`array`，而不是只包含选择物品的标题（title）。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/multiselect.gif" alt="multiselect prompt" width="499" height="130" />

```js
{
  type: 'multiselect',
  name: 'value',
  message: 'Pick colors',
  choices: [
    { title: 'Red', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff', selected: true }
  ],
  max: 2,
  hint: '- Space to select. Return to submit'
}
```

#### Options

| Param          |         Type          | Description                                                                                                             |
| -------------- | :-------------------: | ----------------------------------------------------------------------------------------------------------------------- |
| instructions   | `string` or `boolean` | 显示提问介绍。                                                                                                          |
| choices        |        `Array`        | 字符串或choices对象数组 `[{ title, description, value, disabled }, ...]`， 如果未指定，将使用数组中选择项的索引为其值。 |
| optionsPerPage |       `number`        | 每页显示的选项数量（默认为10）                                                                                          |
| min            |       `number`        | 最小的选择数量，为负数时将显示错误。                                                                                    |
| max            |       `number`        | 最大的选择数量。                                                                                                        |
| hint           |       `string`        | 为用户显示一些提示信息                                                                                                  |
| warn           |       `string`        | 当单独选中选项被禁用时，为用户显示的一些警告信息                                                                        |

这是少数不接受初始值（initial）的提问之一。

如果你想要预定义选中的值，需要给选择对象一个`selected`属性为`true`即可。

**↑ back to:** [Prompt types](#-types)

---

### autocomplete(message, choices, [initial], [suggest], [limit], [style]) {#autocompletemessage-choices-initial-suggest-limit-style}

> 交互式自动完成提问。

此提问将基于用户输入显示列表选项，键入以筛选列表。
使用 <kbd>⇧</kbd>/<kbd>⇩</kbd> 进行导航，使用 <kbd>tab</kbd> 循环结果。使用 <kbd>Page Up</kbd>/<kbd>Page Down</kbd> (on Mac: <kbd>fn</kbd> + <kbd>⇧</kbd> / <kbd>⇩</kbd>)来切换页面（只有当页面不够显示所有选项时才会分出多个页面）。敲击 <kbd>enter</kbd> 显示提问下面凸出高亮显示的选项。

默认用户输入后下方选项排序算法的函数（`suggest`）是根据其choices中的`title`来排列。
你可以通过自己的算法函数来覆盖筛选选项的方式。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/autocomplete.gif" alt="auto complete prompt" width="499" height="163" />

```js
{
  type: 'autocomplete',
  name: 'value',
  message: 'Pick your favorite actor',
  choices: [
    { title: 'Cage' },
    { title: 'Clooney', value: 'silver-fox' },
    { title: 'Gyllenhaal' },
    { title: 'Gibson' },
    { title: 'Grant' }
  ]
}
```

#### Options

| Param      |    Type    | Description                                                             |
| ---------- | :--------: | ----------------------------------------------------------------------- |
| choices    |  `Array`   | 自动完成类型的提问choices对象数组： `[{ title, value }, ...]`           |
| suggest    | `function` | 过滤函数，默认通过`title`属性进行排序。 `suggest` 应该总是返回promise。 |
| limit      |  `number`  | 最大显示选项的数量，默认为`10`                                          |
| clearFirst | `boolean`  | 键盘上第一个ESCape键将清楚用户输入                                      |
| fallback   |  `string`  | 未找到匹配项时的回退消息。 如果提供，默认为`initial`提供的值            |

排序算法函数（`suggest`）可能看起来像这个样子：

```js
const suggestByTitle = (input, choices) =>
  Promise.resolve(
    choices.filter((i) => i.title.slice(0, input.length) === input),
  );
```

**↑ back to:** [Prompt types](#-types)

---

### date(message, [initial], [warn]) {#datemessage-initial-warn}

> 交互式日期提问。

使用 <kbd>left</kbd>/<kbd>right</kbd>/<kbd>tab</kbd> 进行导航，使用 <kbd>up</kbd>/<kbd>down</kbd> 更改日期。

#### Example

<img src="https://github.com/terkelg/prompts/raw/master/media/date.gif" alt="date prompt" width="499" height="103" />

```js
{
  type: 'date',
  name: 'value',
  message: 'Pick a date',
  initial: new Date(1997, 09, 12),
  validate: date => date > Date.now() ? 'Not in the future' : true
}
```

#### Options

| Param   |   Type   | Description                                                                                      |
| ------- | :------: | ------------------------------------------------------------------------------------------------ |
| locales | `object` | 用于定义自定义区域设置，请看以下案例。                                                           |
| mask    | `string` | The format mask of the date. See below for more information.<br />Default: `YYYY-MM-DD HH:mm:ss` |

默认区域设置:

```javascript
{
  months: [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  weekdays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ],
  weekdaysShort: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ]
}
```

> **格式化**: 请看完整的格式化列表[wiki](https://github.com/terkelg/prompts/wiki/Date-Time-Formatting)

![split](./split.png)

**↑ back to:** [Prompt types](#-types)

---

## ❯ 许可证 {#-license}

MIT © [Terkel Gjervig](https://terkel.com)
