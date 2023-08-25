# XSS 注入
XSS 注入是一种前端非法向页面嵌入可执行 `script` 的一种手段，我们可以通过转义来解决这一问题。

## 简单复现 XSS 注入
我通过使用Vue框架复现了这一情况（实际上纯原生会更直观）
```vue
<template>
    <el-input v-model="input" placeholder="Please input" /><br>  // [!code focus]
    <el-card class="box-card">
        <div v-html="input"></div>  // [!code focus]
    </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const input = ref('')
</script>
```

::: details 点击展开预览效果图
![Alt text](/md_png/js/xss.png)

经典输入案例：`<button onClick='console.log("XSS");'>Example</button>`
:::

## 转义解决问题
>我在Vue中通过 `v-html` 努力复刻这一漏洞，实际上Vue通过双花括号输入的内容都可以解决这种问题

我这里使用一个HTML转义插件来快速解决这一问题（实际上也是通过正则表达式检测内容并替换）

::: details html-escaper插件详细使用
- 首先使用npm命令安装下面插件
```
npm i html-escaper
npm i --save-dev @types/html-escaper
```

- 简单调用方法：
```ts
// *.d.ts
declare module 'html-escaper';

import {escape, unescape} from 'html-escaper';

escape('string');
unescape('escaped string');
```
:::

最终解决：
```vue
<template>
    <el-input v-model="input" placeholder="Please input" /><br>
    <el-card class="box-card">
        <div v-html="input"></div>  // [!code --]
        <div v-html="escape(input)"></div>  // [!code ++]
    </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { escape } from 'html-escaper';  // [!code ++]

const input = ref('')
</script>
```
::: details 效果图
![Alt text](/md_png/js/xss_2.png)
:::
