# docker-cheat-sheet

| Description                        |   Syntax&Error                                                    |
| ---------------------------------- | ----------------------------------------------------------------- |
| 从容器仓库拉取镜像到本地 | docker pull ubuntu |
| 从容器仓库拉取镜像到本地，指定版本号 | docker pull ubuntu:20.04 |
| ---------- | ---------- |
| 查看所有正在运行的容器 | docker ps |
| 查看所有容器（包含已停止的） | docker ps -a |
| ---------- | ---------- |
| 删除容器 | docker rm &#60;container-id&#62; |
| 强制删除容器（容器正在运行） | docker rm -f &#60;container-id&#62; |
| 删除多个容器 | docker rm &#60;container-id-1&#62; &#60;container-id-2&#62; &#60;container-id-3&#62; |
| 删除所有已停止的容器 | docker container prune |
| ---------- | ---------- |
| 使用镜像新建并运行容器 | docker run [OPTIONS] IMAGE [COMMAND] [ARG...] |
| [COMMAND] [ARG...] 是可选的命令和参数，用于在容器内执行特定的操作。如果未指定任何命令，则容器将启动并立即停止。 | [OPTIONS] 是一组可选的选项，用于配置容器的各种参数，例如端口映射、数据卷挂载等。以下是一些常用的选项： |
| &nbsp;&nbsp;-d：将容器作为后台进程（守护进程）运行。对于一些更需要看到输出信息的后端程序来说这一条参数可以忽视。 | |
| &nbsp;&nbsp;-v：将主机目录或文件夹挂载到容器内部的目录或文件夹。 | |
| &nbsp;&nbsp;-p：将主机端口映射到容器端口。 | |
| &nbsp;&nbsp;--name：为容器指定一个名称。 | |
| ---------- | ---------- |
| 启动指定 ID 的容器 | docker start &#60;container_id&#62; |
| 停止指定 ID 的容器 | docker stop &#60;container_id&#62; |
| 重新启动指定 ID 的容器 | docker restart &#60;container_id&#62; |
| ---------- | ---------- |
| 查看容器的日志 | docker logs my-nginx |
| 清除容器log | docker stop &#60;container_id&#62; <br/> rm /var/lib/docker/containers/&#60;container_id&#62;/*-json.log <br/> docker start &#60;container_id&#62; |
| ---------- | ---------- |
| 进入正在运行的容器内部进行操作 - 语法 | docker exec [选项] &#60;容器名或容器ID&#62; &#60;命令&#62; |
| &nbsp;&nbsp;[选项] 是可选的，可以用来指定一些参数，比如 -it 参数可以让命令在交互模式下运行。 |  |
| &nbsp;&nbsp;&#60;容器名或容器ID&#62; 是要进入的容器的名称或 ID。 | |
| &nbsp;&nbsp;&#60;命令&#62; 是要在容器内部执行的命令。 | |
| 例如，要进入名为 mycontainer 的容器，并在其中执行 /bin/bash 命令，可以执行以下命令： | docker exec -it mycontainer /bin/bash |
| 这将在交互模式下进入容器，并启动一个新的 shell，使您可以在容器内部执行命令和操作。 | 请注意，在执行 docker exec 命令之前，请确保容器已经在运行状态，否则该命令将会失败。如果您需要在容器启动时就进入容器内部进行操作，可以使用 docker run 命令的 -it 参数来创建一个交互式容器。 |
| ---------- | ---------- |
| 文件双向拷贝（容器必须正在运行） - 语法 | docker cp ... |
| 从宿主机拷贝到容器内部（要将宿主机上的 file.txt 文件拷贝到名为 mycontainer 的容器的 /data 目录中） | docker cp file.txt mycontainer:/data |
| 从容器内部拷贝到宿主机（要将名为 mycontainer 的容器中的 /app/log.txt 文件拷贝到宿主机的当前目录） | docker cp mycontainer:/app/log.txt . |
| ---------- | ---------- |
| 镜像添加标签 - 语法 | docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG] |
| 给镜像添加标签 | docker tag my_image my_repository/my_image:my_tag |
| 给镜像重新添加默认 latest 标签(这将为名为 my_image 的本地镜像添加一个名为 latest 的标签，并将其更名为 `my_repository/my_image:latest`) | docker tag my_image my_repository/my_image |
| 为已有标签添加新的名称(这将创建一个新的标签 my_new_tag，并将其与已有的 `my_repository/my_image:my_tag` 镜像关联起来。) | docker tag my_repository/my_image:my_tag my_repository/my_image:my_new_tag |
| 添加标签的疑惑问题：为镜添加新标签后会多出一个镜像，那么删除原镜像后新镜像能否正常使用 | 镜像之间是相互独立的，删除原镜像不影响新镜像使用 |
| ---------- | ---------- |
| docker服务开机自启动 | systemctl enable docker |
| 容器自启动（每当docker服务启动时自动启动容器） | docker run --restart=always ... |
| ---------- | ---------- |
| 删除镜像(私有仓库同理，只需要将镜像改成repository/image:tag) | docker rmi ... |
| 使用docker rmi命令删除指定的镜像 | docker rmi my-repo:v1.0 |
| 删除多个标签的镜像，可以同时指定多个标签名 | docker rmi my-repo:v1.0 my-repo:v2.0 |
| 删除指定仓库下所有镜像，可以使用docker rmi命令加上-f选项 | docker rmi -f $(docker images my-repo -q) |



## 参考文献 {#reference}
[Docker快速入门](https://docker.easydoc.net/doc/81170005/cCewZWoN/lTKfePfP)

[Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
