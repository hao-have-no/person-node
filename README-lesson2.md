## lesson2 开发环境构建　　自定义loader实现

### loader配置　　需要在module/rule的使用上变为函数，以option的形式引入loader及配置

### 自己编写loader编译器
> loader拿到一个模块的内容－－＞对内容进行处理　－－－＞　传递给下一个loader
> loader不能是箭头函数　　　因为ｗｅｂｐａｃｋ在对ｌｏａｄｅｒ操作时，会对当前函数的ｔｈｉｓ做处理，
　　而箭头函数是没有ｔｈｉｓ的
> loader 一定要有返回值

### 如何配置ｌｏａｄｅｒ
