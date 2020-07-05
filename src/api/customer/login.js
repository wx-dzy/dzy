import { axios } from '@/utils';

// get请求
// export const test = params => axios.get('/', {params});

// post请求
// export const test = params => axios.get('/', params);

/*登录*/
export const loginInit = params => axios.post('url', params);
//  验证码

export const getMobile = params => axios.post('/c/login/mobile', params);

// 获取js配置

export const getAppId = params => axios.get('/c/wx/wx-js-config', params);
