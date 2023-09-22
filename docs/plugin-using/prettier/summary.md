# Prettier

**什么是Prettier?**

1. 固执己见的代码格式化程序
2. 支持多种语言
3. 与大多数编辑器集成
4. 另外还有一些特色etc...

---

- 首先将`Prettier`安装到本地

```shell
npm install --save-dev --save-exact prettier
```

- 然后创建一个空的配置文件，让编译器和其他工具知道你正在使用`prettier`
  ::: warning
  调用`node -e|--eval run-script`可以执行node环境下一些函数
  :::

```shell
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

&nbsp;&nbsp;如果写入`{}`为空，默认是使用`Prettier`官方标准的配置信息来格式化，也可以手动写入需要的或进入`Prettier`官网[Playground](https://prettier.io/playground/)进行配置后点击左下角`Copy config Json`将json拷贝到`.prettierrc`中

- 下一步，创建一个`.prettierignore`文件让 `Prettier CLI` 和编译器知道哪些文件不需要格式化。这里有一个案例：

```
# prettier doesn't respect newlines between chained methods
# https://github.com/prettier/prettier/issues/7884
**/*.spec.js
**/*.spec.ts
**/dist
# https://github.com/prettier/prettier/issues/5246
**/*.html
```

---

用`Prettier`格式化所有文件

```shell
npx prettier . --write
```

用`Prettier`检查所有文件是否格式化

```shell
npx prettier . --check
```

`--check`很像`--write`但它只是检查文件是否格式化
