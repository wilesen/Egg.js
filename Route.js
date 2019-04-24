

(function () {
    class Route {
        constructor(name) {
            this.name = name;
            this.routeList = [];
        }
        // 初始化
        init = () => {
            window.addEventListener('load', () => {
                this.catchUrlChange();
            })
            window.addEventListener('hashchange', () => {
                this.catchUrlChange();
            })
        }
        // 工具函数：解析url路径及其参数
        Util_QsHasUrl = (hashUrl) => {
            const [, location] = hashUrl.split('/');
            const [url, param] = location.split('?');
            let tempty = {};
            if (param) {
                param.split('&').forEach(item => {
                    const param = item.split('=');
                    tempty[`${param[0]}`] = param[1]
                })
            }
            return {
                url: url,
                urlParam: tempty || {}
            }
        }
        // 注册路由
        registeRoute = (route) => {
            if (route instanceof Array) {
                this.routeList = [...route];
            } else {
                throw new Error('Please checkout your registeRoute function!')
            }
        }
        // 检测URL路径
        checkPage = (page) => {
            let hasFoundRoute = false;
            for (var item of (this.routeList)) {
                if (item.routeName === page) {
                    hasFoundRoute = true;
                    console.log('findRoute', item)
                }
            }
            if (!hasFoundRoute) {
                location.hash = '/404'
            }
        }
        // 获取URL参数
        catchUrlChange = () => {
            const url=location.hash;
            let urlObj = this.Util_QsHasUrl(url);
            this.checkPage(urlObj.url);
            console.log(urlObj)
        }
    }
    window.Route = new Route();
})()

