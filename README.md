## Egg.js 单页面框架的简单实现
**先上github项目地址：** [Egg.js][1]

### 介绍 ###

其实最开始做这个东西也是自己准备重新学习一下SPA单页面应用的基本实现，然后在gitHub上搜索到了另外一个项目[spa-routers][2]有感而发写的这个东西。

### 分析 ###

简单的参照了一下目前React、Dva等框架的基本文件结构去做的这个么个简单的东西，主要的功能就是：

1. 切换页面
2. 异步的加载各个类
3. 给各个类进行传参继承属性

### 使用介绍 ###

1. 在你的文件的根目录中引用 Egg并且绑定根目录

```
import Egg from './Egg/Egg.js';

let App = new Egg('#app');

```

2. 配置routeConfig文件

```
import Page1 from '../Pages/Page1/page1.js';
import Page2 from '../Pages/Page2/page2.js';
import Page3 from '../Pages/Page3/page3.js';
import Page4 from '../Pages/Page4/page4.js';

const routes=[{
    routeName:'page1',
    component:Page1
},
{
    routeName:'page2',
    component:Page2
},
{
    routeName:'page3',
    component:Page3
},
{
    routeName:'page4',
    component:Page4
}];

export default routes;

```

3. 引用你自己创建的Index.js文件

```
<html>
    <head>
        <title>
                SPA-PAGE
        </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script type='module' src='./Egg/Egg.js'></script>
    <script type="module" src='./index.js'></script>
</head>
    <body>
            <a href="#/">首页</a>
            <a href="#/page1?id=1&age=3">page1</a>
            <a href="#/page2">page2</a>
            <a href="#/page3">page3</a>
            <a href="#/page4">page4</a>
            <div id='app'></div>
    </body>
</html>
```

具体的实现可以看Egg文件夹中的文件，实现的方法肯定是很多种，欢迎大家提提自己的意见！

[1]: https://github.com/wilesen/Egg.js
[2]: https://github.com/kliuj/spa-routers