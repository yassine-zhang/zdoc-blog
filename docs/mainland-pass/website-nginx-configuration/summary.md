# Nginx管理项目前后端-配置案例

涉及一个前后分离网站的Nginx管理配置案例，包含前后端SSL。

## nginx.conf

```shell:line-numbers
# cat /server/nginx/conf/nginx.conf

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip 模块设置
    gzip on; #开启 gzip 压缩输出
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; # 压缩文件类型
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers 4 16k; #压缩缓冲区
    gzip_http_version 1.1; #压缩版本（默认 1.1，前端如果是 squid2.5 请使用 1.0）
    gzip_comp_level 9; #压缩等级，gzip 压缩比，1 为最小，处理最快；9 为压缩比最大，处理最慢，传输速度最快，也最消耗 CPU；
    gzip_types text/plain application/x-javascript text/css application/xml;
    #压缩类型，默认就已经包含 text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个 warn。
    gzip_vary on;

    #include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;
        server_name www.newlandsvc.tech newlandsvc.tech;

        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }

    server {
        listen 443 ssl; #侦听443端口，用于SSL
        server_name  www.newlandsvc.tech newlandsvc.tech;

        access_log  /var/log/nginx/host.access.log  main;
        # 注意证书文件名字和位置，是从/etc/nginx/下开始算起的
        ssl_certificate cert/newlandsvc.tech_bundle.crt;
        ssl_certificate_key cert/newlandsvc.tech.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;
        client_max_body_size 1024m;

        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
   }

   # ---------------------------------------------------------------------------------

    server {
        listen 80;
        server_name api.newlandsvc.tech;

        location / {
            proxy_pass http://**.***.**.***:8081;
        }
    }

    server {
        listen 443 ssl; #侦听443端口，用于SSL
        server_name api.newlandsvc.tech;

        access_log  /var/log/nginx/host.access.log  main;
        # 注意证书文件名字和位置，是从/etc/nginx/下开始算起的
        ssl_certificate cert/api.newlandsvc.tech/api.newlandsvc.tech_bundle.crt;
        ssl_certificate_key cert/api.newlandsvc.tech/api.newlandsvc.tech.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;
        client_max_body_size 1024m;

        location / {
            proxy_pass http://**.***.**.***:8081;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
   }

   # ---------------------------------------------------------------------------------

    server {
        listen 8080;
        server_name localhost;

        location / {
            root /usr/share/nginx/html;
            index index.html;
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;

        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

## 日志输出，GZIP压缩

- `error_log`: 错误日志，参考第6行，指定了错误日志存储路径。错误级别`notice`，除此之外还有`info`、`debug`。

- `log_format`: 自定义输出日志格式，参考第19行。

- `access_log`: 用于记录请求日志，参考第23行。

- GZIP模块: 30~39行，开启gzip压缩后，会将网站数据压缩成gz文件，这样做会节省请求带宽，等数据到了浏览器那边再经解压展示。这种做法会比较吃服务器CPU，属于是CPU换带宽的一种做法。

## Server模块配置

- `server` 模块(43~127):

  - 在上面配置文件中我使用分割线隔开了前后端http,https请求具体的配置信息；
  - 当流量进入前端`server`部分，无论通过80还是443端口最终都会被反向代理到8080端口，在最后一个server才是允许被访问的网页资源，字段`root`、`index`；
  - 而对于后端`server`则是被反向代理到当前服务器公网ip:8081端口，之所以不使用`127.0.0.1`或`localhost`代替公网ip是因为别忘了这是用的docker容器技术，每个容器实际都是一个虚拟机，系统。走公网ip流量会正确的被反向代理到相关后端部署容器中；
  - 关于`ssl`认证的根路径是从容器`/etc/nginx/`下开始算起的；
  - 在这个项目中，前端使用顶级域名，后端次之，使用`api.`二级域名，而前后端的ssl证书保存位置也是这种方案，前端`ssl`证书文件在`cert`根目录，后端`ssl`证书文件在`cert/api.example.com`文件夹中；

## 设置代理请求头

- `proxy_set_header Host $host;`: 该配置表明将原始请求头中的 Host 字段替换为 Nginx 服务器上当前服务器块的 $host 变量。这样做是为了避免缓存问题和安全漏洞，确保请求头中的域名与实际访问的域名相同。

- `proxy_set_header X-Real-IP $remote_addr;`: 该配置表明将客户端的真实 IP 地址添加到请求头的 X-Real-IP 字段中。这对于检测代理请求的来源非常有用，同时也可以帮助一些应用程序识别用户的地理位置。

- `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`该配置表明将客户端的 IP 地址和之前代理服务器的 IP 地址添加到请求头的 `X-Forwarded-For` 字段中。这对于跟踪请求路径非常有用，并可以帮助服务器识别客户端的真实 IP 地址。

::: danger 代理请求头解惑

1. `host`: 上面三种，只有`host`是标准的`http`请求所规范的字段，当使用浏览器请求时只有它能够在`devtools`网络请求面板请求头一列查看到信息。`$host`实际上就等于你`server.server_name`中的值。如果不设置它，那么请求头host就是默认的域名，如果在服务中配置了反向代理，那么它就尤为重要。
2. 在 Node.js 中，你可以使用类似 Express 这样的 Web 框架来处理 HTTP 请求，并在代理服务器中设置 X-Real-IP 和 X-Forwarded-For 头部。以下是一个简单的示例代码，演示了如何在 Node.js 中处理这两个头部：

```js
const express = require("express");
const app = express();

app.set("trust proxy", true); // 告诉 Express 信任代理服务器发送的头部信息

app.use((req, res, next) => {
  // 获取客户端真实 IP 地址
  const realIP = req.headers["x-real-ip"] || req.connection.remoteAddress;
  console.log("Real IP:", realIP);

  // 获取经过的所有代理服务器 IP 地址
  const forwardedFor = req.headers["x-forwarded-for"];
  console.log("Forwarded For:", forwardedFor);

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

:::

## 了解更多

[使用Docker容器技术对nginx服务进行部署](../ssl-license/summary.md)
