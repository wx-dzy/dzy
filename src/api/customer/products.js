// 企业产品 目录
import { axios } from '@/utils';

// 参展商目录-企业人物-详情  /c/enterprise-people/exhibitors-people-info/{enterpriseShowPeopleId}
export const getExhibitorsPeopleInfo = params => axios.get('/c/enterprise-people/exhibitors-people-info/' + params);

// 企业产品目录-列表页  /c/enterprise-goods/goods-search
export const getGoodSearch= params => axios.post('/c/enterprise-goods/goods-search', params);

// 产品详情 /c/goods/goods-detail-by-id/{goodsId}
export const getGoodDetailById = params => axios.get('c/user/my-index', {params});

// 查看全部企业产品目录 接口地址  http://rap2.taobao.org/repository/editor?id=258218&mod=389957&itf=1629307
// 查看产品详情 接口地址  http://rap2.taobao.org/repository/editor?id=258218&mod=389957&itf=1631624


// 企业产品目录-列表页  getGoodSearch   products


