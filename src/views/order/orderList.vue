<template>
    <div class="panelBox">
        <div class="searchToolbar">
            <el-form 
                :model="rulesForm"
                size="small"
                :inline="true"
            >
                <el-form-item prop="pay_status" label="支付状态">
                    <el-select v-model="rulesForm.pay_status" @change="onSearchClick" clearable @clear="onSearchClick">
                        <el-option label="退款" :value="-3" ></el-option>
                        <el-option label="主动关闭" :value="-2" ></el-option>
                        <el-option label="超时关闭" :value="-1" ></el-option>
                        <el-option label="未发起支付" :value="0" ></el-option>
                        <el-option label="已支付" :value="1" ></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearchClick" size="small">搜索</el-button>
            </el-form>
        </div>
        <div class="table-box">
            <el-table 
                :data="tableData.items" 
                :height="tableHeight"
            >
                <el-table-column prop="" label="商品信息" min-width="300px">
                    <template slot-scope="scope">
                        <img v-lazy="domain+scope.row.commodities[0].thumbnail+'?x-oss-process=image/resize,m_fill,h_80,w_80'" alt="">
                        <div style="display:inline-block;line-height:86px; vertical-align:top;margin-left:60px;">{{scope.row.commodities[0].name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单价(元)" min-width="100px">
                    <template slot-scope="scope">
                        {{scope.row.commodities[0].price}}
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" min-width="80px">
                    <template slot-scope="scope">
                        {{scope.row.pay_genre===1?'支付宝':'微信'}}
                    </template>
                </el-table-column>
                <el-table-column label="商品合计(元)" prop="total_price" min-width="100px"></el-table-column>
                <el-table-column label="订单状态" min-width="100px" prop="pay_status" :formatter="payStatusFormatter"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button type="info" icon="el-icon-document" size="small" plain @click="onInfoClick(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                style="margin-top:5px;"
                @size-change="getData"
                @current-change="onPageChange"
                :current-page.sync="page"
                :page-size="limit"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"                   
                :total="tableData.total"
            ></el-pagination> 
        </div>
    </div>    
</template>
<script>
import { getOrderList } from '@/api/order';
export default {
    data(){
        return {
            rulesForm:{},
            page:1,
            limit:10,

            tableData:{
                items:[],
                total:0
            }
        }
    },
    computed:{
        domain(){
            return this.$domainUrl
        }
    },
    created(){
        this.tableHeight = window.innerHeight - 305 + "px";
        this.getData()
    },
    methods:{
        onSearchClick(){
            this.page=1;
            this.getData();
        },
        onInfoClick(record){
            this.$router.push({
                path:`/order/list/info/${record.id}`,
                query:{record}
            })
        },
        onPageChange(val){
            this.getData()
        },
        getData(){
            let params = {
                limit:this.limit,
                page:this.page,
                ...this.rulesForm
            }
            getOrderList(this._filterParams(params)).then(res=>{
                console.log(res)
                this.tableData = {
                    total:res.total,
                    items:res.items
                }
            })
        },
        payStatusFormatter(row,col){
            let ret= '';
            switch (row.pay_status){
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
    }
}
</script>
<style lang="less" scoped>
    @import url('../../assets/css/searchAndTable.less');
</style>
