# Registry
> 当我们有需要将自己的镜像隐藏起来并不想公开的时候可以自己搭建一个私有库或团队内部这么一个库。

详细教程：
- 私有仓库：https://yeasy.gitbook.io/docker_practice/repository/registry
- 私有仓库高级配置(包含openssl证书自签)：https://yeasy.gitbook.io/docker_practice/repository/registry_auth
- 私有库官方权威全英教程：https://distribution.github.io/distribution/



## 注意细节 {#detials}
1. 在搭建好基础私有仓库后，配置非https仓库地址需要在有`push`需求的机器上配置，Docker不允许非`HTTPS`方式推送镜像。


## 命令速查 {#command-spd}
！！这里只记了平时常用的命令！

### 使用cURL 操作私有仓库API：

| Description                        |   Syntax&Error                                                    |
| ---------------------------------- | ----------------------------------------------------------------- |
| 注意： | <span style="color:#e46b59;">如果您的仓库使用了非https协议，那么无需加-u参数登录私有库或者传token即可调用</span> |
| ---------- | ---------- |
| 身份验证 | `curl -u "<username>:<password>" https://your-registry-url/v2/` |
| 获取访问令牌（Token） | `curl -X GET "https://<registry_host>/v2/token?service=<registry_name>&scope=repository:<repository_name>:pull,push" --user "<username>:<password>"` |
| 获取该仓库所有标签列表 | `curl -u "<username>:<password>" https://your-registry-url/v2/<repository>/tags/list` |
| 查看仓库中的镜像列表 | `curl -u "<username>:<password>" https://your-registry-url/v2/_catalog` |
| 删除镜像标签 | `curl -X DELETE -H "Authorization: Bearer <access_token>" "https://<registry_host>/v2/<repository_name>/manifests/<tag>"` |
