# 错误汇总
>首先我将详细描述我的开发环境，如有类似可以往下看
```
System: MacOS 13.4.1 (c) (22F770820d)

docker version
Client:
 Cloud integration: v1.0.35-desktop+001
 Version:           24.0.5
 API version:       1.43
 Go version:        go1.20.6
 Git commit:        ced0996
 Built:             Fri Jul 21 20:32:30 2023
 OS/Arch:           darwin/arm64
 Context:           default

Server: Docker Desktop 4.22.1 (118664)
 Engine:
  Version:          24.0.5
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.6
  Git commit:       a61e2b4
  Built:            Fri Jul 21 20:35:38 2023
  OS/Arch:          linux/arm64
  Experimental:     false
 containerd:
  Version:          1.6.21
  GitCommit:        3dce8eb055cbb6872793272b4f20ed16117344f8
 runc:
  Version:          1.1.7
  GitCommit:        v1.1.7-0-g860f061
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

## push - Error - requested access to the resource is denied {#push-error}
我输入了以下命令出现了这个问题：
::: details
- 登录
```
docker login -u 57878778
```
- 检测镜像是否存在
```
docker images
REPOSITORY                    TAG       IMAGE ID       CREATED             SIZE
57878778/my-node-api-server   0.0.1     feb0b37582f2   About an hour ago   879MB
arm64v8/wordpress             latest    4fdf74a22ef3   12 days ago         617MB
```
- push 镜像
```
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
denied: requested access to the resource is denied
```
:::

解决方法：
1. 首先找到 `docker` 的本地数据文件夹，并删除 `config.json` 文件

不同系统所对应路径：

`Windows`: `C:/users/username/.docker/`

`Mac`: `/users/username/.docker/`

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
当你执行 `docker push` 命令时，如果遇到 "retrying eof" 的错误消息，则表明在将镜像推送到 Docker Hub 或其他仓库时出现了网络问题。这通常是由于网络连接不稳定或传输过程中出现错误导致的。

在国内如果暂时没有找到稳定的梯子那么只能不断执行 `push` 来提升进度

就像我下面这样,至少推了10次才成功
```
docker push 57878778/my-node-api-server:0.0.1
The push refers to repository [docker.io/57878778/my-node-api-server]
f00e5d165562: Pushed 
5f70bf18a086: Pushed 
5eada74799ec: Layer already exists 
a5aab4ef2924: Layer already exists 
cddf35cb6ae2: Layer already exists 
a7bd3b95df7a: Layer already exists 
7d959d2ac57e: Layer already exists 
c8665ae99a56: Layer already exists 
09c75e967e1a: Layer already exists 
52d2e6951bb8: Layer already exists 
e3fb8318971a: Pushed 
9f9478778cf5: Layer already exists 
0.0.1: digest: sha256:aa1d92b25eff554e7ca35b7b5c3578563975bd4d1f3ff7aa07d5d3f104e63cdb size: 2842
```
国内大厂也有提供容器镜像服务，可以快速`push pull`，但我并未找到免费的
