# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

### 发布
```
    # 构建生产环境
    npm run build
    # 构建測試环境
    npm run build-test
    # 构建本地环境
    npm run build-demo
```
### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
configureWebpack: {
    externals {
        moment: {
            commonjs: 'moment',
            amd: 'moment',
            root:  'moment'
        }
    }
}
```

### 项目地址
git clone https://github.com/wx-dzy/dzy.git

### 开发环境

node版本 8.11.4
npm版本 5.6.0
yarn版本 1.12.3

### ui开发文档
https://youzan.github.io/vant/#/zh-CN/home
https://youzan.github.io/vant/1.x/#/zh-CN/intro

    vue-video-player
    https://www.npmjs.com/package/vue-video-player
    
    https://www.jianshu.com/p/532fc1d8c90c
    https://blog.csdn.net/fei565789229/article/details/78925395
### 使用技巧
https://juejin.im/post/5cbff700e51d456e361ed904

### 设计图ui地址

### 接口地址


### src/api、 srv/views   两个文件夹 分系统开发
    ```  
    客户端:  customer  (目前开发)
    管理端   admin （未来需求）
    ```

### 测试账户
    ```

    ```
### 主要色调
    ```
    深色#313437
    深灰#9DA1A6
    浅灰#E9E9E9
    黄色#F8D57E
```

## 临时token
    ```
    util.setCookie('dzy_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU0Mjg3MzMsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IkMzUWxUQW9nTzQxNEJwLUE1SU9CX1ZjNTR6RSIsImNsaWVudF9pZCI6ImR6eS1jbG91ZC1zaG93LWNsaWVudC0xIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.JzRnqIly2A9F--sd8iAAFpBr-7HBIYvTKr Y1AusD59U',365)
    ```

## 开发时获取code临时
    ```
    // 开发的时候调用  开发完注销调
    if( !util.getQueryString('code')){
        window.location.href="http://121.196.122.19/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=http://127.0.0.1:9000&response_type=code&scope=snsapi_base&state=123"
    } 
    ```

### 待完善
    ```
    播放组件 当前播放 其他暂停功能  暂停显示封面功能
    资源tabs切换 加默认选中
    Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)


    蓝湖的修改
    资源-工作经历
    资源 企业产品目录列表 及详情 
    我的
    
    ```

### demo
    ```
    1，用户首页

    http://121.196.122.19/hlwl_wexin/userManager.html?username=huangzb&telephone=17601001098

    2，询价单列表

    http://121.196.122.19/hlwl_wexin/uploadInquiry/order/tobeQuoted.html

    3，上传询价单

    http://121.196.122.19/hlwl_wexin/uploadInquiry/submit-inquiry.html

    4，合同待签署列表

    http://121.196.122.19/hlwl_wexin/manager/purchaseContract/awaitContract.html

    5，订单待发货列表

    http://121.196.122.19/hlwl_wexin/orderRemake/orderList.html?orderStatus=2
    ```

### 公用方法 
    1. 获取openId:  util.getCookie('dzy_openId')
    2. 获取token:   util.getCookie('dzy_token') 
    2. 获取userInfo:   JSON.parse(util.getCookie('dzy_userInfo')) 
    4. 获取微信信息:  JSON.parse(util.getCookie('dzy_wxInfo'))
 