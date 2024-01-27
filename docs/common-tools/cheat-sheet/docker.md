# docker-cheat-sheet

| Description                                                                                       | Syntax&Error                                                                                                                                        |
|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| docker服务开机自启动                                                                                     | systemctl enable docker                                                                                                                             |
| 容器自启动（每当docker服务启动时自动启动容器）                                                                        | docker run --restart=always ...                                                                                                                     |
| ----------                                                                                        | ----------                                                                                                                                          |
| 从容器仓库拉取镜像到本地                                                                                      | docker pull ubuntu                                                                                                                                  |
| 从容器仓库拉取镜像到本地，指定版本号                                                                                | docker pull ubuntu:20.04                                                                                                                            |
| ----------                                                                                        | ----------                                                                                                                                          |
| 查看所有正在运行的容器                                                                                       | docker ps                                                                                                                                           |
| 查看所有容器（包含已停止的）                                                                                    | docker ps -a                                                                                                                                        |
| ----------                                                                                        | ----------                                                                                                                                          |
| 删除容器                                                                                              | docker rm &#60;container-id&#62;                                                                                                                    |
| 强制删除容器（容器正在运行）                                                                                    | docker rm -f &#60;container-id&#62;                                                                                                                 |
| 强制删除容器并在删除时移除数据卷                                                                                  | docker rm -f -v &#60;container-id&#62;                                                                                                              |
| 删除多个容器                                                                                            | docker rm &#60;container-id-1&#62; &#60;container-id-2&#62; &#60;container-id-3&#62;                                                                |
| 删除所有已停止的容器                                                                                        | docker container prune                                                                                                                              |
| ----------                                                                                        | ----------                                                                                                                                          |
| 使用镜像新建并运行容器                                                                                       | docker run [OPTIONS] IMAGE [COMMAND] [ARG...]                                                                                                       |
| [COMMAND] [ARG...] 是可选的命令和参数，用于在容器内执行特定的操作。如果未指定任何命令，则容器将启动并立即停止。                                 | [OPTIONS] 是一组可选的选项，用于配置容器的各种参数，例如端口映射、数据卷挂载等。以下是一些常用的选项：                                                                                            |
| &nbsp;&nbsp;-d：将容器作为后台进程（守护进程）运行。对于一些更需要看到输出信息的后端程序来说这一条参数可以忽视。                                   |                                                                                                                                                     |
| &nbsp;&nbsp;-v：将主机目录或文件夹挂载到容器内部的目录或文件夹。                                                           |                                                                                                                                                     |
| &nbsp;&nbsp;-p：将主机端口映射到容器端口。                                                                      |                                                                                                                                                     |
| &nbsp;&nbsp;--name：为容器指定一个名称。                                                                     |                                                                                                                                                     |
| ----------                                                                                        | ----------                                                                                                                                          |
| 启动指定 ID 的容器                                                                                       | docker start &#60;container_id&#62;                                                                                                                 |
| 停止指定 ID 的容器                                                                                       | docker stop &#60;container_id&#62;                                                                                                                  |
| 重新启动指定 ID 的容器                                                                                     | docker restart &#60;container_id&#62;                                                                                                               |
| ----------                                                                                        | ----------                                                                                                                                          |
| 查看容器的日志                                                                                           | docker logs my-nginx                                                                                                                                |
| 清除容器log                                                                                           | docker stop &#60;container_id&#62; <br/> rm /var/lib/docker/containers/&#60;container_id&#62;/\*-json.log <br/> docker start &#60;container_id&#62; |
| ----------                                                                                        | ----------                                                                                                                                          |
| 进入正在运行的容器内部进行操作 - 语法                                                                              | docker exec [选项] &#60;容器名或容器ID&#62; &#60;命令&#62;                                                                                                    |
| &nbsp;&nbsp;[选项] 是可选的，可以用来指定一些参数，比如 -it 参数可以让命令在交互模式下运行。                                          |                                                                                                                                                     |
| &nbsp;&nbsp;&#60;容器名或容器ID&#62; 是要进入的容器的名称或 ID。                                                    |                                                                                                                                                     |
| &nbsp;&nbsp;&#60;命令&#62; 是要在容器内部执行的命令。                                                            |                                                                                                                                                     |
| 例如，要进入名为 mycontainer 的容器，并在其中执行 /bin/bash 命令，可以执行以下命令：                                            | docker exec -it mycontainer /bin/bash                                                                                                               |
| 这将在交互模式下进入容器，并启动一个新的 shell，使您可以在容器内部执行命令和操作。                                                      | 请注意，在执行 docker exec 命令之前，请确保容器已经在运行状态，否则该命令将会失败。如果您需要在容器启动时就进入容器内部进行操作，可以使用 docker run 命令的 -it 参数来创建一个交互式容器。                                        |
| ----------                                                                                        | ----------                                                                                                                                          |
| 文件双向拷贝（容器必须正在运行） - 语法                                                                             | docker cp ...                                                                                                                                       |
| 从宿主机拷贝到容器内部（要将宿主机上的 file.txt 文件拷贝到名为 mycontainer 的容器的 /data 目录中）                                  | docker cp file.txt mycontainer:/data                                                                                                                |
| 从容器内部拷贝到宿主机（要将名为 mycontainer 的容器中的 /app/log.txt 文件拷贝到宿主机的当前目录）                                    | docker cp mycontainer:/app/log.txt .                                                                                                                |
| ----------                                                                                        | ----------                                                                                                                                          |
| 镜像添加标签 - 语法                                                                                       | docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]                                                                                                    |
| 给镜像添加标签                                                                                           | docker tag my_image my_repository/my_image:my_tag                                                                                                   |
| 给镜像重新添加默认 latest 标签(这将为名为 my_image 的本地镜像添加一个名为 latest 的标签，并将其更名为 `my_repository/my_image:latest`) | docker tag my_image my_repository/my_image                                                                                                          |
| 为已有标签添加新的名称(这将创建一个新的标签 my_new_tag，并将其与已有的 `my_repository/my_image:my_tag` 镜像关联起来。)                | docker tag my_repository/my_image:my_tag my_repository/my_image:my_new_tag                                                                          |
| 添加标签的疑惑问题：为镜添加新标签后会多出一个镜像，那么删除原镜像后新镜像能否正常使用                                                       | 镜像之间是相互独立的，删除原镜像不影响新镜像使用                                                                                                                            |
| ----------                                                                                        | ----------                                                                                                                                          |
| 删除镜像(私有仓库同理，只需要将镜像改成repository/image:tag)                                                         | docker rmi ...                                                                                                                                      |
| 使用docker rmi命令删除指定的镜像                                                                             | docker rmi my-repo:v1.0                                                                                                                             |
| 删除多个标签的镜像，可以同时指定多个标签名                                                                             | docker rmi my-repo:v1.0 my-repo:v2.0                                                                                                                |
| 删除指定仓库下所有镜像，可以使用docker rmi命令加上-f选项                                                                | docker rmi -f $(docker images my-repo -q)                                                                                                           |
| ----------                                                                                        | ----------                                                                                                                                          |
| Compose组合容器                                                                                       | 注意：docker compose只能在含有该配置文件的同级目录下使用                                                                                                                 |
| 检查Docker Compose配置文件是否正确                                                                          | docker compose -f your-compose-file.yml config                                                                                                      |
| 在后台运行Compose容器                                                                                    | docker compose up -d                                                                                                                                |
| 启动/停止/重启Docker Compose                                                                            | docker compose start/stop/restart                                                                                                                   |
| 移除Docker Compose所有容器                                                                              | docker compose rm                                                                                                                                   |
| 在后台重新构建并启动服务（原有容器会删除）                                                                             | docker compose up -d --build                                                                                                                        |
| 在后台更新某个具体的服务（原有容器会删除）                                                                             | docker compose up -d --build &#60;service_name&#62;                                                                                                 |
| ----------                                                                                        | ----------                                                                                                                                          |
| Volume数据卷                                                                                         | 解决容器内部数据持久化的问题，可在不同容器之间使用，<br/>当数据卷为空时，挂载点内文件会复制到数据卷中，仅当数据卷为空时                                                                                      |
| 数据卷特点                                                                                             |                                                                                                                                                     |
| `数据卷` 可以在容器之间共享和重用                                                                                | 对 `数据卷` 的修改会立马生效                                                                                                                                    |
| 对 `数据卷` 的更新，不会影响镜像                                                                                | `数据卷` 默认会一直存在，即使容器被删除                                                                                                                               |
| 设置挂载点到容器某一目录实际上就是将使用mount占据某一位置，而非容器内部某一目录和数据卷之间独立。                                               | 操作容器内挂载点目录实际上就是操作数据卷                                                                                                                                |
| 创建数据卷                                                                                             | docker volume create my-vol                                                                                                                         |
| 卸载数据卷（挂载此数据卷的容器内部挂载点数据不会丢失）                                                                       | docker volume rm my_vol                                                                                                                             |
| 清理无主的数据卷                                                                                          | docker volume prune                                                                                                                                 |
| 查看数据卷                                                                                             | docker volume ls \| grep my-vol                                                                                                                     |
| 查看指定数据卷的信息                                                                                        | docker volume inspect my-vol                                                                                                                        |
| 创建新的容器并使用-v指定数据卷挂载位置                                                                              | docker run -d --name my_container -v my_volume:/path/in/container my_image                                                                          |
| 创建新的容器并使用--mount指定挂载信息                                                                            | docker run -d --name my_container --mount source=my_volume,target=/path/in/container my_image                                                       |
| ----------                                                                                        | ----------                                                                                                                                          |
| Docker容器策略更新                                                                                      | 如果已经创建了一个容器，可以使用以下命令更改其重启策略：<br/>docker update --restart always &#60;container_id&#62;                                                              |     |     |

## docker inspect

docker inspect 命令可以用来获取 Docker 对象（如容器、镜像等）的详细信息，包括其配置、网络设置、挂载点等。

```shell
# 查看容器详细信息(返回容器的详细信息，包括容器的 ID、状态、网络设置、挂载点等。)
docker inspect <container-name>

# 获取容器 IP 地址
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>

# 查看容器的日志文件路径
docker inspect -f '{{.LogPath}}' <container-name>

# 查看容器的挂载点(返回一个 JSON 格式的字符串，其中包含容器的挂载点信息。)
docker inspect -f '{{json .Mounts}}' <container-name>

# 查看镜像的详细信息(返回镜像的详细信息，包括镜像的 ID、大小、创建时间等。)
docker inspect <image-name>

# 查询容器是否会在重启后自动运行
docker inspect --format '{{json .HostConfig.RestartPolicy}}' <container_id>
```

## 参考文献 {#reference}

[Docker快速入门](https://docker.easydoc.net/doc/81170005/cCewZWoN/lTKfePfP)

[Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
