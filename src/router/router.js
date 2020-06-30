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
            title: '参展商目录-公司详情',
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





    // 订单列表
    // {
    //     path: '/orderList',
    //     redirect: '/orderList/toBeQuoted',
    //     meta: {
    //         requiresAuth: false,
    //         title: '询价单列表',
    //     },
    //     name: 'orderList',
    //     component: () => import('@/views/orderList/orderList.vue'),
    //     children: [
    //         // 待报价 
    //         {
    //             path: 'toBeQuoted',
    //             meta: {
    //                 requiresAuth: false,
    //                 title: '询价单列表',
    //             },
    //             name: 'orderList-toBeQuoted',
    //             component: () => import('@/views/orderList/components/toBeQuoted.vue'),
    //         },
    //         // 已报价
    //         {
    //             path: 'quotedPrice',
    //             meta: {
    //                 requiresAuth: false,
    //                 title: '询价单列表',
    //             },
    //             name: 'orderList-quotedPrice',
    //             component: () => import('@/views/orderList/components/quotedPrice.vue'),
    //         },
    //         // 已完成
    //         {
    //             path: 'completed',
    //             meta: {
    //                 requiresAuth: false,
    //                 title: '询价单列表',
    //             },
    //             name: 'orderList-completed',
    //             component: () => import('@/views/orderList/components/completed.vue'),
    //         },
    //         // 已超时
    //         {
    //             path: 'overtime',
    //             meta: {
    //                 requiresAuth: false,
    //                 title: '询价单列表',
    //             },
    //             name: 'orderList-overtime',
    //             component: () => import('@/views/orderList/components/overtime.vue'),
    //         }
    //     ]
    // },


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