# Non-cross-domain request

后端非CORS（跨域）是一种基础防护的安全手段，之后我们可以去允许哪些网站可以调用我们的API，这仅仅针对浏览器内网站与服务器之间的请求。

::: details 后端如何通过响应header来允许某些网站发起请求

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

:::

如果配置了CORS那没什么好说的，任何网站都可以去调用。

那么话说回来，后端未配置CORS，在浏览器同源策略的影响下我们该如何请求呢？

## 神奇的form表单与AJAX&Axios的区别 {#form-with-ajax&axios-diff}

1. 使用表单提交请求和使用 AJAX 请求的主要区别在于，表单提交是一种页面跳转的行为。当你在前端页面上提交一个表单时，浏览器会根据表单的 "action" 属性指定的 URL 地址向后端服务器发起请求，并将表单数据以 POST 形式提交到后端。

2. 在这个过程中，由于浏览器会自动将 "Referer" 头部字段发送给后端服务器，后端服务器可以根据这个字段来判断请求来源是否合法。因此，即使没有设置 CORS 响应头，表单提交请求也不会遇到跨域问题。

::: details 利用Referer实现防盗链（同时不允许CORS）

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

3. 需要注意的是：在使用表单提交请求时，页面会跳转到后端服务器返回的页面。如果你希望在不刷新页面的情况下向后端服务器提交数据并获取响应，仍需要使用 AJAX或Axios 请求，并在后端服务器中设置正确的 CORS 响应头，以避免跨域问题。

## 案例演示

> 因为自己写的案例代码有点长，几百行，所以下面我将复制“支付FM”的付款请求案例

示例1:php的直接跳转到支付页面写法，page接收方式
::: details code example

```php
// php 自动跳转
// 开发手册：http://docs.zhifux.com/read/zhifufm/step
$amount = "订单金额"; // 获取充值金额
$orderNo = '商户订单号'; // 商户系统创建的订单号
$merchantNum = '商户号'; // 商户号, 商户后台的用户中心页面查看
$secret = '接入密钥'; // 接入密钥, 商户后台的用户中心页面查看
$api_url = '接口地址'; // 接口地址， 商户后台的用户中心页面查看
$payType = "支付方式值"; // 前端传入的支付方式值，查看支付接口文档说明payType的取值
$notifyUrl = '通知接收接口地址'; // XXXX修改为您自己用来接收支付成功的公网地址
$returnUrl = ''; // 已支付订单状态后会跳转，一般为您想让顾客支付后看到的页面
$returnType = "page"; // 接口返回方式 page为直接跳转到支付页面，不传返回json
$sign = md5 ( $merchantNum.$orderNo.$amount.$notifyUrl.$secret); //待签名字符串=商户号+商户订单号+支付金额+异步通知地址+接入密钥
echo '<html>
      <head><title>redirect...</title></head>
      <body>
          <form id="post_data" action="' . $api_url . '" method="post">
              <input type="hidden" name="merchantNum" value="' . $merchantNum . '"/>
              <input type="hidden" name="payType" value="' . $payType . '"/>
              <input type="hidden" name="amount" value="' . $amount . '"/>
              <input type="hidden" name="orderNo" value="' . $orderNo . '"/>
              <input type="hidden" name="notifyUrl" value="' . $notifyUrl . '"/>
              <input type="hidden" name="returnUrl" value="' . $returnUrl . '"/>
              <input type="hidden" name="sign" value="' . $sign . '"/>
               <input type="hidden" name="returnType" value="' . $returnType . '"/>
          </form>
          <script>document.getElementById("post_data").submit();</script>
      </body>
      </html>';
```

:::

示例2 :form表单直接提交
::: details code example

```html
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>跳转支付中……</title>
  </head>
  <body>
    <form style="display:none" id="fPay" method="post" action="接口地址URL">
      <input name="merchantNum" type="text" value="$merchantNum" />
      <input name="amount" type="text" value="$amount" />
      <input name="payType" type="text" value="$payType" />
      <input name="returnUrl" type="text" value="$returnUrl" />
      <input name="notifyUrl" type="text" value="$notifyUrl" />
      <input name="orderNo" type="text" value="$orderID" />
      <input name="subject" type="text" value="$subject" />
      <input type="hidden" name="returnType" value="$returnType" />
      <input name="sign" type="text" value="$sign" />
    </form>
    <script type="text/javascript">
      // 自动提交也可以手动通过按钮触发表单提交
      window.onload = function () {
        document.getElementById("fPay").submit();
      };
    </script>
  </body>
</html>
```

:::

`推荐方式` 示例3:php的后台接收支付链接并跳转示例,json接收方式
::: details code example

```php
<?php
    $returnType = "json";
    $api_url = "接口地址"; //在用户中心页面查看 接口地址
    $key = "接入密钥"; //在用户中心页面查看 接入密钥
    $sing = md5($merchantNum.$orderNo.$amount.$notifyUrl.$key); //待签名字符串=商户号+商户订单号+支付金额+异步通知地址+接入密钥
    $native = array(
       "merchantNum" => $merchantNum,
       "payType" => $payType,
       "amount" => $amount,
       "orderNo" => $orderNo,
       "notifyUrl" => $notifyUrl,
       "returnUrl" => $returnUrl,
       "sign" => $sign,
       "returnType" => $returnType
       );
    $param = http_build_query($native);
    $ch = curl_init ();
    curl_setopt ( $ch, CURLOPT_URL, $url );
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, 1 );
    curl_setopt ( $ch, CURLOPT_POST, 1 );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, $param );
    curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 60 );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
    curl_setopt ( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
    curl_setopt ( $ch, CURLOPT_HTTPHEADER, array (
            'application/x-www-form-urlencoded;charset=utf-8',
            'Content-Length: ' . strlen ( $param )
    ) );
    $return = curl_exec ( $ch );
    curl_close ( $ch );
    if(strpos($return,'{') === 0){
        $return = json_decode($return, true);
        if($return['success']){
            //json方式接收，可以跳转也可以根据你们自己框架处理支付链接
            //header("location:".$return['data']['payUrl']);
            header("Refresh:0.1;url=" . $return['data']['payUrl']); //会在0.1秒后执行跳转
        }else{
            echo "请求异常";
        }
    }else{
        echo "请求异常";
    }
    exit;
?>
```

:::

`推荐方式` 示例4:JAVA控制类核心代码，完整可参考demo
::: details code example

```java
Map<String, Object> paramMap = new HashMap<>();// post请求的参数
paramMap.put("merchantNum", merchantNum);
paramMap.put("orderNo", orderNo);
paramMap.put("amount", amount);
paramMap.put("notifyUrl", notifyUrl);
paramMap.put("returnUrl", returnUrl);
paramMap.put("payType", payType);
paramMap.put("attch", attch);
paramMap.put("sign", sign);
paramMap.put("subject", "测试商品标题");
paramMap.put("body", "测试商品说明");
String paramStr = HttpUtil.toParams(paramMap);
System.out.println(paramStr);
HttpClient httpclient = HttpClientBuilder.create().build(); //httpclient-4.5.6.jar
HttpPost httpost = new HttpPost(url + "?" + paramStr); // 设置响应头信息
HttpResponse retResp; //httpcore-4.4.10.jar
String result;
JSONObject ret = new JSONObject();
try {
    retResp = httpclient.execute(httpost);
    result = EntityUtils.toString(retResp.getEntity(), "UTF-8");
    System.out.println(result);
}
catch (ClientProtocolException e1) {
    e1.printStackTrace();
}
catch (IOException e1) {
    e1.printStackTrace();
}catch (ParseException e1) {
    e1.printStackTrace();
}
```

:::

<p align="right">本篇文章阅读大概用时：15min</p>
