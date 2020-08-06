import { axios } from '@/utils';

// 参展商首页-参展商列表（/c/enterprise-show-exhibitors/page/{enterpriseShowId}/{placeId}）
export const getExhibitorList = params => axios.get('/c/enterprise-show-exhibitors/page/' + params.enterpriseShowId + '/' + params.placeId);

// 参展商目录首页-顶部轮播图和展览馆/c/enterprise-show-exhibitors/get-detail-by-id/{enterpriseShowId}（{enterpriseShowId} 值为展会id）
export const getSwiperText = params => axios.get('/c/enterprise-show-exhibitors/get-detail-by-id/' + params);

// 参展商目录-参展商详情/c/enterprise-show-exhibitors/exhibitors-detail/{enterpriseExhibitorsId}
export const getExhibitor_details = params => axios.get('/c/enterprise-show-exhibitors/exhibitors-detail/' + params);

// 参展商目录-公司详情/c/enterprise-show-exhibitors/enterprise-detail/{enterpriseExhibitorsId}
export const getCompany_details = params => axios.get('/c/enterprise-show-exhibitors/enterprise-detail/' + params);

// 资源-公司详情/c/enterprise-show-exhibitors/enterprise-detail/{enterpriseExhibitorsId}
export const getEnterprise_details = params => axios.get('/c/enterprise/enterprise-detail/' + params);

// 参展商目录-企业人物-分页列表
export const getPerson = (enterpriseExhibitorsId, params) => axios.get('/c/enterprise-show-exhibitors/page-exhibitors-people/' + enterpriseExhibitorsId, { params });

// 参展商-企业基本信息
export const getExhibitorsInfo = params => axios.get('/c/enterprise-show-exhibitors/exhibitors-base-info/' + params);

// 参展商预约日历-获取人员等信息
export const getUserInfo = params => axios.get('/c/show-people-interview/exhibitors-user-info/' + params);

// 参展商预约日历-获取周数据
export const getWeekData = (data) => axios.post('/c/show-people-interview/exhibitors-user-calendar-by-week', data);

// 参展商预约日历-获取日数据
export const getTodayData = params => axios.get('/c/show-people-interview/exhibitors-user-calendar-by-day/' + params);

// 参展商目录-企业人物-详情
export const getPeopleDetails = params => axios.get('/c/enterprise-people/exhibitors-people-info/' + params);

// 企业产品目录-列表页
export const getGoods = data => axios.post('/c/enterprise-goods/goods-search', data);

// 关注/取消关注企业（人物）
export const getFollow = params => axios.post('/c/user-follow/follow', params);

// 参展商目录-索取资料
export const getInfomation = params => axios.get('/c/enterprise-show-exhibitors/request-enterprise-pdf/' + params);
// 资源企业-索取资料
export const getEnterpriseInfo = params => axios.get('/c/enterprise/request-enterprise-pdf/' + params);

// 参展商目录-预约日历-预约/取消预约
export const interview = (userPreInterviewDetailId, type) => axios.post('/c/show-people-interview/pre-interview/' + userPreInterviewDetailId + '/' + type);

// 参展商详情-展品列表 /c/enterprise-goods/goods-search
export const getGoodSearch = params => axios.post('/c/enterprise-goods/goods-search', params);

// 获取js配置

export const getAppId = params => axios.get('/c/wx/wx-js-config', { params });