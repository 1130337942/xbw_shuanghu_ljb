<template>
    <div class="info_box">
        <img @click="onBackBtn" class="back_image" :src="require('../../assets/images/back.png')">
        <!-- <el-scrollbar style="width:120%;height:120%"> -->
        <el-form :model="rulesForm">
        <div class="form_title">订单详情</div>
            <el-row class="form_box">
                <el-col :span="12">
                    <el-form-item label="买家姓名:">
                        {{rulesForm.address_snapshot.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码:">
                        {{rulesForm.address_snapshot.phone}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="配送地址:">
                        {{rulesForm.address_snapshot.province+'-'+rulesForm.address_snapshot.city+'-'+rulesForm.address_snapshot.area+' '+rulesForm.address_snapshot.address}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付时间:">
                        ￥{{rulesForm.pay_time}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付状态:">
                        {{payStatus}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付方式:">
                        {{rulesForm.pay_genre===1?'支付宝':'微信'}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="订单号:">
                        {{rulesForm.order_id}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品合计:">
                        ￥{{rulesForm.total_price}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注:">
                        {{rulesForm.remark}}
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="form_title">商品详情</div>  
            <el-row class="form_box comodityItem" v-for="(item,index) in rulesForm.commodities" :key="index">
                <el-col :span="12" >
                    <el-form-item label="商品名称：">{{item.name}}</el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品年份：">{{item.years}}</el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品单价：">￥{{item.price}}</el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="商品图片:"></el-form-item>
                </el-col>
                <el-col :span="24" tag="div" class="commodityImgs">
                    <div class="imageCon thumbnail" @click="onViewImgClick(item.thumbnail)">
                        <img v-lazy="domain + item.thumbnail + '?x-oss-process=image/resize,m_fill,h_120,w_120'">
                    </div>
                    <div class="imageCon" v-for="(imgItem,imgIndex) in item.images" :key="imgIndex" @click="onViewImgClick(imgItem)">
                        <img v-lazy="domain + imgItem + '?x-oss-process=image/resize,m_fill,h_120,w_120'">
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="商品描述:">
                        <div v-html="item.description"></div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="info_box_footer text_center">
            <el-button type="danger" @click="onBackBtn">返回</el-button>
        </div>
        <!-- </el-scrollbar> -->
        <el-dialog :visible.sync="viewVisible" title="预览">
            <div class="viewImage_box">
                <img v-lazy="domain + viewSrc" >
            </div>
        </el-dialog>
    </div>    
</template>
<script>
import { getOrderInfo , getLocation } from '@/api/order';
export default {
    data(){
        return {
            rulesForm:{
                address_snapshot:{},
            },
            viewVisible:false,
            viewSrc:''
        }
    },
    computed:{
        domain(){
            return this.$domainUrl;
        },
        payStatus(){
            let ret = '';
            switch (this.rulesForm.pay_status){
                case -3:
                    ret='退款'
                    break;
                case -2:
                    ret='主动关闭'
                    break;
                case -1:
                    ret='超时关闭'
                    break;
                case 0:
                    ret='未发起支付'
                    break;
                case 1:
                    ret='已支付'
                    break;
            }
            return ret
        }
    },
    created(){
        let order_id = this.$route.params.id;
        let record = this.$route.query.record;
        getOrderInfo({order_id}).then(res=>{
            this.rulesForm = res;
            this.rulesForm.pay_genre = record.pay_genre;
            this.rulesForm.commodities = record.commodities;
        })
    },
    methods:{
        onBackBtn(){
            this.$router.back();
        },
        onViewImgClick(viewSrc){
            this.viewSrc = viewSrc;
            this.viewVisible = true;
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/info.less');
.info_box .commodityImgs {
    display: flex;
    justify-content: flex-start;
    flex-wrap:wrap;
    .thumbnail {
        margin: 0 20px 10px 30px; 
    }
    .imageCon:not(.thumbnail) {
        margin: 0 10px 10px;
    }
}
.viewImage_box {
    width: 100%;
    height: 50vh;
    text-align: center;
    img {
        max-width: 40vw;
        max-height: 50vh;
    }
}

.comodityItem {
    margin-bottom: 30px !important;
}
</style>
