# 环境信息

相关环境信息移步上一篇文章

## push - Error - requested access to the resource is denied {#push-error}

我输入了以下命令出现了这个问题：
::: details

- 登录

```
docker login -u 57878778
```

- 检测镜像是否存在

```txt{1}
docker images
REPOSITORY                    TAG       IMAGE ID       CREATED             SIZE
57878778/my-node-api-server   0.0.1     feb0b37582f2   About an hour ago   879MB
arm64v8/wordpress             latest    4fdf74a22ef3   12 days ago         617MB
```

- push 镜像

```txt{1}
docker push 57878778/my-node-api-server:0.0.1
The push refers to repository [docker.io/57878778/my-node-api-server]
f00e5d165562: Preparing
5f70bf18a086: Preparing
5eada74799ec: Preparing
a5aab4ef2924: Preparing
cddf35cb6ae2: Preparing
a7bd3b95df7a: Waiting
7d959d2ac57e: Waiting
c8665ae99a56: Waiting
09c75e967e1a: Waiting
52d2e6951bb8: Waiting
e3fb8318971a: Waiting
9f9478778cf5: Waiting
denied: requested access to the resource is denied  // [!code error]
```

:::

解决方法：

1. 首先找到 `docker` 的本地数据文件夹，并删除 `config.json` 文件

不同系统所对应路径：

`Windows`: `C:/Users/Username/.docker/`

`Mac`: `~/.docker/`

`Linux`: `~/.docker/`

2. 重新登录 `docker` 用户

```
docker login -u 57878778 --email 57878778@qq.com docker.io
```

3. 再次执行 `push`

```
docker push 57878778/my-node-api-server:0.0.1
```

## push - retying - eof

> 出现eof的原因是因为 `docker hub` 中并没有创建此个人仓库，所以在推送新的库之前应当先创建

![Alt text](/docker/push-eof.png)
