// 资源
import { axios } from '@/utils';


// 资源-企业首页  /c/user-follow/page-enterprise
export const getFollowPage = params => axios.post('/c/user-follow/page-enterprise', params);

// 资源-人物首页
export const getPeoplePage = params => axios.post('/c/user-follow/page-people', params);

// 资源-企业详情 /c/user-follow/enterprise-detail-by-id/{enterpriseId}
export const getEnterpriseDetailById = params => axios.get('/c/user-follow/enterprise-detail-by-id/' + params);

// 企业产品目录-列表页
export const getGoodsSearch = params => axios.post('/c/enterprise-goods/goods-search', params);

// 资源-人物详情页  people-detail-by-id/{userId}
export const getPeopleDetailById = params => axios.get('/c/user-follow/people-detail-by-id/' + params);

// 编辑名片信息-获取 /c/user/get-user-card-by-id/{userCardId}
export const getUserCardById = params => axios.get('/c/user/get-user-card-by-id/' + params);






