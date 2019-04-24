import NotFound from './404NotFround.js'
export default class RouteSpa {
    constructor(name) {
        this.routeList = [];
        this.init(name);
        console.warn('RouteSpa is starting');
    }
    init = (r) => {
        const t=document.querySelectorAll(r);
        if(r&&typeof r ==="string"&&t.length===1){
            window.addEventListener('load', () => {
                this.catchUrlChange();
            })
            window.addEventListener('hashchange', () => {
                this.catchUrlChange();
            })
        } else if (t.length===0){
            this.Util_ThrowError('Please checkout your init function! Your targetRoot are not found ')
        } else if(t.length>1){
            this.Util_ThrowError('Please checkout your init function! Your targetRoot should be unique ')
        }else {
            this.Util_ThrowError('Please checkout your init function! Your targetRoot is not the correct value ')
        }
        this.targetRoot=t;
    }
    Util_QsHasUrl = (h) => {
        const [, l] = h.split('/');
        const [u, p] = l.split('?');
        let t = {};
        if (p) {
            p.split('&').forEach(item => {
                const p = item.split('=');
                t[`${p[0]}`] = p[1]
            })
        }
        return {
            u: u,
            p: t ||{}
        }
    }
    Util_ThrowError=(errorMsg)=>{
         throw new Error(errorMsg)
    }
    registeRoute = (r) => {
        if (r instanceof Array) {
            this.routeList = [...r];
        } else {
            this.Util_ThrowError('Please checkout your registeRoute function!')
        }
    }
    checkPage = (p,d) => {
        let hasFoundRoute = false;
        for (var i of (this.routeList)) {
            if (i.routeName === p) {
                hasFoundRoute = true;
                console.log('find Module',i);
               let renderModule= new i.component(d);
               this.targetRoot[0].innerHTML=renderModule.render();
            }
        }
        if (!hasFoundRoute) {
            this.targetRoot[0].innerHTML=NotFound(); 
        }
    }
    catchUrlChange = () => {
        let t = this.Util_QsHasUrl(location.hash);
        this.checkPage(t.u,t.p);
    }
}