# JS获取元素真实样式

> 以下使用元素宽度作比喻，其他元素样式同理。

## 获取元素实时宽度值

如果一个元素的宽度正在过渡，您可以使用 JavaScript 中的 getComputedStyle 函数获取其实时的宽度值。

## 为什么不用style.width

.style.width 是 JavaScript 中用于获取或设置元素内联样式（inline style）中的宽度属性值的方法。但是，当元素的宽度正在过渡时，.style.width 返回的是最终的目标宽度值，而不是过渡期间的实时宽度值。
