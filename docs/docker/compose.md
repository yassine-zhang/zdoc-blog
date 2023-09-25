# Docker-Compose

`docker compose` 可以让我们通过运行一个配置文件来快速生成组合式容器的使用

命令：
在后台运行： `docker compsoe up -d`

如下案例，我将它应用在 `NodeJS` 后端API项目调用 `MySQL` 接口

我们需要创建一个文件 `docker-compose.yml` 之后编写类似如下内容

```bash
version: '0.0.2'
services:
  mysql:
    image: mysql  #mysql服务
    command: --default-authentication-plugin=caching_sha2_password
    ports:
        - "3307:3306"
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "root"
      MYSQL_DATABASE: "docker_node"
      MYSQL_USER: "wqt"
      MYSQL_PASSWORD: "123456"
    networks:
      - docker-node
  node-web:  #node 服务
    image: 57878778/node-api-arm64v8:0.0.2
    build: ./
    environment: #用到的env
     - NODE_ENV=development
     - MYSQL_HOST=mysql
     - MYSQL_PASSWORD=123456
     - MYSQL_USER=wqt
     - MYSQL_DATABASE=docker_node
     - REDIS_HOST=redis
     - REDIS_PORT=6379
    ports:
      - "3007:3007"
    depends_on: #web服务依靠mysql 要先等mysql启动
      - mysql
    networks:
      - docker-node

networks: #定义服务的桥 用来服务连接
  docker-node:
```

值得一提的是，如果某个镜像使用 `NodeJS` 作为开发框架那么像上面定义的 `environment` 我们便可以通过 `process.env.XXX` 来获取到，这种就属于暴露特定上下文的env环境变量

> 比如：使用JS原生来写的项目构建成镜像后便可以通过 `import.meta.env.XXX` 上下文元数据来获取上面 `environment` 定义的一些属性

::: info
上面配置信息运行后，就比如 `image` 镜像，如果在本地没有就会从 `hub` 仓库去找

我们可以在本机测试没问题的话再通过 `scp` 命令将文件传到服务器，然后再去运行启动容器
:::
