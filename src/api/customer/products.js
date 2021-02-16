// 企业产品 目录
import { axios } from '@/utils';

// 参展商目录-企业人物-详情  /c/enterprise-people/exhibitors-people-info/{enterpriseShowPeopleId}
export const getExhibitorsPeopleInfo = params => axios.get('/c/enterprise-people/exhibitors-people-info/' + params);

// 企业产品目录-列表页  /c/enterprise-goods/goods-search
export const getGoodSearch= params => axios.post('/c/enterprise-goods/goods-search', params);

// 产品详情 /c/goods/goods-detail-by-id/{goodsId}
// export const getGoodDetailById = params => axios.get('/c/goods/goods-detail-by-id/' + params);


// 参展商-企业基本信息  /c/enterprise-show-exhibitors/exhibitors-base-info/{enterpriseExhibitorsId}
export const getExhibitorsBaseInfo = params => axios.get('/c/enterprise-show-exhibitors/exhibitors-base-info/' + params);

// 公司基本信息获取  /c/enterprise/get-enterprise-view-by-id/{enterpriseId}
export const getEnterpriseById = params => axios.get('/c/enterprise/get-enterprise-view-by-id/' + params);

// 新产品详情 /c/goods/get-sale-info-by-id/{goodsId} 
export const getGoodDetailById = params => axios.get('/c/goods/get-sale-info-by-id/'+params);

// 根据id获取询价单详情 /c/inquiry-order/to-inquire-order-add/{prodoctId}
export const getInquiryItem = params => axios.get(`/c/inquiry-order/to-inquire-order-add/${params}`);

// 保存询价单  /c/inquiry-order/save-inquiry-order
export const subInquiryOrder= params => axios.post('/c/inquiry-order/save-inquiry-order', params);

// 添加到购物车
export const addShopping= params => axios.post('/c/goods-cart/add', params);
