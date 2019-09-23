<template>
    <div class="panelBox classis_table">
        <div class="top">
            <el-form 
                :model="ruleForm"
                :inline="true"
                ref="ruleForm"
                label-width="75px"
                class="demo-ruleForm"
                size="small"
            >
                <el-form-item label="分类名称:" style="margin:10px;" prop="name">
                    <el-input @clear="onSearchBtn" clearable v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 10px;">
                <el-button style="margin-left: 75px;" type="primary" icon="el-icon-search" @click="onSearchBtn">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-box">
            <!-- <el-button @click="onDelBtn" plain type="danger" size="small">删除分类</el-button>
            <el-button @click="onAddBtn" plain type="primary" size="small">添加分类</el-button> -->
            <el-table
                type="expand"
                row-key="id"
                
                size="medium"
                :row-class-name="rowClassName"
                :data="tableData" 
                @selection-change="onSelectionChange" 
                v-loading="tableLoading"
                :height="tableHeight.height"
                style="width: 100%;margin-top:10px;"
                border
                :expand-row-keys="expandKeys"
                @expand-change="onExpandChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="expand" width="55">
                    <template slot-scope="scope">
                        <el-table :data="tableChildrenData" :show-header="false" :row-class-name="expandClass" >
                            <el-table-column width="55"></el-table-column>
                            <el-table-column label="分类名称" prop="name" min-width="200px"></el-table-column>
                            <el-table-column label="分类图片" min-width="200px">
                                <template slot-scope="scope" min-width="100px">
                                    <el-image
                                        :src="domain+''+scope.row.icon+'?x-oss-process=image/resize,m_fill,h_80,w_80'"
                                        fit="scale-down"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="创建时间" prop="create_time"></el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name" min-width="200px"></el-table-column>
                <el-table-column label="分类图片" min-width="200px">
                    <template slot-scope="scope" min-width="100px">
                        <el-image
                            :src="domain+''+scope.row.icon+'?x-oss-process=image/resize,m_fill,h_80,w_80'"
                            fit="scale-down"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="create_time"></el-table-column>
                <!-- <el-table-column label="操作" min-width="200px" >
                    <template slot-scope="scope">
                         <el-button plain type="primary" icon="el-icon-edit" @click="onEditBtn(scope.row)">修改</el-button>
                    </template>
                </el-table-column> -->
            </el-table>  
            <el-dialog 
                :title="dialog.title"
                :visible.sync="dialog.visible"
                @close="onDialogClose"
                width="40%"
            >
                <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="80px" style="margin:10px;" class="dialog_upload">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="dialogForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="别称" prop="stage_name">
                        <el-input v-model="dialogForm.stage_name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型图标" prop="icon">
                        <!-- <el-input v-model="dialogForm.icon"></el-input> -->
                        <div class="imageCon" @click.stop="onCheckImageClick('images')">
                            <el-image
                                v-if="dialogForm.icon"
                                style="width: 120px; height: 120px"
                                :src="domain+dialogForm.icon+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                                fit="scale-down"
                            ></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        <span style="color:#F56C6C">建议尺寸1:1</span>
                    </el-form-item>
                    <el-form-item v-if="!dialog.isEdit" label="所属父类" prop="superior_id">
                        <el-select v-model="dialogForm.superior_id">
                            <el-option
                                v-for="item in tableData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog.visible = false">取 消</el-button>
                    <el-button type="primary" @click="onDialogSaveClick">确 定</el-button>
                </span>
                
                <resources 
                    ref="resources" 
                    :checkLength="1"
                    @onCheckChange="onCheckChange"
                />
            </el-dialog>
        </div>
    </div>
</template>

<script>
// import Upload from '../../components/upload'
import resources from '@/components/resources';
// import { getClassisData , saveClassisData , delClassisData } from '@/api/commodity'
export default {
    name:'commodity_classis',
    components:{
        resources
    },
    data (){
        return {
            ruleForm: {
                name:'',
                stage_name:'',
            },
            tableData:[],
            tableChildrenData:[], //加载的子表格
            tableLoading:false,
            tableHeight:{height:'0px'},
            
            dialog:{
                title:'添加',
                visible:false,
            },
            dialogRules:{
                name:[{ required: true, message: '请填写分类名称', trigger: 'blur' }],
                icon:[{ required: true, message: '请输入类型图标', trigger: 'blur' }],
            },
            dialogForm:{
                name:'',
                icon:'',
                superior_id:'',
            },
            selectArr:[],
            propType: 2,
            imgList: [],
            type: 0, //0头像上传 1富文本上传
            dialogTableVisible:false,
            expandKeys:[],   //展开的行

            isCreate:false
        }
    },
    computed:{
        getParams(){
            return this.ruleForm;
        },
        domain(){
            return this.$domainUrl;
        },
        expandchild(){
            return this.tableChildrenData
        }
    },
    created(){
        console.log('create!!!!!!!!!!!')
        this.tableHeight.height = window.innerHeight - 260 + "px";
        this.isCreate = true;
    },
    activated(){
        console.log('activated');
        this.getData();
    },
    methods: {
        onSearchBtn(){
            this.getData();
        },
        onAddBtn(){
            this.dialog = {
                title:'添加板块/栏目',
                visible:true,
            }
        },
        onEditBtn(record){
            this.dialog = {
                title:'编辑板块/栏目',
                visible:true,
                isEdit:true,
                genre_id:record.id,
            }
            this.dialogForm={
                name:record.name,
                icon:record.icon,
                stage_name:record.stage_name
            }
        },
        onDelBtn(){
            if(this.selectArr.length>0){
                let ids = this.selectArr.map(function(item){
                    return item.id
                })
                delClassisData({genre_ids:ids.join(',')})
                    .then(res => {
                        this.page = 1;
                        this.getData();
                        this.$message.success('删除成功!')
                    }).catch(()=>{})
            }else{
                this.$message.warning('请选择需要删除的分类!')
            }
        },
        onSelectionChange(select){
            this.selectArr = select;
        },
        onLimitSizeChange(){
            this.getData();
        },
        onCurrentChange(){
            this.getData();
        },
        onDialogSaveClick(){
            this.$refs['dialogForm'].validate()
                .then(()=> {
                    let params = this._filterParams(this.dialogForm, this.dialog.isEdit ? {genre_id:this.dialog.genre_id} : undefined)
                    return saveClassisData(params,this.dialog.isEdit) 
                })
                .then(res => {
                    this.dialog.visible = false;
                    this.getData();
                    this.$message.success('保存成功!')
                })
                .catch((err)=>{ console.log(err)})
        },
        onDialogClose(){
            this.dialogForm={
                name:'',
                icon:'',
                stage_name:'',
                superior_id:'',
            }
            this.$refs['dialogForm'].clearValidate();
        },
        rowClassName({row,rowIndex}){  //table 样式
            if(row.superior_id!==null&&row.superior_id!==undefined){
                return 'tabelChildren'
            }else {
                return 'tabelParent'
            }
        },
        onExpandChange(row,expandedRows){
            console.log(row,expandedRows)
            let me =this;//expandKeys
            if(row.id!==me.expandKeys[0]){
                me.expandKeys = [];
                me.expandKeys.push(row.id);
                getClassisData({superior_id:row.id}).then(res=>{
                    me.tableChildrenData = res;
                    // me.$data[`tableChildrenData${row.id}`] = res;
                })
            }
            // if(this.expandKeys.length<expandedRows.length){ //刷新该行
            //     getClassisData({superior_id:row.id}).then(res=>{
            //         me.tableChildrenData[row.id] = res;
            //         // me.$data[`tableChildrenData${row.id}`] = res;
            //     })
            // }
        },
        expandClass(){
            return 'tabelChildren'
        },
        getData(){
            this.tableLoading = true
            getClassisData(this._filterParams(this.getParams)).then(res => {
                this.tableData = res
                this.tableLoading = false;
            }).catch(()=>{this.tableLoading=true})
        },
        onCheckImageClick(type){
            this.type = 0;
            // this.ruleForm.imageUrl?this.imgList.push(this.ruleForm.imageUrl):'';
            this.clickOrigin = type
            // this.dialogTableVisible = true;
            this.$refs['resources'].api_open();
        },
        onCheckChange(data){
            this.dialogForm.icon = this._replaceUrl(data[0].url);
            this.dialogTableVisible=false;
        },
    }

}
</script>

<style lang="less" scoped>
@import url('../../assets/css/searchAndTable.less');
    .dialog_upload {
        .imageCon {
            vertical-align: middle;
            margin-right: 8px;
            margin-bottom: 8px;
            width: 121px;
            height: 120px;
            border: 1px dashed #c0ccda;
            cursor: pointer;
        }
        .imageCon .hidden{display: none;}
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 120px;
          height: 120px;
          line-height: 120px;
          text-align: center;
        }
    }
    .searchAndTable .el-table__body-wrapper {
        overflow-y: auto !important;
    }
    .tabelChildren {
        background-color: #8c939d;
    }
</style>
