## http 缓存机制

### web缓存
> 强缓存策略
+ 直接从本地拿相关数据，使用定时器来判断有效期
+ http1:expires 定义过期时间
+ http2:catch-directive


> 协商缓存： 与后台进行交互
+ last-modified和 if-modified-since 通过修改时间来请求缓存
+ if-none-match 通过内容来进行

