import { axios } from '@/utils';

// get请求
// export const test = params => axios.get('/', {params});

// post请求
// export const test = params => axios.get('/', params);

/*登录*/
export const loginInit = params => axios.post('/c/login/mobile', params);

//  验证码
export const getMobile = params => axios.get('/c/sms/send-verify-code/login'+'/'+params);

// 获取js配置

export const getAppId = params => axios.get('/c/wx/wx-js-config', params);

// 获取openid
export const getOpenId = params => axios.get('/c/wx/get-open-id-by-code?code='+params);

// 根据openId获取用户信息
export const getUserInfo = params => axios.get('/c/wx/get-user-info-by-open-id?openId='+params);

// 首次登录-设置头像密码等
export const register = params => axios.post('/c/login/update-user-info-when-register',params);

