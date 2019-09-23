<template>
    <div class="merchant_home">
        <div class="text_center">
            <router-link to="/merchantApply">
                <el-button >去申请商家</el-button>
            </router-link>
        </div>
        <el-form :model="userInfo" :inline="false">
            <el-form-item label="入驻费: ">
                {{ userInfo.admission_money }}
            </el-form-item>
            <el-form-item label="所在省份: ">
                {{ userInfo.province }}
            </el-form-item>
            <el-form-item label="所在城市: ">
                {{ userInfo.city }}
            </el-form-item>
            <el-form-item label="收藏: ">
                {{ userInfo.collection }}
            </el-form-item>
            <el-form-item label="栏目排序: ">
                {{ userInfo.column_sort }}
            </el-form-item>
            <el-form-item label="栏目是否置顶: ">
                {{ userInfo.column_top===0?'未置顶':'置顶' }}
            </el-form-item>
            <el-form-item label="创建时间: ">
                {{ userInfo.create_time }}
            </el-form-item>
            <el-form-item label="店铺描述: ">
                {{ userInfo.description }}
            </el-form-item>
            <el-form-item label="是否营业: ">
                {{ userInfo.do_business===0?'未营业':'营业' }}
            </el-form-item>
            <el-form-item label="定金: ">
                {{ userInfo.earnest_money }}
            </el-form-item>
            <el-form-item label="商铺类型: ">
                {{ userInfo.genre===1?'个人商铺':'企业商铺' }}
            </el-form-item>
            <el-form-item label="首页排序: ">
                {{ userInfo.home_sort }}
            </el-form-item>
            <el-form-item label="首页置顶: ">
                {{ userInfo.home_top===0?'未置顶':'置顶'}}
            </el-form-item>
            <el-form-item label="logo: ">
                {{ userInfo.logo}}
            </el-form-item>
            <el-form-item label="手机号码: ">
                {{ userInfo.phone}}
            </el-form-item>
            <el-form-item label="分数/星: ">
                {{ userInfo.score}}
            </el-form-item>
            <el-form-item label="店铺所属分类: ">
                {{ merchantType }}
            </el-form-item>
            <el-form-item label="status: ">
                {{ userInfo.status }}
            </el-form-item>
        </el-form>
    </div>    
</template>
<script>
export default {
    data(){
        return {}
    },
    computed:{
        userInfo(){
            return this.$store.state.userInfo;
        },
        merchantType(){
            let ret = '';
            switch (this.userInfo.merchant_type) {
                case 1:
                    ret = '优店';
                    break;
                case 2:
                    ret = '古玩';
                    break;
                case 3:
                    ret = '画廊';
                    break;
            }
            return ret
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
    .merchant_home {
        width: 100%;
        overflow: hidden;
        min-height: 100%;
        display: block;
        box-sizing: border-box;
        background-color: #ffffff;
        .merchant_data {
            height: 128px;
            width: 100%;
            padding: 0 10px;
            .el-row,.el-col {
                height: 100%;
            }
        }
    }
</style>
