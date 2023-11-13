# Docker-Compose

::: warning

1. docker-compose构建的组合容器与普通docker run的容器没有区别，只是在复杂场合下通过yml配置文件信息进行部署容器是件更好的选择；
2. 不论怎么创建的容器，它内部主机名都是容器id缩写，例如`48ea77885986`；
3. 使用`docker compose ps`命令查询通过配置文件部署的正在运行的容器的基本信息
   - [x] 并不会出现CONTAINER ID这一列，
   - [v] 反而多出了SERVICE一列，
   - 值的一提的是同一组合容器内其他服务项容器也可以将SERVICE值当成主机名来用；
4. 通过查询容器内ip可以看出，即使不配置networks也会进行网络隔离。
   - 使用docker run创建的容器会归为默认网络，默认网络名称bridge，网关：172.17.0.1，子网掩码：172.17.0.0/16，`docker network inspect bridge`查看此网络信息；
   - 使用docker compose创建的容器，网关会依次排出：172.18.0.1、172.19.0.1、172.20.0.1...
5. 使用`docker compose up -d --build mysql`可以将yml配置文件中mysql服务项重新部署，它会先停止原有此服务容器，之后删除，最后创建新容器；
6. 要注意的是docker compose所有操作只能在含有yml配置文件的目录中进行。
   :::

YAML文件内容格式化网站：https://www.yamllint.com/

[Docker速查表](/common-tools/cheat-sheet/docker.md)

如果没别的事到这里已经结束了，以上内容为总结。

---

<br/>
<br/>

如下案例，我将它应用在 `NodeJS` 后端API项目调用 `MySQL` 接口

我们需要创建一个文件 `docker-compose.yml` 之后编写类似如下内容

```bash
version: '3' #可以固定这么写，此版本与docker-compose功能相关
services:
  mysql:
    image: mysql  #mysql服务
    command: --default-authentication-plugin=caching_sha2_password
    ports:
        - "8082:3306"
    restart: always  # docker服务启动后自启动
    environment: # 前两个变量为MySQL服务必不可少的变量
      MYSQL_ROOT_PASSWORD: "root"
      MYSQL_DATABASE: "docker_node"
      MYSQL_USER: "wqt"
      MYSQL_PASSWORD: "123456"
    networks:
      - docker-node
  node:  #node 服务
    image: reponsitory/image-name:tag
    build: ./
    environment: #用到的env
     - NODE_ENV=development
     - MYSQL_HOST=mysql
     - MYSQL_PASSWORD=123456
     - MYSQL_USER=wqt
     - MYSQL_DATABASE=docker_node
    ports:
      - "8081:32763"
    depends_on: #node服务依靠mysql 要先等mysql启动
      - mysql
    networks:
      - docker-node

networks: #定义服务的桥 用来服务连接
  docker-node:
```

值得一提的是，如果某个镜像使用 `NodeJS` 作为开发框架那么像上面定义的 `environment` 我们便可以通过 `process.env.XXX` 来获取到，这种就属于暴露特定上下文的env环境变量

> 比如：使用JS原生来写的项目构建成镜像后便可以通过 `import.meta.env.XXX` 上下文元数据来获取上面 `environment` 定义的一些属性

::: info
上面配置信息运行后，就比如镜像，如果在本地没有就会从仓库去找，会依次从配置的仓库地址中去找，非HTTPS私有库也可以

我们可以在本机测试没问题的话再通过 `docker push` 命令将镜像推送到仓库，然后在服务器拉取并运行容器
:::

## Compose新型使用方法 {#compose-new-use-method}

1. 为了记录docker run时的一些配置信息，可以使用compose来配置单个镜像；
2. 灵感来源于：https://yeasy.gitbook.io/docker_practice/repository/registry_auth#bian-ji-dockercompose.yml；
3. 可以在服务器单独创建一个存放docker-compose.yml的文件夹，在里面写所有容器的配置信息，同时还不能忘记额外在记事本记录重要信息，比如端口号，容器名，描述。
