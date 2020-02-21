import api from './biliapi';
import req from 'request';

// 全局的返回值变量
// 这回返回一个数组
let ret = {
    _status: 0,
    data: undefined,
    httpCode: undefined,
    _message: 'Null.',
};

/**
 * 基于biliapi.js的API请求方法。
 * 请求方式基于NodeJs的request模块。
 * @param {String} comm 请求的API，具体可参照biliapi.js
 * @param {Array} params 请求的参数。
 * @param {String} cookie 如果需要Cookie，则需要携带Cookie
 */
function biliapi (comm, params = {}, cookie = ''){
    let reqParams = {
        url: '',
        params: {},
        method: '',
        cookie: '',
    };
    if(typeof comm == "string" && api[comm]){//验证该API是否存在。
        var command = api[comm];

        reqParams.url = command.uri;
        reqParams.method = command.method;

        if(command.params){//该API是否需要params
            if(command.isCookie){//该API是否需要传递Cookie
                reqParams.cookie = cookie;
            }
            //对params进行比对与解析。
            if(params && params instanceof Object){
                if(params.length == command.method.length){
                    if(Object.getOwnPropertyNames(params).toString == Object.getOwnPropertyNames(command.params)){
                        reqParams.params = params
                    }else{
                        //属性不一致
                    }
                }else{
                    //长度不一致
                }
            }else{
                //不是一个Object。
            }
        }else{//不需要params，直接梭。
        }
    }else{//API不存在此API
    }
    return ret;
}
reqClient('233');//暂时放着，并规避esLint。
/**
 *基于request模块的请求端
 *2020-02-21, Lonay.
 * //Tip: 可以根据此参数的模板来更改成自己习惯的或性能更好的HTTP请求模块。
 * @param {*} params 请求的参数，可以是Object，也可以是url。
 * @param {*} method 请求的。。啊好困还是先睡个觉，明天继续肝。
 */
function reqClient(params, method){
    req, params, method;//暂时放着，并规避esLint。
}

export default{
    biliapi
}