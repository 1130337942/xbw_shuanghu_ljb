<template>
    <div class="panelBox">
        <div class="top">
            <el-form 
                :model="rulesForm" 
                :inline="true"
                label-width="75px"
                ref="ruleForm"
                class="demo-ruleForm"
                label-position="left"
                size="small"
            >
                <el-form-item prop="name" label="商品名称:">
                    <el-input v-model="rulesForm.name" clearable @clear="onSearchClick"></el-input>
                </el-form-item>
                <el-form-item prop="application_status" label="审核状态:" label-width="90px">
                    <el-radio-group v-model="rulesForm.application_status" @change="onSearchClick">
                        <el-radio-button :label="-1">待审核</el-radio-button>
                        <el-radio-button :label="1">通过</el-radio-button>
                        <el-radio-button :label="0">失败</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="boutique" label="是否为精品:" label-width="90px">
                    <el-radio-group v-model="rulesForm.boutique" @change="onSearchClick">
                        <el-radio-button :label="1">是</el-radio-button>
                        <el-radio-button :label="0">否</el-radio-button>
                        <el-radio-button :label="false">全部</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  label="一级分类:" prop="genre_one">
                    <el-select 
                        v-model="rulesForm.genre_one" 
                        @clear="onSearchClick" 
                        @change="onOneGenerChange" 
                        clearable
                    >
                        <el-option
                            v-for="(item,index) in classisOneData"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="genre_two" label="二级分类:">
                    <el-select 
                        v-model="rulesForm.genre_two" 
                        :clearable="true"
                        @clear="onSearchClick"
                        :disabled="towGenerDisabled" 
                        ref="genreTwoSelect"
                    >
                        <el-option
                            v-for="(item,index) in classisTwoData"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-button @click="onSearchClick" type="primary" icon="el-icon-search" size="small">搜索</el-button>
            </el-form>
        </div>
        <div class="table-box">
            <el-button type="primary" plain @click="onAddBtn" size="small">添加商品</el-button>
            <el-table
                size="medium"
                :data="tableData.items"
                :height="tableHeight.height"
                v-loading="tableLoading"
                style="width: 100%;margin-top:10px;"
            >
                <el-table-column label="名称" prop="name" min-width="200px" align="center" fixed="left"></el-table-column>
                <el-table-column label="商品ID" prop="id" min-width="200px" align="center" ></el-table-column>
                <el-table-column label="排序" min-width="150px" align="center">
                    <template slot-scope="scope">
                        {{scope.row.sort}}
                    </template>
                </el-table-column>
                <el-table-column label="是否精品" min-width="120px" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.boutique" :active-value="1" :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="是否推荐" min-width="120px" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.recommend" :active-value="1" :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column label="是否置顶" min-width="120px" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.top" :active-value="1" :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否显示" min-width="120px" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.release" :active-value="1" :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="一级分类" prop="genre_one" min-width="120px" align="center"></el-table-column>
                <el-table-column label="二级分类" prop="genre_two" min-width="120px" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" min-width="200px" align="center"></el-table-column>
                <el-table-column label="审核状态" prop="application_status" min-width="120px" align="center" :formatter="formatter">
                    <!-- <template slot-scope="scope">
                        <div>{{scope.application_status!='-1'?(scope.application_status=='1'?'已通过':'未通过'):'未审核'}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column label="操作" min-width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="onEditClick(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
import { getCommoditylist , getClassisData } from '@/api/commodity';
export default {
    name:'commodity_list',
    data(){
        return {
            rulesForm:{
                name:'',
                merchant_name:'',
                application_status:1,
                boutique:false,
                genre_one:'',
                genre_two:'',
            },
            statusData:[],
            classisOneData:[],
            classisTwoData:[],

            merchantData:[],
            tableLoading:false,
            tableHeight:{height:'0px'},

            page:1,
            limit:10,
            tableData:{
                items:[],
                total:0 
            },
            isCache:false,

            isCreate:false,
        }
    },
    computed: {
        towGenerDisabled(){
            return this.rulesForm.genre_one||this.rulesForm.genre_one===0?false:true
        },
        // ...mapGetters('commodity',['getPage','getRulesForm'])
    },
    created(){
        console.log('created')
        this.tableHeight.height = window.innerHeight - 340 + "px";
        this.getData();
        this.getCascaderData()
        this.isCreate = true;
    },
    activated(){
        console.log('activated');
        this.isCreate?this.getData():null;
    },
    methods:{
        onSearchClick(){
            this.page = 1,
            this.getData();
        },
        onOneGenerChange(val){
            val||val===0?this.getCascaderData(val*1):null;
            this.rulesForm.genre_two = '';
        },
        onAddBtn(){
            this.isCache = true;
            this.$router.push({
                path:'/commodity/list/info',
                query:{record:-1}
            })
        },
        onEditClick(record){
            this.isCache = true;
            this.$router.push({
                path:'/commodity/list/info',
                query:{record}
            })
        },
        onMerchantClear(){
            getMerchantData({limit:50,page:1}).then(res=>{
                this.merchantData = res.items;
            })
        },
        
        formatter(record,col){
            return record.application_status!='-1'?(record.application_status=='1'?'已通过':'未通过'):'未审核'
        },
        merchantFormat(record){
            return record.merchant_info.name
        },
        getData(){
            this.tableLoading=true;
            let params = {
                page:this.page,
                limit:this.limit,
                ...this.rulesForm
            }
            console.log(params)
            getCommoditylist(this._filterParams(params)).then(res => {
                this.tableData = {
                    items:res.items,
                    total:res.total
                }
                this.tableLoading=false;
            }).catch((err)=>{console.log(err)})
        },
        getCascaderData(id){
            let params = (!id&&id!==0? {} : {superior_id:id})
            getClassisData(params).then(res => {
                if(id!==undefined){
                    this.classisTwoData = res;
                    this.$refs['genreTwoSelect'].focus()
                }else{
                    this.classisOneData = res
                }
            })
        },
        onPageChange(val){
            this.getData()
        },
    }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/searchAndTable.less');
</style>
