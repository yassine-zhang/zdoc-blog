# Alternate If Syntax

> 灵感来源于“策略模式”，本篇文章代码使用JS来写

## 策略模式 {#strategy}

<p>
    <img src="./strategy-2x.png" alt="strategy-2x" width="600" />
</p>

策略模式的大体概念：

<p>
    <img src="./route-strategy.png" alt="route-strategy" width="600" />
</p>

## 代码实现 {#code-example}

```js
  const resolve: Record<string, Function> = {
    false: () => {
      // console.log('用户的系统主题为黑暗');
    },
    true: () => {
      // console.log('用户的系统主题为光明');
    },
  };

  themeMode.value = !(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  resolve[themeMode.value.toString()]();
```

<p align="right">本篇文章阅读大概用时：1min</p>
