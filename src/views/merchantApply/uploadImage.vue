<template>
    <el-dialog :title="title" :visible.sync="dialogVisite" @close="onDialogClose" append-to-body :close-on-click-modal="false">
        <el-form 
            class="resources_upload_dialog"
            ref="rulesForm"
            :model="rulesForm"
            label-position="right"
            label-width="80px"
        >
        <!-- <el-form-item label="标题" prop="title">
            <el-input v-model="rulesForm.title" :maxlength="225"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="rulesForm.description" type="textarea" :maxlength="225"></el-input>
        </el-form-item>
        <el-form-item label="文件夹" >
            <el-input :value="folder_path" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="上传图片">
            <el-upload
                :class="{'uploadJustOne':isHideUpload}"
                action=""
                list-type="text"
                drag
                :accept="accept_image"
                v-if="dialogVisite"
                :limit="1"
                :http-request="oncheckImgUpload"
                :on-remove="onHandleRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-form-item>
        <el-form>
            
        </el-form>
        </el-form>

        <el-progress :percentage="percentage" v-if="percentage!==0"></el-progress>

        <div class="dialog-footer" slot="footer">
            <el-button @click="dialogVisite=false">取消</el-button>
            <el-button type="primary" :disabled="!isHideUpload||isUploading" @click="onAddClick">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getBase64Token , uploadOssToken , getOssToken , setOssToken } from '@/api/resources';
import * as AuthAction from '@/api/resources';
import { mapState, mapActions } from 'vuex';
export default {
    props:{
        title:{
            type:String,
            default:'上传资源'
        },
    },
    watch:{
        'fileList.length':function(val,oldVal){
            if(val!==0){
                this.isHideUpload=true;
                this.rulesForm.title = this.fileList[0].file.name.split('.')[0];
                this.rulesForm.description = this.fileList[0].file.name.split('.')[0];
            }else{
                this.isHideUpload=false;
            }
        },
    },
    data(){
        return{
            dialogVisite:false,
            rulesForm:{
                title:'',
                description:'',
                // tag:'',
                // folder:'',
            },
            tagArr:[],
            tagValue:'',
            inputVisible:false,
            isHideUpload:false,

            fileList:[],  //当前准备上传到oss的资源
            file_info:'', // 资源文件详情:  长 宽 时长 大小
            placeholder_title:'',
            placeholder_description:'',

            accept_image:'.jpg,.png,.gif',

            percentage:0,
            last_name:'',
            isUploading:false,
        }
    },
    computed:{
        tagText(){
            return this.tagArr.join(',');
        },
    },
    mounted(){
        // setInterval(() => {
        //     this.percentage ===100?null:this.percentage+=0.1;
        // }, 10);
    },
    methods:{
        onDialogClose(){
            this.$refs['rulesForm'].resetFields();
            this.fileList.length = 0;
            this.percentage = 0
        },
        onHandleRemove(file,fileList){
            this.fileList = [];
        },
        onAddClick(){
            let me = this;
            this.$refs['rulesForm'].validate()
            .then(()=>{
                let file = this.fileList[0],
                    file_info = this.file_info
                    this.isUploading = true; 
                    this.getImgOssToken()
                    .then(token=>{
                        let client = me.getClient(token),
                            fileNameDefault = file.file.name.split('.'),
                            random_name = me.random_string(32) + '_' + new Date().getTime()+'.'+fileNameDefault[fileNameDefault.length-1];
                        this.last_name = `/user/common/${random_name}`;
                        return this.multipartUpload({
                            client,
                            fileName:this.last_name,
                            file:file.file,
                            
                        })
                    }).then(res=>{
                        setTimeout(() => {
                            this.$message.success('上传成功');
                            this.$emit('onUploadOver',this.last_name);
                            this.isUploading = false;
                            this.dialogVisite = false;
                        }, 500);
                    }).catch(err=>{console.log(err);this.isUploading = false; })
            }).catch(err=>{console.log(err);this.isUploading = false; })
        },
        multipartUpload({client,fileName,file}){
            let me = this;
                return client.multipartUpload(  
                    fileName,
                    file,
                    {
                        parallel:1,
                        partSize:102400,
                        progress(percentage,checkpoint,res){
                            let per = Math.round(percentage*100);
                            me.percentage =  me.percentage === per?me.percentage:per;
                        },
                    },
                )
        },
        oncheckImgUpload(file){
            this.fileList = [file]; 
        },
        showInput(){ 
            this.inputVisible = true;
        },
        uploadTag() {
            let tagArr = [];
            if(!(this.tagValue+'').trim()){ 
                this.$message.warning('标签内容不能为空');
            }else if(this.tagArr.indexOf(this.tagValue)===-1){
                this.tagArr.push(this.tagValue);
            }else{
                this.$message.warning('标签内容不重复')
            }
            this.tagValue = ''
            this.inputVisible = false;
        },
        onDelTagClick(index){
            this.tagArr.splice(index,1);
        },
        getImageInfo(file){
            return new Promise((resolve,reject)=>{
                let img = new Image();
                let url = URL.createObjectURL(file);
                img.src = url;
                img.onload=function(){
                    let file_info= {
                        width:img.width,
                        high:img.height,
                    }
                    resolve(file_info)
                }
            })
        },
        getVideoDuration(file){  //获取视频时长
            return new Promise((resolve,reject)=>{
                let video = document.createElement("VIDEO");
                let url = URL.createObjectURL(file);
               video.setAttribute("src", url);
               video.addEventListener("canplay",function(){  
                    let file_info= {
                        width:0,
                        high:0,
                        duration:video.duration||0.0,
                    }
                    resolve(file_info)
                });
            })
        },
        getImgOssToken(){ //获取token
            let token = this.getOssToken();
            return new Promise((resolve,reject)=>{
                if(token){
                    token = JSON.parse(token)
                    // 判断当前token是否失效(时效为30min)
                    if(new Date().getTime()<(token.timeOut+1800000)){
                        resolve(token)
                    }else{
                        this.uploadOssToken().then(res=>{
                            let tokenObj = {
                                timeOut:new Date().getTime(),
                                ...res.Credentials
                            }
                            this.setOssToken(JSON.stringify(tokenObj));
                            resolve(res.Credentials)
                        })
                    }
                }else{
                    this.uploadOssToken().then(res=>{
                        let tokenObj = {
                            timeOut:new Date().getTime(),
                            ...res.Credentials
                        }
                        this.setOssToken(JSON.stringify(tokenObj));
                        resolve(res.Credentials)
                    })
                }
            })
        },
        getClient(authAction){  //oss上传对象
        console.log(authAction)
            return new this.OSS({
                region: "oss-cn-hangzhou",
                accessKeyId: authAction.AccessKeyId,
                accessKeySecret: authAction.AccessKeySecret,
                stsToken: authAction.SecurityToken,
                bucket: "xbw-app",
            })  
        },
        random_string(len) { //随机命名
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) { 
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            } 
            return pwd;
        },
        ...mapActions('uploadTaskBar',['addTask','toUplod']),

        api_open(){
            this.dialogVisite = true
            this.fileList = [];
        },
        ...AuthAction
    }
}
</script>
<style lang="less">
.resources_upload_dialog {
    .uploadJustOne>.el-upload{
        display:none;
    }
    .el-button.button-new-tag {
        margin-top: 0px;
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
}
// .hiden {display: none;}
</style>
