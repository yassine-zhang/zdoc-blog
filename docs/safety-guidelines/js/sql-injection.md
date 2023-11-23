# SQL Injection

为了防止 SQL 注入攻击，你可以采取以下几个措施来保护你的 Node.js + Express 应用程序与 MySQL 数据库交互时的数据安全性：

1. 使用参数化查询或预处理语句：使用参数化查询或预处理语句可以防止恶意用户插入恶意代码。这样的查询会将用户提供的数据作为参数传递给数据库引擎，而不是将它们直接拼接到查询字符串中。

   例如，在使用 `mysql` 模块进行查询时，可以使用占位符 `?` 并将用户提供的数据作为数组传递给查询方法。这样可以确保查询中的数据会经过正确的转义和处理。

```js
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

// 使用参数化查询
const query = "SELECT * FROM users WHERE username = ? AND password = ?";
const values = [userInputUsername, userInputPassword];

connection.query(query, values, (error, results) => {
  // 处理查询结果
});
```

2. 验证和过滤用户输入：在将用户提供的数据传递给数据库之前，应该进行验证和过滤。确保只接收符合预期格式和类型的数据，并对用户输入进行适当的处理和清理。可以使用正则表达式、验证库或自定义的验证逻辑来进行输入验证。

3. 避免动态拼接查询字符串：尽量避免将用户提供的数据直接拼接到查询字符串中，这样会增加受到 SQL 注入攻击的风险。如果需要动态构建查询，可以使用参数化查询或预处理语句（如上述所示）。

4. 使用 ORM 或查询构建器：使用 ORM（对象关系映射）库或查询构建器可以更加安全地与数据库交互。这些工具会自动处理参数化查询和转义，从而减少 SQL 注入攻击的风险。一些流行的 Node.js ORM 库包括 Sequelize、TypeORM 和 Knex。

5. 限制数据库用户的权限：在配置数据库用户时，应该限制其仅具有执行必要操作的权限，并避免赋予过高的权限。最小化数据库用户的权限可以降低受到攻击时的潜在损失。

通过采取这些措施，你可以有效地保护你的 Node.js + Express 应用程序免受 SQL 注入攻击的风险。然而，安全是一个持续的过程，你应该密切关注漏洞和最新的安全实践，并及时更新和修复你的应用程序。
