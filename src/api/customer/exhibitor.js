import { axios } from '@/utils';

// 参展商首页-参展商列表（/c/enterprise-show-exhibitors/page/{enterpriseShowId}/{placeId}）
export const getExhibitorList = params => axios.get('/c/enterprise-show-exhibitors/page/' + params);

// 参展商目录首页-顶部轮播图和展览馆/c/enterprise-show-exhibitors/get-detail-by-id/{enterpriseShowId}（{enterpriseShowId} 值为展会id）
export const getSwiperText = params => axios.get('/c/enterprise-show-exhibitors/get-detail-by-id/' + params);

// 参展商目录-参展商详情/c/enterprise-show-exhibitors/exhibitors-detail/{enterpriseExhibitorsId}
export const getExhibitor_details = params => axios.get('/c/enterprise-show-exhibitors/exhibitors-detail/' + params);