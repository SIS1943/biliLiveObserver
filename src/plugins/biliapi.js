import i2b from '@/utils/ni2b'
const http = require('request');

/*-- LIVE --*/
/**
 * 获取直播流链接
 * @param {Number} roomId 房间ID
 * @param {Number} qn 默认画质
 *              = 10000 原画
 *              = 400 蓝光
 */
const getLiveUrl = async (roomId, qn = "10000") => {
    let data;
    await http(
        `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${roomId}&quality=4&platform=web&otype=json&qn=${qn}`,
        (err, res, body) => {
            body = JSON.parse(body);
            if (!err && res.statusCode == 200 && body.code == 0) {
                //返回直播间地址与画质
                data = {
                    current_qn: body.data.current_qn,
                    durl: body.data.durl
                }
            }
        })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data){
                resolve(data);
            }else{
                reject();
            }
        }, 1000)
    })
}
/**
 * 获取直播间详细信息
 * @param {Number} roomId
 */
const getLiveInfo = async (roomId) => {
    let data;
    await http(
        `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomId}`,
        (error, response, body) => {
            body = JSON.parse(body);
            if (!error && response.statusCode == 200 && body.code == 0) {
                let b = body.data
                data = {
                    title: b.title,
                    live_status: b.live_status == 1 ? true : false,
                    parent_area_name: b.parent_area_name,
                    area_name: b.area_name,
                    room_id: b.room_id,
                    live_time: b.live_time,
                    user_cover_url: b.user_cover,
                    user_cover_base64: i2b(b.user_cover),
                    user_id: b.uid,
                }
            } else {
                data = false;
            }
        }
    );
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data){
                resolve(data);
            }else{
                reject();
            }
        }, 1000)
    })
}
/**
 * 获取直播信息与直播链接整合版
 * @param {Number} roomId 房间ID
 * @param {Number} qn 默认画质
 *              = 10000 原画
 *              = 400 蓝光
 */
const getLiver = async (roomId, qn = "10000") => {
    let liver = false;
    liver = {
        url: await getLiveUrl(roomId, qn),
        info: await getLiveInfo(roomId)
    }
    return liver;
}
/**
 * 获取开播状态
 * @param {Number} roomId 房间ID
 */
const getLiveStatus = (roomId) => {
    http(
        `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomId}`,
        (error, response, body) => {
            body = JSON.parse(body);
            if (!error && response.statusCode == 200 && body.code == 0) {
                body = body.data
                return body.live_status == 1 ? true : false
            } else {
                return false;
            }
        }
    )
}
/**
 * 闲置小Tip
 * @param {Number} roomId 房间ID
 */
const offLiveTips = (roomId = 1024) => {
    http(
        `https://api.live.bilibili.com/xlive/web-room/v1/index/getOffLiveList?room_id=${roomId}`,
        (e, r, b) => {
            return b.data.tips;
        }
    )
}
/*-- USER --*/
/**
 * 获取完整的用户公开信息
 * @param {number} uid UID
 */
const spaceInfo = uid => {
    http(
        `http://api.bilibili.com/x/space/acc/info?mid=${uid}`,
        (error, response, body) => {
            body = JSON.parse(body);
            if (!error && response.statusCode == 200 && body.code == 0) {
                body = body.data;
                return body
            } else {
                return false;
            }
        }
    )
}
/**
 * 获取用户姓名与等级
 * @param {number} uid UID
 */
const spaceMini = uid => {
    http(
        `http://api.bilibili.com/x/space/acc/info?mid=${uid}`,
        (error, response, body) => {
            body = JSON.parse(body);
            if (!error && response.statusCode == 200 && body.code == 0) {
                body = body.data;
                return {
                    mid: body.mid,
                    name: body.name,
                    level: body.level,
                }
            } else {
                return false;
            }
        }
    )
}

export default {
    liver: { getLiveUrl, getLiveInfo, getLiver, getLiveStatus, offLiveTips },
    user: { spaceInfo, spaceMini }
};