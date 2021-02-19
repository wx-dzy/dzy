// 购物车列表
import { axios } from '@/utils';

// 添加到购物车
export const addShopping= params => axios.post('/c/goods-cart/add', params);


// 我的购物车列表
export const getMyCartList = params => axios.get('/c/goods-cart/list-my-cart' + params);

// 添加到购物车
// export const subAddGoodsCart= params => axios.post('/c/goods-cart/add', params);

// 删除购物车指定产品
export const removeByIds= params => axios.post('/c/goods-cart/remove-by-ids', params);

// 清空购物车
export const clearGoodsCart= params => axios.post('/c/goods-cart/empty-goods-cart', params);

// 我的收货地址列表
export const getMyEnterpriseAddress = params => axios.get('/c/enterprise-address/list-my-enterprise-address',{ params });

// 更新收货地址为使用中
export const updateAddressActive= params => axios.post('/c/enterprise-address/update-enterprise-address-in-use', params);

// 新增或更新收货地址
export const saveOrUpdateAddress= params => axios.post('/c/enterprise-address/save-or-update-enterprise-address', params);

// 购物车生成订单
export const subOrder= params => axios.post('/c/order/create-order', params);

// 更新购物车中商品数量
export const subNumberUpdates= params => axios.post('/c/goods-cart/update-product-quantity-in-goods-cart', params);
