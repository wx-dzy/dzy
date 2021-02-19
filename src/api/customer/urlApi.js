// url 跳转

// router 使用实例
// export const goOrderList = params => {
//   console.log(params,'params参数')
//   return window.vm.$router.push({
//       name: "addressPage",
//     });
// }

// 运行环境
const env = process.env.NODE_ENV === 'development' ?
  'development' :
  process.env.VUE_APP_MODE === 'test' ? 'test' :
    process.env.VUE_APP_MODE === 'demo' ? 'demo' :
      'production';
// console.log(env, '运行环境env{production:线上;test:测试;development:本地;}')



// login页面登陆
export const goLogin = params => {
  // 测试地址
  let urlText = 'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_userinfo&state=123&redirect_uri=https://www.dzy315.com/&response_type=code'
  // 正式地址
  let urlProd = 'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_userinfo&state=123&redirect_uri=https://www.dzy315.com/&response_type=code'
  // 正式
  if (env === 'production') {
    return window.location.href = urlProd
  } else {
    // 测试
    return window.location.href = urlText
  }
}

// codeLogin页面登陆
export const goCodeLogin = params => {
  let _url = env == 'development' ? 'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=http://127.0.0.1:9000/codeLogin?&response_type=code&scope=snsapi_base&state=123' :
    env == 'test' ? 'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=https://www.dzy315.com/dzy-wx-test/codeLogin&response_type=code' :
      env == 'production' ? 'https://www.dzy315.com/get-weixin-code.html?appid=wxb5ea1c14b28400c1&scope=snsapi_base&state=123&redirect_uri=https://www.dzy315.com/dzy-wx-product/codeLogin&response_type=code' : ''
  return window.location.href = _url
}


// 查看询价单
export const goInquiryList = params => {
  // 测试地址
  let urlText = 'https://www.dzy315.com/dzy-order/uploadInquiry/order/tobeQuoted.html'
  // 正式地址
  let urlProd = 'https://www.dzy315.com/dzy-order/uploadInquiry/order/tobeQuoted.html'
  // 正式
  if (env === 'production') {
    return window.location.href = urlProd
  } else {
    // 测试
    return window.location.href = urlText
  }
}

// 查看订单
export const goOrderList = params => {
  // 测试地址
  let urlText = 'https://www.dzy315.com/dzy-order/orderRemake/orderList.html'
  // 正式地址
  let urlProd = 'https://www.dzy315.com/dzy-order/orderRemake/orderList.html'
  // 正式
  if (env === 'production') {
    return window.location.href = urlProd
  } else {
    // 测试
    return window.location.href = urlText
  }
}


// 查看三端列表 (三端首页)
export const goUserManager = params => {
  // 测试地址
  let urlText = 'https://www.dzy315.com/dzy-order/userManager.html?username=huangzb&telephone=17601001098'
  // 正式地址
  let urlProd = 'https://www.dzy315.com/dzy-order/userManager.html?username=huangzb&telephone=17601001098'
  // 正式
  if (env === 'production') {
    return window.location.href = urlProd
  } else {
    // 测试
    return window.location.href = urlText
  }
}


// 跳转pc管理端
export const goDazWebLink = params => {
  // 测试地址
  let urlText = 'http://platform.dzy315.com'
  // 正式地址
  let urlProd = 'http://platform.dzy315.com'
  // 正式
  if (env === 'production') {
    return window.location.href = urlProd
  } else {
    // 测试
    return window.location.href = urlText
  }
}






