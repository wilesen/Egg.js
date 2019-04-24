function loadModuleFunc(item){
    var _body=document.querySelectorAll('body')[0];
    var _script=document.createElement('script');
    _script.type= 'module';
    _script.src= item.componentUrl;
    _script.async = true;
    _script.onload= function(){
        console.log('页面记载'+item.routeName+'完成');
    }
    _body.appendChild(_script);
}

export {loadModuleFunc};