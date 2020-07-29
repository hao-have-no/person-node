## 网络编程

### 七层网络协议
> 应用层 SSH HTTP SSL MIME
> 传输层 TCP UDP
> 网络层: IPV4 IPV6
> 数据链路加物理层: 以太网 无线LAN

### TCP协议 - 实现一个即时通讯IM
> Socket实现
> 原理：Net模块提供一个异步API能够创建基于流的TCP服务器，客户端与服务器建立连接后，服务器可
以获得一个全双工Socket对象，服务器可以保存Socket对象列表，在接收某客户端消息时，推送给其他
客户端。

### Http协议
> 三部分组成：状态码，消息报头，响应正文
> hhtp缓存:看掘金和相关视频

### 跨域请求
>1.在服务端接收请求时，设置assess-control-allow-origin:'http:XXX'来设置可以接受这个地址下的请求
> cors解决跨域的实质：

### 最简单的慢点方法
```//埋点更容易
// const img = new Image()
// img.src='/api/users?abc=123' 
```

### 
