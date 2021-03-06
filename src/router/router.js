export default [
    // {
    //     path: '/login',
    //     redirect: '/login'
    // },
    // demo
    // {
    //     path: '/Main',
    //     meta: {
    //         requiresAuth: false,
    //         title: 'demo',
    //     },
    //     name: 'Main',
    //     component: () => import('@/components/customer/Main.vue')
    // },
    // 手机号验证码登录
    {
        path: '/',
        meta: {
            requiresAuth: false,
            title: '登录',
        },
        name: 'login',
        component: () => import('@/views/customer/login/codeLogin.vue')
    },
    {
        path: '/codeLogin',
        meta: {
            requiresAuth: false,
            title: '手机号登录',
        },
        name: 'codeLogin',
        component: () => import('@/views/customer/login/codeLogin.vue')
    },
   

    // 注册
    {
        path: '/firstLogin',
        meta: {
            requiresAuth: false,
            title: '首次登录',
        },
        name: 'firstLogin',
        component: () => import('@/views/customer/login/firstLogin.vue')
    },

    // ---------------customer客户端------------------
    // 首页
    {
        path: '/home',
        meta: {
            requiresAuth: false,
            // title: '参观者-首页',
            // title: '参观观众',
            title: '采购方',
        },
        name: 'home',
        component: () => import('@/views/customer/home/index.vue')
    },
    // 会展详情
    {
        path: '/home_details',
        meta: {
            requiresAuth: false,
            title: '招采详情',
        },
        name: 'home_details',
        component: () => import('@/views/customer/home/components/home_details.vue')
    },
    // 公司简介
    {
        path: '/home_introduce',
        meta: {
            requiresAuth: false,
            title: '企业简介',
        },
        name: 'home_introduce',
        component: () => import('@/views/customer/home/components/home_introduce.vue')
    },

    // 展会日历
    {
        path: '/home_calendar',
        meta: {
            requiresAuth: false,
            title: '招采日历',
        },
        name: 'home_calendar',
        component: () => import('@/views/customer/home/components/home_calendar.vue')
    },

    // 展会日程
    {
        path: '/home_arrange',
        meta: {
            requiresAuth: false,
            title: '招采日程',
        },
        name: 'home_arrange',
        component: () => import('@/views/customer/home/components/home_arrange.vue')
    },

    // 展会预约
    {
        path: '/home_order',
        meta: {
            requiresAuth: false,
            // title: '参观预约',
            title: '参加预约',
        },
        name: 'home_order',
        component: () => import('@/views/customer/home/components/home_order.vue')
    },

    // 展会宣传片
    {
        path: '/home_trailer',
        meta: {
            requiresAuth: false,
            title: '招采宣传片',
        },
        name: 'home_trailer',
        component: () => import('@/views/customer/home/components/home_trailer.vue')
    },





    // 参展商目录-首页
    {
        path: '/exhibitor_home',
        meta: {
            requiresAuth: false,
            // title: '参展商目录-首页',
            title: '供应商目录-首页',
        },
        name: 'exhibitor_home',
        component: () => import('@/views/customer/exhibitor/exhibitor_home.vue')
    },
    {
        path: '/exhibitor_details',
        meta: {
            requiresAuth: false,
            // title: '参展商目录-参展商详情',
            title: '供应商目录-供应商详情',
        },
        name: 'exhibitor_details',
        component: () => import('@/views/customer/exhibitor/exhibitor_details')
    },
    {
        path: '/company_details',
        meta: {
            requiresAuth: false,
            // 参展商目录-公司详情
            title: '公司详情',
        },
        name: 'company_details',
        component: () => import('@/views/customer/exhibitor/company_details')
    },
    {
        path: '/appointment_calendar',
        meta: {
            requiresAuth: false,
            // title: '参展商目录-预约日历',
            title: '供应商目录-预约日历',
        },
        name: 'appointment_calendar',
        component: () => import('@/views/customer/exhibitor/appointment_calendar')
    },
    {
        path: '/person',
        meta: {
            requiresAuth: false,
            title: '企业人物',
        },
        name: 'person',
        component: () => import('@/views/customer/exhibitor/person')
    },
    {
        path: '/juridical_person',
        meta: {
            requiresAuth: false,
            title: '企业人物',
        },
        name: 'juridical_person',
        component: () => import('@/views/customer/exhibitor/juridical_person')
    },
    {
        path: '/exact_information',
        meta: {
            requiresAuth: false,
            title: '索取资料',
        },
        name: 'exact_information',
        component: () => import('@/views/customer/exhibitor/exact_information')
    },



    // ------------------   我的   start ------------------

    {
        path: '/personal',
        // redirect: '/personal/personal_index',
        meta: {
            requiresAuth: false,
            title: '我的',
        },
        name: 'personal',
        component: () => import('@/views/customer/personal/index.vue'),
        children: [
            // {
            //     path: 'personal_editCard',
            //     meta: {
            //         requiresAuth: false,
            //         title: '编辑名片',
            //     },
            //     name: 'personal_editCard',
            //     component: () => import('@/views/customer/personal/personal_editCard.vue'),
            // }
        ]
    },

    // {
    //     path: '/subscribeList',
    //     meta: {
    //         requiresAuth: false,
    //         title: '预约面谈列表',
    //     },
    //     name: 'subscribeList',
    //     component: () => import('@/views/customer/personal/subscribeList.vue'),
    // },

    {
        path: '/personal_editCard',
        meta: {
            requiresAuth: false,
            title: '编辑名片',
        },
        name: 'personal_editCard',
        component: () => import('@/views/customer/personal/personal_editCard.vue'),
    },
    {
        path: '/personal_editInfo',
        meta: {
            requiresAuth: false,
            title: '编辑个人信息',
        },
        name: 'personal_editInfo',
        component: () => import('@/views/customer/personal/personal_editInfo.vue'),
    },

    {
        path: '/personal_attestation',
        meta: {
            requiresAuth: false,
            title: '职业身份认证',
        },
        name: 'personal_attestation',
        component: () => import('@/views/customer/personal/personal_attestation.vue'),
    },
    {
        path: '/my_askFor_data',
        meta: {
            requiresAuth: false,
            title: '我索取的企业资料',
        },
        name: 'my_askFor_data',
        component: () => import('@/views/customer/personal/my_askFor_data.vue'),
    },
    {
        path: '/enterprise_admins',
        meta: {
            requiresAuth: false,
            title: '我的-首页-企业管理员',
        },
        name: 'enterprise_admins',
        component: () => import('@/views/customer/personal/enterprise_admins.vue'),
    },
    {
        path: '/addMember',
        meta: {
            requiresAuth: false,
            title: '添加成员',
        },
        name: 'addMember',
        component: () => import('@/views/customer/personal/addMember.vue'),
    },
    {
        path: '/MTaddMember',
        meta: {
            requiresAuth: false,
            title: '手动输入添加成员',
        },
        name: 'MTaddMember',
        component: () => import('@/views/customer/personal/MTaddMember.vue'),
    },
    
    {
        path: '/setDepartments',
        meta: {
            requiresAuth: false,
            title: '设置部门',
        },
        name: 'setDepartments',
        component: () => import('@/views/customer/personal/setDepartments.vue'),
    },
    {
        path: '/set',
        meta: {
            requiresAuth: false,
            title: '设置',
        },
        name: 'set',
        component: () => import('@/views/customer/personal/set.vue'),
    },
    // ------------------   我的   end ------------------


    // ------------------   资源   start ------------------
    {
        path: '/resources',
        meta: {
            requiresAuth: false,
            title: '关注资源',
        },
        name: 'resources',
        component: () => import('@/views/customer/resources/index.vue'),
    },
    // 资源-企业详情
    {
        path: '/resources_enterpriseDetail',
        // redirect: '/personal/personal_index',
        meta: {
            requiresAuth: false,
            title: '公司主页',
        },
        name: 'resources_enterpriseDetail',
        component: () => import('@/views/customer/resources/resources_enterpriseDetail.vue'),
    },

    // 资源-人物详情
    {
        path: '/resources_personDetail',
        meta: {
            requiresAuth: false,
            title: '关注的人物',
        },
        name: 'resources_personDetail',
        component: () => import('@/views/customer/resources/resources_personDetail.vue'),
    },

    // 资源-工作经历
    {
        path: '/resources_info',
        meta: {
            requiresAuth: false,
            title: '查看个人信息',
        },
        name: 'resources_info',
        component: () => import('@/views/customer/resources/resources_info.vue'),
    },


    // ------------------   资源   end ------------------


    // ------------------   企业产品目录 start------------------
    {
        path: '/products',
        meta: {
            requiresAuth: false,
            title: '企业产品目录',
        },
        name: 'products',
        component: () => import('@/views/customer/products/index.vue'),
    },

    {
        path: '/products_details',
        meta: {
            requiresAuth: false,
            title: '产品详情',
        },
        name: 'products_details',
        component: () => import('@/views/customer/products/products_details.vue'),
    },
    {
        path: '/products_uploadInquiry',
        meta: {
            requiresAuth: false,
            title: '上传询价单',
        },
        name: 'products_uploadInquiry',
        component: () => import('@/views/customer/products/products_uploadInquiry.vue'),
    },

    // 一对一视频
    {
        path: '/OneOnOneVideo',
        meta: {
            requiresAuth: false,
            // title: '参观者-首页',
            // title: '参观观众',
            title: '面谈',
        },
        name: 'OneOnOneVideo',
        component: () => import('@/components/customer/OneOnOneVideo/index.vue')
    },

    // ------------------   企业产品目录   end ------------------
    // 跳转pc页面
    {
        path: '/dazWebLink',
        meta: {
            requiresAuth: false,
            title: '',
        },
        name: 'dazWebLink',
        component: () => import('@/views/customer/jumpLink/dazWebLink.vue'),
    },



    // 修改密碼 changePassword
    // {
    //     path: '/changePassword',
    //     meta: {
    //         requiresAuth: false,
    //         title: '修改密码',
    //     },
    //     name: 'changePassword',
    //     component: () => import('@/views/personal/changePassword.vue')
    // },


    // 500
    {
        path: '/err-500',
        meta: {
            requiresAuth: false,
            title: '500',
        },
        name: 'err-500',
        component: () => import('@/views/error/err-500.vue')
    },

    // 404
    {
        path: '/err-404',
        meta: {
            requiresAuth: false,
            title: '404',
        },
        name: 'err-404',
        component: () => import('@/views/error/err-404.vue')
    },

    // 错误页面 重定向 跳转404
    // {
    //     path:'*',
    //     // 重定向
    //     redirect:{ name: 'err-404' }
    //     // redirect:'/err-404'
    // }
];