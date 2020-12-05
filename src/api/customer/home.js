// 首页
import { axios } from '@/utils';

//  post
export const quotationList = params => axios.post('url', params);

// 首页-顶部轮播图列表/c/index/media-list
export const getHomeMediaList = params => axios.get('/c/index/media-list', {params});

// 首页-展会分页列表  /c/index/page
export const getHomePage = params => axios.get('/c/index/page', {params});

// 参观者-展会详情  /c/enterprise-show/get-by-id/{id}
export const getHomePageDetails= params => axios.get('/c/enterprise-show/get-by-id/'+params);

// 关注/取消关注企业（人物）  /c/user-follow/follow/{followStatus}
// export const setIsFollow = params => axios.post('/c/user-follow/follow', params);

// 展会企业介绍   /c/enterprise/get-enterprise-base-info-by-id/{enterpriseId}
export const getEnterpriseBaseInfoById= params => axios.get('/c/enterprise/get-enterprise-base-info-by-id/'+params);

// 参观者-展会日历列表 /c/enterprise-show/calendar/list-by-enterprise-id/{enterpriseId}
export const getCalendarListByEnterpriseId= params => axios.get('/c/enterprise-show/calendar/list-by-enterprise-id/'+params);

// 参观者-展会宣传片-详情  /c/enterprise-show/get-by-id-for-calendar/{enterpriseShowId}
export const getByIdForCalendar= params => axios.get('/c/enterprise-show/get-by-id-for-calendar/'+params);

// 承办公司-单个会展预约-发送验证码 /c/show-order/send-verify-code/{enterpriseShowId}/{mobile}
export const getSendVerifyCode= params => axios.get('/c/show-order/send-verify-code/'+params.enterpriseShowId + '/' + params.mobile);

// 承办公司-单个会展预约  /c/show-order/add
export const setShowOrderAdd = params => axios.post('/c/show-order/add', params);

// 参展商目录-首页-参展商列表 /c/enterprise-show/page/{enterpriseShowId}
export const getSupplierList= params => axios.get(`/c/enterprise-show/page/${params.enterpriseShowId}`,{params});

// 展会详情首页，我的面谈预约  /c/enterprise-show/list-my-interview/{enterpriseShowId}
export const getListMyInterview= params => axios.get(`/c/enterprise-show/list-my-interview/${params.enterpriseShowId}`,{params});
