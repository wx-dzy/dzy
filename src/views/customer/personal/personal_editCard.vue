<template>
    <!-- 编辑名片 -->
    <div class="personal_editCard">
        <router-view />
        <div class="box">
            <van-field name="upPhoto" label="上传LOGO">
                <template #input>
                    <img
                        src="http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg"
                        alt
                    />
                    <van-icon name="arrow" />
                </template>
            </van-field>
            <!-- 公司/单位 -->
            <div class="Company">
                <div class="title">
                    <span>公司/单位</span>
                    <span class="authentication">去认证</span>
                </div>
                <van-field
                    v-model="username"
                    name="公司名称"
                    label="公司名称"
                    required
                    placeholder="请输入中文公司/单位名称"
                    :rules="[{ required: true, message: '请输入中文公司/单位名称' }]"
                />
                <van-field
                    v-model="username"
                    name="公司名称EN"
                    label="公司名称EN"
                    placeholder="请输入英文公司/单位名称"
                    :rules="[{ required: true, message: '请输入英文公司/单位名称' }]"
                />
            </div>
            <!-- 姓名 -->
            <div class="name">
                <div class="title">
                    <span>姓名</span>
                </div>
                <van-field
                    v-model="username"
                    name="姓名"
                    label="姓名"
                    required
                    placeholder="请输入中文名（必填）"
                    :rules="[{ required: true, message: '请输入中文名（必填）' }]"
                />
                <van-field v-model="value1" name="姓名EN" label="姓名EN" placeholder="Patter" />
            </div>
            <!-- 职位/岗位 -->
            <div class="position">
                <div class="title">
                    <span>职位/岗位</span>
                </div>
                <van-field
                    v-model="username"
                    name="职位"
                    label="职位"
                    required
                    placeholder="请输入中文公司/单位名称"
                    :rules="[{ required: true, message: '请输入中文公司/单位名称' }]"
                />
                <van-field
                    v-model="username"
                    name="职位EN"
                    label="职位EN"
                    placeholder="请输入英文公司/单位名称"
                    :rules="[{ required: true, message: '请输入英文文公司/单位名称' }]"
                />
            </div>
            <!-- 在职时间 -->
            <div class="time">
                <div class="title">
                    <span>在职时间</span>
                    <span class="notes">（注：结束时间如果选择“至今”）</span>
                </div>
                <van-field
                    v-model="username"
                    name="开始时间"
                    label="开始时间"
                    placeholder="请输入开始时间"
                    :rules="[{ required: true, message: '请输入开始时间' }]"
                />
                <van-field
                    v-model="username"
                    name="结束时间"
                    label="结束时间"
                    placeholder="请输入结束时间"
                    :rules="[{ required: true, message: '请输入结束时间' }]"
                />
            </div>
            <!-- 联系方式 -->
            <div class="position">
                <div class="title">
                    <span>联系方式</span>
                </div>
                <van-field
                    v-model="phone"
                    required
                    label="电话号码"
                    placeholder="请输入电话号码"
                    :rules="[{ required: true, message: '电话号码格式错误' }]"
                />
                <van-field
                    v-model="username"
                    name="邮箱地址"
                    required
                    label="邮箱地址"
                    placeholder="请输入邮箱地址"
                    :rules="[{ required: true, message: '请输入邮箱地址' }]"
                />
            </div>
            <!-- 公司所属行业 -->
            <div class="industry">
                <div class="title">
                    <span>公司所属行业</span>
                </div>
                <van-field v-model="industry" label="行业" placeholder="请输入中文名(必填)" />
                <van-field v-model="industry_en" name="行业EN" label="行业EN" placeholder="请输入英文名" />
            </div>
            <!-- 公司地址 -->
            <div class="industry">
                <div class="title">
                    <span>公司所属行业</span>
                </div>
                <van-field
                    v-model="address"
                    label="省市区"
                    placeholder="请选择省市区"
                    @click="chooseAdd"
                    readonly
                />
                <van-field v-model="addressDetail" name="详细地址" label="详细地址" placeholder="请输入详细地址" />
                <van-field
                    v-model="addressDetail_en"
                    name="地址"
                    label="地址EN"
                    placeholder="请输入英文版地址"
                />
                <van-action-sheet v-model="chooseAds" title>
                    <div class="content">
                        <van-area
                            title="请选择省市区"
                            :area-list="addressList"
                            class="chooseAdd"
                            @confirm="confirmAdd"
                            @cancel="cancelAdd"
                        />
                    </div>
                </van-action-sheet>
            </div>
            <!-- 工作描述1 -->
            <div class="describe_1">
                <div class="title">
                    <span>工作描述1</span>
                </div>
                <van-field v-model="describe_1" name="describe_1" placeholder>
                    <template #button>
                        <i size="small" type="default">...</i>
                    </template>
                </van-field>
            </div>
            <!-- 工作描述2 -->
            <div class="describe_1">
                <div class="title">
                    <span>工作描述2</span>
                </div>
                <van-field v-model="describe_2" name="describe_2" placeholder>
                    <template #button>
                        <i size="small" type="default">...</i>
                    </template>
                </van-field>
            </div>
        </div>
    </div>
</template>

    <script>
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/personal'
import visitingCard from '@/components/customer/visitingCard.vue'
import AddressList from '@/assets/js/area'

export default {
    name: 'personal_editCard',
    components: {
        // 名片
        visitingCard,
    },
    data() {
        return {
            value1: 'Patter',
            // uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
            username: '',
            detail: {
                infoImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                name: 'xiaogang0-0',
                status: 1,
                activeInfo: '参观房',
            },
            phone: '',
            pageSize: 10,
            pageNum: 1,
            industry: '', // 公司所属行业
            industry_en: '', // 公司所属行业英文
            chooseAds: false, // 是否显示选择地址
            addressList: AddressList, // 地址列表
            address: '', //地址
            addressDetail: '', //详细地址
            addressDetail_en: '', // 英文详细地址
            describe_1: '负责系统维护工作…', // 工作描述1
            describe_2: '负责系统维护工作…', // 工作描述2
        }
    },

    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    watch: {},
    methods: {
        // 选择省市区点击取消按钮
        cancelAdd() {
            this.chooseAds = false
        },
        // 选择省市区点击确认按钮
        confirmAdd(e) {
            this.address = e[0].name + ' ' + e[1].name + ' ' + e[2].name
            console.log('name', this.address)
            this.chooseAds = false
        },
        // 选择省市区
        chooseAdd() {
            console.log('123')
            this.chooseAds = true
        },
        onsubmt() {
            Api.getHomePage(params)
                .then((res) => {
                    let { code, msg, data, total } = res
                    // 加载状态结束
                    this.loading = false
                    if (code == 200) {
                    }
                })
                .catch((err) => {
                    console.log(err, 'err')
                })
        },

        handleSetInfo(row) {
            this.$router.push({
                name: 'personal_details',
                query: {
                    id: row.enterpriseId,
                },
            })
        },

        // 查看详情
        handleLook(row) {
            this.$router.push({
                name: 'personal_details',
                query: {
                    // 企业id
                    id: row.enterpriseId,
                    // title: row.enterpriseName
                },
            })
        },
    },

    computed: {},

    mounted() {
        this.$nextTick().then(() => {
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 0)
        })
    },
}
</script>

    <style lang="scss" scoped>
@import '@/assets/styles/base/calc_vm.scss';
@import './personal.scss';
.nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
}
.personal_editCard {
    background: #f7f8faff;
    .box {
        .van-field {
            width: 7.5rem;
            height: 1.12rem;
            // line-height: 1.12rem;
            font-size: 0.32rem;
            color: #313437;
            img {
                margin: auto 0;
                width: 0.96rem;
                height: 0.96rem;
                border-radius: 50%;
                margin-left: 3rem;
                margin-right: 0.3rem;
            }
            i {
                color: #000 !important;
                padding: 0 0.4rem 0.1rem 0.4rem;
                background: #e9e9e9ff;
                font-weight: 700;
                border-radius: 10.5px;
            }
        }
        .title {
            padding: 0.2rem;
            color: #888888ff;
        }
    }
}
/deep/ .van-cell {
    height: 1.12rem;
    line-height: 1.12rem;
    padding: 0px 0.34rem;
}
// 必选项位置
// /deep/ .van-cell--required::before {

// }
</style>

