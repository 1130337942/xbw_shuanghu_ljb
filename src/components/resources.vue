<template>

        <el-dialog title="图片资源" :visible.sync="dialogTableVisible" @close="onClose" append-to-body>
            <div class="panelBox uploadBox">
                <div class="top">
                    <el-form
                        :model="rulesForm"
                        :inline="true"
                        label-width="75px"
                        class="demo-ruleForm"
                        label-position="left"
                        size="small"
                    >
                        <el-form-item label="文件名称:">
                            <el-input v-model="rulesForm.keyword" clearable @clear="onSearchClick"></el-input>
                        </el-form-item>
                        <el-form-item prop="folder" label="文件夹名称" label-width="90px">
                            <el-autocomplete
                                v-model="rulesForm.folder"
                                valueKey="file_name"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                clearable
                                @clear="onFolderClear"
                                @select="onFolderSelect"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-button icon="el-icon-search" @click="onSearchClick" plain type="primary" size="small">搜索</el-button>
                    </el-form>
                </div>
                <div class="file_list" >
                    <div class="file_box" v-loading="loading"> 
                        <transition-group class="flex_Box" tag="div" name="el-fade-in-linear">
                            <div class="uploadBtn marginRight marginBottom" :key="'flieup'" @click="onAddClick">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                            <el-card 
                                v-for="item in imgList.items"
                                :class="[select_id_arr.indexOf(item.id)>-1?'card_select_on':'']"
                                :body-style="{ padding: '0px' }"
                                class="file_item marginRight marginBottom"
                                :key="item.url"
                            >
                                <div class="imgBox">
                                    <img 
                                        class="icon-select" 
                                        style="cursor: pointer;"
                                        :src="item.url+(resourcesType==='image'?'?x-oss-process=image/resize,m_fill,h_130,w_130':'')"
                                        @click="onCheckedClick(item)"
                                        @contextmenu.prevent="onOpenMenuClick($event,item)"
                                    />
                                </div>
                            </el-card>
                        </transition-group>
                        
                    </div>
                    <div class="text_center">
                        <el-pagination
                            v-if="imgList"
                            class="pagination"
                            @current-change="getData"
                            :current-page.sync="page"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="imgList.total">
                        </el-pagination>
                    </div>
                </div>
                <el-dialog
                    title="资源预览"
                    :append-to-body="true"
                    :visible.sync="viewVisible"
                    @open="onViewVideoOpen"
                >
                    <el-row>
                        <el-col :span="10">
                            <div class="dialogVideo" v-if="viewVisible">
                                <img v-lazy="viewSrc" v-if="resourcesType==='image'"  :style="'max-width:260px;'+maxHeight"/>
                                <video :src="viewSrc" controls  :style="dialogHeight" v-else></video>
                            </div>
                        </el-col>
                        <el-col :span="10" :push="2">
                            <el-form :model="resourceInfo" ref="resourceInfo" >
                                <el-form-item label="标题" prop="title">
                                    <el-input v-model="resourceInfo.title" :maxlength="225" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="描述" prop="description">
                                    <el-input v-model="resourceInfo.description" type="textarea" :maxlength="225"  disabled ></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-dialog>
                <!-- 上传组件 -->
                <upload-window ref="uploadDialog" :fileType="resourcesType" :folderPath="folderOldPath" @onUploadOver="onSearchClick" />
            </div>
            <div class="dialog-footer" slot="footer">
                <el-button  @click="dialogTableVisible=false">取消</el-button>
                <el-button  @click="onCheckChange" type="primary">确定</el-button>
            </div>
     </el-dialog>
</template>

<script>
import * as AuthAction from '@/api/auth'
import { getResourcesData }  from '@/api/resources';
import upload from '@/views/resources/upload'
export default {
    components:{
        uploadWindow:upload
    },
    props:{
        title:{
            type:String,
            default:'图片'
        },
        checkLength:{  //最多可选择个数
            type:Number,
            default:9
        },
        checkArray:{  //当前选中的资源
            type:Array,
        },
        resourcesType:{  //选择的资源 image video
            type:String,
            default:'image'
        },
        visible:{ //弹窗开关
            type:Boolean,
            // required:true,
        }
    },
    data(){
        return {
            rulesForm:{
                keyword:'',
                folder:'',
                file_genre:'',
            },
            page:1,
            imgList:{
                items:[],
                total:0
            },
            select_url_arr:[],
            select_id_arr:[],
            select_arr:[],
            loading:false,

            viewVisible:false,  //视频预览
            viewSrc:'',
            dialogHeight:0,

            folderArr:[],
            folderOldVal:'',
            folderOldPath:'',

            resourceInfo:{
                title:'',
                description:'',
            },
            dialogTableVisible:false,
        }
    },
    computed:{
        getParams(){
            return {
                page:this.page,
                ...this.rulesForm,
            }
        },
        domain(){
            return this.$domainUrl;
        },
        lastVideoUrl(){
            return this.$lastVideoUrl();
        },
        checkLengthNumber(){
            return this.checkLength>9?9:this.checkLength;
        },
        maxHeight(){
            return `max-height:${this.viewHeight}px;`
        }
    },
    watch: {
        select_arr:{
            handler:function(val,oldVal){
                this.select_id_arr = val.map(item=>{ return item.id })
                console.log(this.select_id_arr)
            },
            deep:true,  
        },
        resourcesType:{
            handler:function(val,oldVal){
                this.rulesForm.file_genre = val;
            },
            immediate:true,
        },
        visible:function(val,oldVal){
            this.dialogTableVisible = val;
        }
        // checkArray:{
        //     handler:function(val,oldVal){
        //         console.log('checkArray,watch',val)
        //         this.select_url_arr = val
        //     },
        //     // deep:true,
        // }
    },
    created(){
        // this.select_url_arr = this.checkArray;
        this.viewHeight = window.innerHeight*0.5 ;
        this.getData();
    },
    mounted(){
    },
    methods: {  
        onSearchClick(){
            this.rulesForm.keyword||this.rulesForm.keyword===0?this.page = 1:null;
            this.getData();
        },
        onAddClick(){
            this.$refs['uploadDialog'].api_open();
        },
        onCheckChange(){  //确定
        // debugger
            this.$emit('onCheckChange',this.api_getcheckItem())
            this.dialogTableVisible = false;
        },
        onClose(){
            this.api_clearCheck();
        },

        querySearchAsync(text,callback){
            let param = {page:1,limit:50,file_genre:'folder',keyword:text}
            let folderArr  = this.folderArr;
            let f = folderArr.filter((item=>{
                return (item.file_name.toLowerCase().indexOf(text)>-1)
            }))
            if(this.folderOldVal === text){
                callback(this.folderArr);
            // }else if(f.length>0){
            //     callback(f)
            }else{
                if(!text){
                    this.folderOldPath='merchant_upload/';
                }
                getResourcesData(this._filterParams(param)).then(res=>{
                    callback(res.items);
                    this.folderArr = res.items
                })
            }
            this.folderOldVal = text;
        },
        onFolderSelect(item){
            this.folderOldVal = item.file_name;
            this.folderOldPath = item.folder_path;
            this.getData();
        },
        onFolderClear(){
            this.onSearchClick();
            this.folderOldPath = 'upload/'
        },
        onCheckedClick(item){
            const index = this.select_id_arr.indexOf(item.id);
            if(index === -1){
                if(this.select_arr.length < this.checkLengthNumber){
                    this.select_arr.push(item);
                    // this.$emit('checkChange', this.select_arr);
                }else if(this.checkLengthNumber=='1'){ //单选
                    this.select_arr = [];
                    this.select_arr = [ item ];
                    // this.$emit('checkChange', this.select_arr);
                }else{
                    this.$message.warning(`最多不能超过${this.checkLengthNumber}个`)
                }
            }else{
                this.select_arr.splice(index,1);
                // this.$emit('checkChange', this.select_arr);
            }
        },
        getData(){
          this.axios.get(`source/list/`,{params:this._filterParams(this.getParams)}).then(res=>{           
            this.imgList.items = res.items.map(item=>{
                return {
                    url:this.domain+'/'+item.folder_path+item.file_name + (this.resourcesType==='video'?this.lastVideoUrl:''),
                    ...item
                }
            })
            this.imgList.total = res.total;
            this.loading=false;
          })
        },
        onOpenMenuClick(e,item){
            // if(item.file_genre==='video'){
                this.viewSrc =  this.domain+'/'+item.folder_path+item.file_name
                this.viewVisible = true
            // }
            this.resourceInfo = {
                title:item.title,
                description:item.description,   
            }
                
        },
        onViewVideoOpen(){
            this.dialogHeight = "max-height:" + (window.innerHeight - 330) + "px;max-width:690px;";
        },
        /**
         * 获取当前选中的资源
         */
        api_getcheckItem(){
            let ret = [...this.select_arr];
            if(this.resourcesType==='video'){
                ret.forEach(item=>{
                    item.url = this.domain+'/'+item.folder_path+item.file_name
                });
            }

            return ret;
        },
        /**
         * 初始化资源组件
         */
        api_initResources(){
            this.rulesForm = {
                keyword:'',
                folder:'',
                file_genre:this.resourcesType,
            };
            this.page = 1,
            this.imgList = {
                items:[],
                total:0
            };
            this.select_arr = [];
            this.select_id_arr = [];
            this.getData();
        },
        /**
         * 清除选中
         */
        api_clearCheck(){
            console.log('clear')
            this.select_arr = [];
            this.select_id_arr = [];
            this.getData();
        },
        api_open(){
            this.dialogTableVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>
.panelBox{
    min-height: calc(100% - 15px);
    .top{
        padding-left: 20px;
        
        background-color: #ffffff !important;
        min-height: 100px;
        display: flex;
        align-items: center;
        .demo-ruleForm {
            width: 100%;
            .el-input,.el-option {
                width: 250px;
            }
        }
        .el-form { padding-top: 10px !important; }
        .el-form-item {
            margin-bottom: 0px !important;
            margin-bottom: 10px !important;
        }
    }
    .table-box{
        margin-top: 10px;
        background-color: #fff;
        padding: 20px;
    }
    .carousel-index{
      z-index: 5000;
    }
}
.uploadBox {
    .file_list{
        padding: 20px 20px 0px;
        .flex_Box {
            width: 100%;
            height: 354px;
            overflow: auto;
            padding-bottom: 30px;
            padding-left: 5px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .marginRight {margin-right: 20px;}
            .marginBottom {margin-bottom: 20px;}
            .uploadBtn {
                width: 130px;
                height: 130px;
                border: 1px dashed #d9d9d9;
                cursor: pointer;
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 130px;
                    height: 130px;
                    line-height: 130px;
                    text-align: center;
                }
            }
            .file_item {
                width: 130px;
                height: 130px;
                .imgBox { width: 130px; height: 130px; overflow: hidden; }
                img { min-width:130px; height: 100%;}
            }
            .card_select_on {  //选中卡片
                box-shadow: 0 4px 12px 0 rgba(0,0,0,0.8) !important;
            }
        }

    }
}

</style>
