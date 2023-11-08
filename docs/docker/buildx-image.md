# 构建镜像

如果要 `build` 镜像，那么必要的前提是需要有一个Dockerfile文件来记录一些信息

正如下所示Dockerfile文件案例，是一个用Nodejs跑起来的后端API项目

> 我们基础的镜像最好使用`image:tag-alpine3.17`，因为alpine linux是一个极小的系统，在此基础上运行node对于一些小企业个人开发者还算能接受，不然每次构建都能照成1个G谁也不想吧。

Docker中构建的镜像在运行容器后就像一个虚拟机，你也可以轻松使用docker exec进入容器内部做一些操作，像NodeJS后端项目如果我们想查看它的控制台输出信息可直接使用docker logs <container/container-id>的形式。

如果要通过可交互shell的方式进入容器内部可以使用命令：docker exec -it <container/container-id> /bin/sh

::: details 注意！
Docker官方提供了多个Node镜像，每个镜像都基于不同的Linux系统构建。目前，最常用的是基于Alpine Linux和Debian的Node镜像。

1. 基于Alpine Linux的Node镜像：Alpine Linux是一个轻量级的Linux发行版，非常适合作为Docker容器的基础。它具有小巧、高度安全和快速启动的特点。基于Alpine Linux构建的Node镜像通常使用Alpine版本的Node.js运行时环境。

2. 基于Debian的Node镜像：Debian是一个广泛使用的Linux发行版，也是许多Docker镜像的默认选择之一。基于Debian构建的Node镜像通常使用Debian版本的Node.js运行时环境。

> Alpine默认shell是sh shell，而Debian默认shell是bash shell.

:::

```Dockerfile
# 这里node环境版本建议与本地开发环境版本一致，否则版本过低会出现部分语法不支持，无法在服务端跑通
# node:20-alpine3.17适用于轻量级容器化的 Alpine Linux 版本的 Node.js 镜像
FROM node:20-alpine3.17

# 标签信息，格式key=value，加不加无所谓
LABEL author="zhangsir"

# 复制代码，创建一个app目录，将代码移动到目录中
ADD . /app

# 设置容器启动后的默认运行目录
WORKDIR /app

# 运行命令，安装依赖（会在build时执行此操作，避免本地项目中.node_modules删除了的情况）
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
RUN npm install --registry=https://registry.npm.taobao.org

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app && ./start.sh
# 这一行会在容器运行时去执行，也相当于启动服务
CMD node indx.js
```

对于 `Dockerfile` 文件要写那么位置我建议最好放在项目根目录

接下来我们构建 `linux/amd64` 平台镜像，代码如下
![Buildx](/docker/Docker-Buildx.svg)

```bash{1}
docker buildx build --platform linux/amd64 -t 57878778/node-api-amd64:0.0.2 .   // [!code focus]
[+] Building 2.8s (10/10) FINISHED                                                                                                     docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                   0.0s
 => => transferring dockerfile: 720B                                                                                                                   0.0s
 => [internal] load .dockerignore                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                        0.0s
 => [internal] load metadata for docker.io/library/node:11                                                                                             2.7s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                            0.0s
 => [internal] load build context                                                                                                                      0.1s
 => => transferring context: 128.79kB                                                                                                                  0.1s
 => [1/4] FROM docker.io/library/node:11@sha256:67ca28addce8ae818b144114a9376a6603aba09069b7313618d37b38584abba1                                       0.0s
 => CACHED [2/4] ADD . /app                                                                                                                            0.0s
 => CACHED [3/4] WORKDIR /app                                                                                                                          0.0s
 => CACHED [4/4] RUN npm install --registry=https://registry.npm.taobao.org                                                                            0.0s
 => exporting to image                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                0.0s
 => => writing image sha256:a090e6e1744d945870ae069d6a4082882293f9bd6dc50c4d2dc730066010b752                                                           0.0s
 => => naming to docker.io/57878778/node-api-amd64:0.0.2                                                                                               0.0s

```

查看本地镜像

```bash{1}
docker image ls     // [!code focus]
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
57878778/node-api-amd64     0.0.2     a090e6e1744d   26 minutes ago   931MB
57878778/node-api-arm64v8   0.0.2     1ee73ed3c96d   16 hours ago     879MB
57878778/node-api-amd64     0.0.1     07486af7f36d   26 hours ago     931MB
57878778/node-api-arm64v8   0.0.1     c6ec6ff3ddd0   26 hours ago     879MB
mysql                       latest    bdfb0ec4d54a   2 weeks ago      599MB
```

::: tip
同一仓库构建镜像是可以多个平台的，更多信息请看下面中文文档
[https://yeasy.gitbook.io/docker_practice/buildx/multi-arch-images](https://yeasy.gitbook.io/docker_practice/buildx/multi-arch-images)

一般会在本地测试好后再通过本地Docker进行测试，没有问题再去构建，然后服务器那边下载
:::
