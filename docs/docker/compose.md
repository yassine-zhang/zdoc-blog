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

<br />

如下案例，我将它应用在 `NodeJS` 后端API项目调用 `MySQL` 接口

我们需要创建一个文件 `docker-compose.yml` 之后编写类似如下内容

```bash
version: '3' #可以固定这么写，此版本与docker-compose功能相关
services:
  mysql:
    image: mysql  #mysql服务
    # 此加密协议在mysql8.0是默认的，但NodeJS中mysql模块并不完全支持`caching_sha2_password`
    # command: --default-authentication-plugin=caching_sha2_password
    command: --default-authentication-plugin=mysql_native_password
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
    restart: always
    depends_on: #node服务依靠mysql 要先等mysql启动
      - mysql
    networks:
      - docker-node

networks: #定义服务的桥 用来服务连接
  docker-node:
```

::: info
上面配置信息运行后，就比如镜像，如果在本地没有就会从仓库去找，会依次从配置的仓库地址中去找，非HTTPS私有库也可以

我们可以在本机测试没问题的话再通过 `docker push` 命令将镜像推送到仓库，然后在服务器直接运行Compose容器。
:::

## 常见问题 {#common-problem}

::: details Docker Compose中服务项内`environment`可以按照什么格式来写？
在Docker Compose中，`environment`关键字用于定义服务的环境变量。它有两种常见的格式：固定格式和自定义格式。

固定格式：

```yaml
version: "3.8"
services:
  myservice:
    image: myimage
    environment:
      - ENV_VAR1=value1
      - ENV_VAR2=value2
```

在固定格式中，每个环境变量被表示为一个简单的字符串，格式为`ENV_VAR=value`。每个环境变量都是一个独立的字符串项，使用`-`符号开头。这是最常见的环境变量定义方式，也是最易读易懂的方式之一。

自定义格式：

```yaml
version: "3.8"
services:
  myservice:
    image: myimage
    environment:
      ENV_VAR1: value1
      ENV_VAR2: value2
```

在自定义格式中，每个环境变量使用键值对的形式表示，格式为`ENV_VAR: value`。这种格式更接近于键值对的表示方式，更清晰地表达了每个环境变量的名字和值。

无论选择哪种格式，都能够成功定义服务的环境变量。在实际应用中，你可以根据自己的喜好和团队的约定选择最适合的格式。
:::

::: details 环境变量使用方法

1. 如果运行在`Node.js`环境中可以使用`process.env.xx`来获取环境变量的值。
2. 如果运行在浏览器端，可以使用`import.meta.env.xx`来获取环境变量的值。
   :::

## Compose新型使用方法 {#compose-new-use-method}

1. 为了记录docker run时的一些配置信息，可以使用compose来配置单个镜像；
2. 灵感来源于：https://yeasy.gitbook.io/docker_practice/repository/registry_auth#bian-ji-dockercompose.yml；
3. 可以在服务器单独创建一个存放docker-compose.yml的文件夹，在里面写所有容器的配置信息，同时还不能忘记额外在记事本记录重要信息，比如端口号，容器名，描述。
