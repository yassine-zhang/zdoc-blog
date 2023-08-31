# 推送镜像
推送本地镜像到仓库需要做以下几步操作前提：
1. 创建 `Docker Hub` 账号并登录
2. 创建个人仓库，注意仓库名字要和后续推送时镜像名一致

## 登录账号
```bash{1}
docker login -u 57878778    // [!code focus]
Password: 
Login Succeeded

Logging in with your password grants your terminal complete access to your account. 
For better security, log in with a limited-privilege personal access token. Learn more at https://docs.docker.com/go/access-tokens/
```

## 查看指定镜像是否存在
```bash{1}
docker image ls     // [!code focus]
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
57878778/node-api-amd64     0.0.2     a090e6e1744d   26 minutes ago   931MB
57878778/node-api-arm64v8   0.0.2     1ee73ed3c96d   16 hours ago     879MB
57878778/node-api-amd64     0.0.1     07486af7f36d   26 hours ago     931MB
57878778/node-api-arm64v8   0.0.1     c6ec6ff3ddd0   26 hours ago     879MB
mysql                       latest    bdfb0ec4d54a   2 weeks ago      599MB
```

## 推送镜像
```bash{1}
docker push 57878778/node-api-amd64:0.0.2   // [!code focus]
The push refers to repository [docker.io/57878778/node-api-amd64]
b36470fbd6e6: Pushed 
5f70bf18a086: Layer already exists 
e71d49cd53bb: Pushed 
8d154ce6b72c: Layer already exists 
8e6d74fe83c9: Layer already exists 
3b7ed2050471: Layer already exists 
29fbe5747f9a: Layer already exists 
787062cd94fb: Layer already exists 
a4e797bc3f15: Layer already exists 
392f356944ff: Layer already exists 
15210a41d4ee: Layer already exists 
e2a8a00a83b2: Layer already exists 
0.0.2: digest: sha256:8c5e0809c48f204c683da0440c5fcbf50906cd4812db09d20d5d597fb49dbe4f size: 2843
```