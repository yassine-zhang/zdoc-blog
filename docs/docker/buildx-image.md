---
aside: true
---

# docker buildx

`docker buildx`是一个Docker的构建工具，它可以帮助你在多个平台上构建和测试镜像。它使用了一种称为BuildKit的高级构建引擎来提供更快、更可靠和更安全的构建过程。

使用`docker buildx`命令，你可以创建和管理多个构建器（builder），这些构建器可以构建多个平台的镜像。通过使用构建器，你可以同时构建各种不同版本的镜像，然后将它们发布到Docker Hub或私有镜像仓库中。

`docker buildx`还支持以模拟器的方式在本地构建针对其他架构的镜像，这对于开发、测试和调试跨平台应用程序非常有用。

以下是`docker buildx`常用命令：

- `docker buildx build`：使用当前构建器构建镜像。
- `docker buildx prune`：删除当前构建器因构建所造成的缓存。
- `docker buildx create`：创建新的构建器。
- `docker buildx ls`：列出所有可用的构建器。
- `docker buildx use`：切换到指定的构建器。
- `docker buildx inspect`：显示当前构建器的详细信息。

https://github.com/docker/buildx

## dockerfile

如果要 `build` 镜像，那么必要的前提是需要有一个Dockerfile文件来记录一些信息，此文件一般放在项目根目录。

正如下所示Dockerfile文件案例，是一个用Nodejs跑起来的后端API项目

> 我们最好使用基于alpine系统构建的镜像，因为alpine linux是一个极小的系统，在此基础上运行程序对于一些小企业个人开发者还可以接受。

::: details docker exec小插曲
Docker中构建的镜像在运行容器后就像一个虚拟机，你也可以轻松使用docker exec进入容器内部做一些操作，像NodeJS后端项目如果我们想查看它的控制台输出信息可直接使用docker logs <container/container-id>的形式。

如果要通过可交互shell的方式进入容器内部可以使用命令：docker exec -it <container/container-id> /bin/sh

Docker官方提供了多个Node镜像，每个镜像都基于不同的Linux系统构建。目前，最常用的是基于Alpine Linux和Debian的Node镜像。

1. 基于Alpine Linux的Node镜像：Alpine Linux是一个轻量级的Linux发行版，非常适合作为Docker容器的基础。它具有小巧、高度安全和快速启动的特点。基于Alpine Linux构建的Node镜像通常使用Alpine版本的Node.js运行时环境。

2. 基于Debian的Node镜像：Debian是一个广泛使用的Linux发行版，也是许多Docker镜像的默认选择之一。基于Debian构建的Node镜像通常使用Debian版本的Node.js运行时环境。

> Alpine默认shell是sh shell，而Debian默认shell是bash shell.

:::

```shell
# 这里node环境版本建议与本地开发环境版本一致，否则版本过低会出现部分语法不支持，无法在服务端跑通
# node:20-alpine3.17适用于轻量级容器化的 Alpine Linux 版本的 Node.js 镜像
FROM node:20-alpine3.17

# 创建一个app目录，将dockerfile文件所在目录所有文件添加到app
ADD . /app

# 设置容器启动后的默认运行目录
WORKDIR /app

# 运行命令，安装依赖（会在build时执行此操作，避免本地项目中.node_modules删除了的情况）
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
# 安装本地依赖环境，更改东八CST-8时区
# 如果宿主机无法访问外网，可以替换国内apk源：
# https://juejin.cn/post/6854573214698307597
RUN npm install \
    && apk add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app && ./start.sh
# 这一行会在容器运行时去执行，也相当于启动服务
CMD node indx.js
```

## build

当你使用`docker buildx build`命令时，你可以传递许多选项来配置构建过程。以下是`docker buildx build`命令的一些常用选项和其详细使用方法：

```shell
docker buildx build [OPTIONS] -t <image-tag> <path to context>
```

- `-t, --tag list`：为构建的镜像指定一个或多个标签。
  - 示例：`docker buildx build -t myimage:latest .`
- `--platform list`：指定要构建的目标平台，可以是单个平台或多个平台。
  - 示例：`docker buildx build --platform linux/amd64,linux/arm64 -t myimage:latest .`
- `--push`：构建完成后将镜像推送到注册表。
  - 示例：`docker buildx build --push -t myusername/myimage:latest .`
- `--no-cache`：禁用构建缓存，强制重新构建镜像。
  - 示例：`docker buildx build --no-cache -t myimage:latest .`
- `--progress plain|tty|plain`：设置构建输出的显示方式。
  - 示例：`docker buildx build --progress=plain -t myimage:latest .`
- `--build-arg list`：设置构建参数，可以在 Dockerfile 中使用。
  - 示例：`docker buildx build --build-arg VERSION=1.0 -t myimage:latest .`

这些选项只是`docker buildx build`命令中的一部分，实际上还有更多选项可供选择。你可以通过`docker buildx build --help`来查看完整的选项列表和详细的使用说明。

https://github.com/docker/buildx/blob/master/docs/reference/buildx_build.md

---

::: tip
如果您是使用的 `Windows` 或 `Mac` 系统那么 `docker buildx` 已经绑定到 Docker Desktop 中无需手动下载并创建构建器。

我们不需要了解其他buildx相关命令，只掌握build即可。
:::

### only build

这个桌面程序会为我们创建一个名为 `desktop-linux` 的构建器并使用。

构建后可以在本地 docker 镜像中查到，下面将通过使用此构建器来搭建：

```shell
docker buildx build --platform linux/amd64 -t username/myimage:latest .
```

### build & push

更常用的做法是添加 `--push` 参数，像这样它会构建后在本地留下的同时将镜像推送到registry

```shell
docker buildx build --push --platform linux/amd64 -t myregistry.com/myimage:latest .
```

上面做法需要留意`-t`参数的值`myregistry.com`可以是HTTP或HTTPS两种协议都可以，但是如果是HTTP不安全协议的时候需要在`daemon.json`中配置`insecure-registries`

[China mirror]: https://zhuanlan.zhihu.com/p/460489756

- 在Mac系统中使用命令`cat ~/.docker/daemon.json`，查看`daemon.json`文件配置信息。
- 如果挂了VPN，建议使用下面官方镜像，不知道怎么回事国内镜像不稳定，之前一直pull不下来，换了官网镜像才解决这个问题。
- 要使用国内镜像请查看：[China mirror]。

```json
{
  ...,
  "insecure-registries": [
    "110.242.68.66:5000"
  ],
  "registry-mirrors": [
    "https://hub.docker.com/"
  ]
}
```

### note

:::tip
在使用 `-t`或`--tag` 指定名字的时候有几个原则

镜像推送有几个准则请看如下列出：

1. 不补充tag，默认`latest`，例如：`myregistry.com/myimage`；
2. 镜像名开头写Docker Hub中用户名，会推送至Docker Hub公用仓库，例如：`57878778/myimage:latest`；
3. 镜像名开头写搭建的私有库地址或以ip:port形式，会推送到私有仓库中，但同时也会遵守配置规则，默认不允许推送非HTTPS地址仓库，需配置`insecure-registries`，例如：`myregistry.com/myimage:latest`。

照顾到新手科普一下，HTTP协议端口为80，HTTPS端口为443。
:::
