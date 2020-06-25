import { axios } from '@/utils';

export const quotationList = params => axios.post('url', params);

// 参展商首页-参展商列表（/c/enterprise-show-exhibitors/page/{enterpriseShowId}/{placeId}）
export const getExhibitorList = params => axios.get('/c/enterprise-show-exhibitors/page', {params});

// 参展商目录首页-顶部轮播图和展览馆/c/enterprise-show-exhibitors/get-detail-by-id/{enterpriseShowId}
export const getSwiperText = params => axios.get('/c/enterprise-show-exhibitors/get-detail-by-id', {params});