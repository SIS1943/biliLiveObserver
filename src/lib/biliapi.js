/**
 * 统一的B站API请求方法定义与说明。
 */
const biliApis = {
    live_getRoomInfo:{
        ver: 1,
        manual: '获取指定房间的信息。',
        uri: 'https://api.live.bilibili.com/room/v1/Room/get_info',
        method: 'GET',
        isCookie: false,
        params: {
            room_id: [Number,'房间号']
        }
    },
    live_getPlayUrl:{
        ver: 1,
        manual: '获取指定房间的直播流。',
        uri: 'https://api.live.bilibili.com/room/v1/Room/playUrl',
        method: 'GET',
        isCookie: false,
        params: {
            cid: [Number, '房间号'],
            quality: [Number],
            platform: [String],
            otype: [String],
            qn: [String, '直播流画质']
        }
    }
}

export default {
    biliApis
}