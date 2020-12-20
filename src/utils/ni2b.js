/**
 * Network image to base64 code.
 */
const http = require('request');
const i2b = async url => {
    let data;
    await http(
        {url, method: "GET", encoding: null},
        (e, r, b) => {
            data = "data:image/png;base64," + Buffer.from(b).toString("base64"); //通过Base64转码来规避获取封面403的问题。
        }
    )
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data){
                resolve(data);
            }else{
                reject();
            }
        }, 600)
    })
}

export default i2b;