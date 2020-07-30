// 我的
import { axios } from '@/utils';

//  post
// export const quotationList = params => axios.post('url', params);

// 我-首页 /c/user/my-index
export const getUserMyIndex = params => axios.get('c/user/my-index', { params });

// 我-首页-我的预约列表  /c/user-interview/my-interview
export const getMyInterviewPage = params => axios.get('/c/user-interview/my-interview', { params });

// 参展商目录-预约日历-预约/取消预约
export const setCancelInterview = params => axios.post('/c/show-people-interview/pre-interview/' + params.userPreInterviewDetailId + '/' + params.type,);

// 切换身份
export const setChangeIdentity = () => axios.get('/c/user/list-enterprise-by-login-user');

// 编辑个人信息-获取信息
export const getUserInfo = params => axios.get('/c/user/get-user-base-info', params,);

// 编辑个人信息-保存
export const saveUserInfo = params => axios.post('/c/user/update-user-base-info', params,);

// 编辑名片信息-获取-新增职位
export const editCardGet = params => axios.get('/c/user/to-new-user-card' + params);

// 编辑名片信息-保存
export const editCardSave = params => axios.post('/c/user/save-user-card', params,);

// 编辑名片信息-获取
export const editCardGetEdit = params => axios.get('/c/user/get-user-card-by-id/' + params);

// 我索取的资料-分页列表
export const askMessage = params => axios.get('/c/user/user-request-file/page', { params });

// 我-首页-系统管理员
export const indexAdmin = () => axios.get('/c/user/my-index-as-admin');

// 成员加入待确认-通过（不通过）  
export const applyUsertoEnterprise = params => axios.post('/c/user/apply-user-to-enterprise', params);
