// 资源
import { axios } from '@/utils';


// 资源-企业首页  /c/user-follow/page-enterprise
export const getFollowPage = params => axios.post('/c/user-follow/page-enterprise', params);

// 资源-人物首页
export const getPeoplePage = params => axios.post('/c/user-follow/page-people', params);

// 资源-企业详情 /c/user-follow/enterprise-detail-by-id/{enterpriseId}
export const getEnterpriseDetailById = params => axios.get('/c/user-follow/enterprise-detail-by-id/' + params);










