// 公用组件接口调用
import { axios } from '@/utils';


// 关注/取消关注企业（人物）  /c/user-follow/follow/{followStatus}
export const setIsFollow = params => axios.post('/c/user-follow/follow', params);

// 获取js配置
export const getAppId = params => axios.get('/c/wx/wx-js-config', { params });
