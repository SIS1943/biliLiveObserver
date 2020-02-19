// 引包
let express = require('express')
let axios = require('axios-jsonp-pro')
let app = express()
let apiRoutes = express.Router()
app.use('/api', apiRoutes);
// 配置

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    //添加一个before方法
    before(apiRoutes){
      apiRoutes.get('/api/bili/room/getPlayUrl',(req,res)=>{ //将对本api请求进行转发
        const url = 'https://api.live.bilibili.com/room/v1/Room/playUrl'; //转发的目的url
        axios.get(url, {
          headers: {
            referer: 'https://live.bilibili.com',
            host: 'https://api.live.bilibili.com'
          },
          params: req.query  //请求的query
        }).then((response) => {
          //response是api地址返回的，数据在data里。
          res.json(response.data)
        }).catch((e) => {
          e
          // console.log(e);
        })
      });
    }
  }
}
