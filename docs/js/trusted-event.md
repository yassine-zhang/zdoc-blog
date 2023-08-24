# Trusted Event
&nbsp;&nbsp;`Trusted` 受信任是一种在浏览器事件内实行的一种安全验证方式。开发者可以根据其返回的 `boolean` 值来判断当前事件操作是否安全，从而继续执行后面代码。

## Trusted 验证原则
- 用户触发的事件返回 `true`, 程序触发的事件返回 `false`
- `Trusted` 对应的属性值是只读的，不可修改
::: warning
目前得知只有使用proxy才可以修改 `Trusted` 所对应的属性值（`e.isTrusted`），但是修改后在最后调用 `dispatchEvent` 并不能通过验证并报错。
:::

## 用户事件触发
```vue{2,5}
<template>  // [!code focus]
    <el-button type="warning" round @click="handle_click">Test-Trusted</el-button>  // [!code focus]
</template>  // [!code focus]
<script setup lang="ts">
const handle_click = (e: Event) => console.log(e.isTrusted)  // [!code focus]
</script>
```
这个时候可以看到，当我们点击按钮时返回的是true，说明用户事件触发已经通过了 `Trusted`

## 程序触发
调用 `onMounted` 钩子时表示我们页面上元素已经渲染成功，这时我们通过程序模拟点击
```js
onMounted(() => {
    const event = new MouseEvent('click')
    const target = document.querySelector('button')
    target?.addEventListener('click', e => console.log('Program: ' + e.isTrusted))
    target?.dispatchEvent(event)
})
```
经过模拟后返回的结果：
```
Program: false
```

## Proxy 强制修改 isTrusted
```js{5,9,11,15}
const event = new MouseEvent('click')
const target = document.querySelector('button')
const handler = {
    get(obj: any, prop: string) {
        if (prop === 'isTrusted') return true
        return Reflect.get(obj, prop)
    }
}
const proxy:Event = new Proxy(event, handler)

console.log('proxy-isTrusted:' + proxy.isTrusted) // proxy-isTrusted:true


// TypeError: Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.
target?.dispatchEvent(proxy)

// success
target?.dispatchEvent(event)
```
- 代理可以强制修改只读属性 `isTrusted`，但是在调用 `dispatchEvent` 时会突然报错
- 普通调用 `dispatchEvent` 虽然正常，但是无法修改 `isTrusted` 属性

## 总结
只要在程序触发事件时对 `isTrusted` 进行简单判断就可以分辨出用户的操作是否安全。 
