export default [
    {
        path: '',
        redirect: '/login'
    },
    // demo
    {
        path: '/Main',
        meta: {
            requiresAuth: false,
            title: 'demo',
        },
        name: 'Main',
        component: () => import('@/components/customer/Main.vue')
    },
    // 登录
    {
        path: '/login',
        meta: {
            requiresAuth: false,
            title: '登录',
        },
        name: 'login',
        component: () => import('@/views/customer/login/login.vue')
    },
    // 注册
    //  {
    //     path: '/login',
    //     meta: {
    //         requiresAuth: false,
    //         title: '登录',
    //     },
    //     name: 'login',
    //     component: () => import('@/views/customer/login/login.vue')
    // },

    // ---------------customer客户端------------------
    // 首页
    {
        path: '/home',
        meta: {
            requiresAuth: false,
            // title: '参观者-首页',
            title: '参观观众',
        },
        name: 'home',
        component: () => import('@/views/customer/home/index.vue')
    },
    // 会展详情
    {
        path: '/home_details',
        meta: {
            requiresAuth: false,
            title: '会展详情',
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
            title: '展会日历',
        },
        name: 'home_calendar',
        component: () => import('@/views/customer/home/components/home_calendar.vue')
    },

    // 展会日程
    {
        path: '/home_arrange',
        meta: {
            requiresAuth: false,
            title: '展会日程',
        },
        name: 'home_arrange',
        component: () => import('@/views/customer/home/components/home_arrange.vue')
    },

    // 展会预约
    {
        path: '/home_order',
        meta: {
            requiresAuth: false,
            title: '参观预约',
        },
        name: 'home_order',
        component: () => import('@/views/customer/home/components/home_order.vue')
    },

    // 展会宣传片
    {
        path: '/home_trailer',
        meta: {
            requiresAuth: false,
            title: '展会宣传片',
        },
        name: 'home_trailer',
        component: () => import('@/views/customer/home/components/home_trailer.vue')
    },





    // 参展商目录-首页
    {
        path: '/exhibitor_home',
        meta: {
            requiresAuth: false,
            title: '参展商目录-首页',
        },
        name: 'exhibitor_home',
        component: () => import('@/views/customer/exhibitor/exhibitor_home.vue')
    },
    {
        path: '/exhibitor_details',
        meta: {
            requiresAuth: false,
            title: '参展商目录-参展商详情',
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
            title: '参展商目录-预约日历',
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
            title: '法人详情',
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

    {
        path: 'personal_editCard',
        meta: {
            requiresAuth: false,
            title: '编辑名片',
        },
        name: 'personal_editCard',
        component: () => import('@/views/customer/personal/personal_editCard.vue'),
    },
    {
        path: 'personal_editInfo',
        meta: {
            requiresAuth: false,
            title: '编辑个人信息',
        },
        name: 'personal_editInfo',
        component: () => import('@/views/customer/personal/personal_editInfo.vue'),
    },

    {
        path: 'personal_attestation',
        meta: {
            requiresAuth: false,
            title: '职业身份认证',
        },
        name: 'personal_attestation',
        component: () => import('@/views/customer/personal/personal_attestation.vue'),
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
    // ------------------   企业产品目录   end ------------------



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