// 一对一视频
import { axios } from '@/utils';

// 获取七牛云roomToken-管理员身份  /c/qny/room-manager/get-room-token-as-admin/{userInterviewId}
export const getRoomAdminToken = params => axios.get('/c/qny/room-manager/get-room-token-as-admin/' + params);

// 获取七牛云roomToken  /c/qny/room-manager/get-room-token/{userInterviewId}
export const getRoomToken = params => axios.get('/c/qny/room-manager/get-room-token/' + params);

// (本地开发使用获取远程地址)获取七牛云roomToken-根据房间号和用户id  /c/qny/room-manager/get-room-token/{roomName}/{userId}
export const getRoomTwoToken = params => axios.get('/c/qny/room-manager/get-room-token/'+ params.roomName +'/'+ params.userId);
