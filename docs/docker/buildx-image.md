# 构建镜像
如果要 `build` 镜像，那么必要的前提是需要有一个Dockerfile文件来记录一些信息

正如下所示Dockerfile文件案例，是一个用Nodejs跑起来的后端API项目
```Dockerfile
FROM node:11
# 标签信息，格式key=value
LABEL author="zhangsir" 

# 复制代码
ADD . /app

# 设置容器启动后的默认运行目录
WORKDIR /app

# 运行命令，安装依赖
# RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
# 例如 RUN npm install && cd /app && mkdir logs
RUN npm install --registry=https://registry.npm.taobao.org

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app && ./start.sh
CMD node app.js
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
:::