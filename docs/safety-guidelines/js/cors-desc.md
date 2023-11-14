# CORS Description

策略利害： 浏览器同源策略是一种为用户安全防护的手段，即防住了他人，也防住了开发者自己。。

一心对外： 同源策略只针对开发者通过脚本发起的请求，如果使用浏览器骨架元素发起的默认请求并不受影响。通过脚本发起的请求到服务器那边要进行跨域处理，或者要在前端网站接收前拦截响应数据进行跨域处理。


::: details 什么是同源策略？ 

同源策略是一个由浏览器施行的安全机制，用于限制一个网页中的文档或脚本如何能与来自不同源（域名、协议或端口不同）的资源进行交互。它是一种重要的安全措施，旨在防止恶意网站利用用户的身份和权限来访问其他网站的敏感信息，或者通过跨站点请求伪造（Cross-Site Request Forgery）等方式进行攻击。

根据同源策略，以下三个关键方面必须完全匹配，才能被认为是同源：

1. 协议相同：两个页面的协议（http、https）必须相同。
2. 域名相同：两个页面的域名必须相同，包括主域名和子域名。
3. 端口相同：如果指定了端口号，那么两个页面的端口号也必须相同。

如果不满足以上所有条件，就会触发同源策略，导致浏览器限制页面之间的交互。例如，通过JavaScript发起的XMLHttpRequest、Fetch请求、Cookie读取等操作都受到同源策略的限制。

虽然同源策略有助于提高Web应用程序的安全性，但在某些情况下也可能会带来一些开发挑战，因此开发人员需要了解如何通过CORS（跨源资源共享）等机制来处理跨源请求。

:::



::: details 后端如何通过响应header来允许某些网站发起请求？（CORS）

### NodeJS案例

```js
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://www.example1.com, http://www.example2.com",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
```

这实际上就是CORS，只是说大部分跨域都是允许所有源*进行访问的。
- 在NodeJS+Express项目中可以安装`cors`插件使用即可。

:::



::: details HTTP预检操作对服务器有影响吗？

HTTP 预检操作（Preflight）是指浏览器在发送跨源请求（跨域请求）时，会先发送一个 OPTIONS 方法的预检请求到目标服务器，以确定实际的请求是否安全。这个预检请求包含了一些 CORS 相关的头部信息，比如 Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 等。

对于服务器来说，HTTP 预检请求可能会产生一定的影响，具体影响包括：

1. 额外的请求处理： 预检请求会额外增加服务器的请求负担，因为每个跨域请求都可能会触发一次预检请求。服务器需要能够正确地处理这些预检请求，并给出对应的响应。

2. 跨域资源共享（CORS）配置： 服务器需要进行相应的 CORS 配置，包括设置响应头中的 Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers 等，以允许跨域请求的发起。

3. 安全性考虑： 预检请求的引入是为了增强 Web 安全性，因此服务器需要正确地处理预检请求，根据请求头中的信息来决定是否允许实际的跨域请求。

总的来说，HTTP 预检操作会对服务器产生一些额外的处理和配置上的影响，但这也是为了增强 Web 安全性和确保跨域请求的安全性而必要的措施。因此，服务器端需要做好相应的处理和配置，以便正确地响应预检请求并允许跨域请求的进行。

:::



::: details 什么情况下会触发浏览器预检?
浏览器在发送跨域请求（跨源请求）时会触发预检操作（Preflight），具体情况包括：

1. 自定义请求头： 当请求中包含自定义的请求头（例如使用 `XMLHttpRequest` 的 `setRequestHeader` 方法设置了自定义的请求头），且请求方法为 `PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH` 或者 Content-Type 不属于 `application/x-www-form-urlencoded、multipart/form-data、text/plain` 时，浏览器会触发预检请求。

2. 非简单请求： 当发送的请求为非简单请求时，浏览器会触发预检请求。简单请求满足以下条件：
   - 请求方法为 GET、HEAD 或者 POST。
   - 请求头只包含以下几种字段：Accept、Accept-Language、Content-Language、Content-Type（但只限于上述三种特定的值）、DPR、Downlink、Save-Data、Viewport-Width、Width。
   - Content-Type 的值仅限于 application/x-www-form-urlencoded、multipart/form-data、text/plain。

3. 跨域请求： 当请求的目标地址与当前页面的域名、协议或者端口不一致时，浏览器会触发预检请求。跨域请求通常涉及不同域名、子域名、不同端口或者使用不同协议等情况。

当满足以上条件时，浏览器会自动发送 OPTIONS 方法的预检请求到目标服务器，以确定实际的请求是否安全，并等待服务器返回相应的 CORS 相关头部信息。服务器需要正确处理预检请求，并在响应中设置适当的 CORS 头部信息，以允许或拒绝实际请求的发送。
:::



::: details Form表单默认请求跨过同源策略

1. 使用表单提交请求和使用 AJAX 请求的主要区别在于，表单提交是一种页面跳转的行为。当你在前端页面上提交一个表单时，浏览器会根据表单的 "action" 属性指定的 URL 地址向后端服务器发起请求，并将表单数据以 POST 形式提交到后端。

2. 在这个过程中，由于浏览器会自动将 "Referer" 头部字段发送给后端服务器，后端服务器可以根据这个字段来判断请求来源是否合法。因此，即使没有设置 CORS 响应头，表单提交请求也不会遇到跨域问题。

3. 在请求头中会设置`Content-Type: application/x-www-form-urlencoded`

实际上浏览器中的请求技术同源策略都会不设防护
:::



::: details 利用Referer实现防盗链

### NodeJS案例

```js
app.get("/protected-resource", (req, res) => {
  const allowedReferers = [
    "http://www.example.com",
    "http://subdomain.example.com",
  ];
  const referer = req.headers.referer || req.headers.referrer;

  if (
    referer &&
    allowedReferers.some((allowedReferer) => referer.includes(allowedReferer))
  ) {
    // 处理请求的逻辑
    res.send("Protected resource");
  } else {
    // 返回防盗链错误页面或重定向到其他URL
    res.status(403).send("Access denied");
  }
});
```

:::


<p align="left">如有错误，还请不吝赐教（Github issue）</p>
<p align="right">本篇文章阅读大概用时：15min</p>
