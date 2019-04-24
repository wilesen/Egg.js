import NotFound from './404NotFround.js'
export default class RouteSpa {
    constructor(name) {
        this.name = name;
        this.routeList = [];
        this.init(name);
        console.warn('RouteSpa is starting');
    }
    // 初始化
    init = (targetRoot) => {
        const target=document.querySelectorAll(targetRoot);
        if(targetRoot&&typeof targetRoot ==="string"&&target.length===1){
            window.addEventListener('load', () => {
                this.catchUrlChange();
            })
            window.addEventListener('hashchange', () => {
                this.catchUrlChange();
            })
        } else if (target.length===0){
            this.Util_ThrowError('Please checkout your init function! Your targetRoot are not found ')
        } else if(target.length>1){
            this.Util_ThrowError('Please checkout your init function! Your targetRoot should be unique ')
        }else {
            this.Util_ThrowError('Please checkout your init function! Your targetRoot is not the correct value ')
        }
        this.targetRoot=target;
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
            param: tempty ||{}
        }
    }
    Util_ThrowError=(errorMsg)=>{
         throw new Error(errorMsg)
    }
    // 注册路由
    registeRoute = (route) => {
        if (route instanceof Array) {
            this.routeList = [...route];
        } else {
            this.Util_ThrowError('Please checkout your registeRoute function!')
        }
    }
    // 检测URL路径
    checkPage = (page,props) => {
        let hasFoundRoute = false;
        for (var item of (this.routeList)) {
            if (item.routeName === page) {
                hasFoundRoute = true;
                console.log('find Module',item);
               let renderModule= new item.component(props);
               this.targetRoot[0].innerHTML=renderModule.render();
            }
        }
        if (!hasFoundRoute) {
            this.targetRoot[0].innerHTML=NotFound(); 
        }
    }
    // 获取URL参数
    catchUrlChange = () => {
        let t = this.Util_QsHasUrl(location.hash);
        this.checkPage(t.url,t.param);
    }
}