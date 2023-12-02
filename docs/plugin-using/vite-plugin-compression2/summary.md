# Vite GZIP压缩插件推荐 {#Vite-Plugin-Compression2}

插件npm链接：https://www.npmjs.com/package/vite-plugin-compression2

## Use nginx please note

1. 在后端使用Nginx开启gzip压缩后，源工程文件不需要手动压缩gzip格式；
2. 因此如果您服务器使用nginx，那么其实不必考虑使用此插件；
3. 之所以用gzip，简而言之：用cpu性能换取带宽；
4. nginx会动态生成gzip压缩文件，通过响应头Content-Encoding:gzip标识经由浏览器解压。
