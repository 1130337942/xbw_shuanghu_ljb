<template>
    <div class="info_box">
        <el-form
            ref="rulesForm"
            :model="rulesForm"
            :inline="false"
            label-width="120px"
            :rules="rules"
        >
        <div class="form_title primary_font_color">1.店铺信息</div>
        <el-row class="form_box">
            <el-col :span="24">
                <el-form-item label="商家名称:" prop="merchant_name">
                    <el-input v-model="rulesForm.merchant_name" maxlength="12" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.merchant_name.length||0}}/12</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="商家地址:" prop="area">
                    <area-select ref="areaSelect" v-model="rulesForm.area" :disabled="disable"></area-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="店铺类型:" prop="genre">
                    企业
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="店铺头像/商标:" prop="logo">
                    <div class="imageCon" @click="onCheckImgClick('logo')">
                        <img
                            v-lazy="domain+'/'+rulesForm.logo+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.logo"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="店铺简介:" prop="description">
                    <el-input 
                        type="textarea" 
                        v-model="rulesForm.description" 
                        :autosize="{minRows:2}"
                        :disabled="disable" 
                        :maxlength="255" 
                        show-word-limit
                    ></el-input>
                    <!-- <quill-editor  v-model="rulesForm.description"  ref="rich_editor"></quill-editor> -->
                </el-form-item>
            </el-col>
        </el-row>
        <div class="form_title primary_font_color">2.个人资料</div>
        <el-row class="form_box">
            <el-col :span="24">
                <el-form-item label="申请人:" prop="applicant">
                    <el-input v-model="rulesForm.applicant" maxlength="30" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.applicant.length||0}}/30</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="身份证号码:" prop="id_card">
                    <el-input v-model="rulesForm.id_card" maxlength="18" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.id_card.length||0}}/18</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="申请人身份证:" prop="id_card_back"> 
                    <div class="imageCon" @click="onCheckImgClick('id_card_back')">
                        <img
                            v-lazy="domain+'/'+rulesForm.id_card_back+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.id_card_back"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                    <div>背面照片</div>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="id_card_facade">
                    <div class="imageCon" @click="onCheckImgClick('id_card_facade')">
                        <img
                            :src="domain+'/'+rulesForm.id_card_facade+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.id_card_facade"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                    <div>正面照片</div>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="id_card_handheld">
                    <div class="imageCon" @click="onCheckImgClick('id_card_handheld')">
                        <img
                            v-lazy="domain+'/'+rulesForm.id_card_handheld+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.id_card_handheld"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                    <div>手持照</div>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 企业部分 -->
        <div class="form_title primary_font_color">3.企业资料</div>
        <el-row v-if="rulesForm.genre===2" class="form_box">
            <el-col :span="24">
                <el-form-item label="企业名:" prop="enterprise_name">
                    <el-input v-model="rulesForm.enterprise_name" maxlength="100" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.enterprise_name.length||0}}/100</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="法人姓名:" prop="legal_person">
                    <el-input v-model="rulesForm.legal_person" maxlength="100" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.legal_person.length||0}}/100</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="法人身份证号:" prop="legal_person_id_card">
                    <el-input v-model="rulesForm.legal_person_id_card" maxlength="18" :disabled="disable" show-word-limit>
                        <!-- <span slot="suffix">{{rulesForm.legal_person_id_card.length||0}}/18</span> -->
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="法人身份证:" prop="legal_person_id_card_back">
                    <div class="imageCon" @click="onCheckImgClick('legal_person_id_card_back')">
                        <img
                            v-lazy="domain+'/'+rulesForm.legal_person_id_card_back+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.legal_person_id_card_back"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                    <div>反面照片</div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="legal_person_id_card_facade">
                    <div class="imageCon" @click="onCheckImgClick('legal_person_id_card_facade')">
                        <img
                            v-lazy="domain+'/'+rulesForm.legal_person_id_card_facade+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.legal_person_id_card_facade"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                    <div>正面照片</div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="营业执照副本:" prop="business_license">
                    <div class="imageCon" @click="onCheckImgClick('business_license')">
                        <img
                            v-lazy="domain+'/'+rulesForm.business_license+'?x-oss-process=image/resize,m_fill,h_120,w_120'" 
                            fit="scale-down"
                            class="commodityImg"
                            v-if="rulesForm.business_license"
                        />
                        <i v-else class="el-icon-plus"></i>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <div class="text_center info_box_footer">
            <el-button type="primary" @click="onApplyClick" v-show="[-2,0].indexOf(auditStatus)>-1">提交</el-button>
            <el-button  @click="onBackClick" v-show="!([-2,0].indexOf(auditStatus)>-1)">返回</el-button>
        </div>
        <upload-image ref="resources" :title="'身份证上传'" @onUploadOver="onUploadOver" />
    </div>    
</template>
<script>
import { submitApply , getaAuditInfo , getLocation } from '@/api/apply';
import uploadImage from './uploadImage';
export default {
    components:{uploadImage},
    data(){
        return {
            rulesForm:{
                applicant: '',
                genre: 2,
                id_card: '',
                merchant_name: '',
                description: '',
                id_card_back:'',
                id_card_facade:'',
                id_card_handheld:'',
                logo:'',
                area:[],
                // province_id:'',
                // city_id:'',

                enterprise_name:  '',
                legal_person:  '',
                legal_person_id_card:  '',
                business_license:'',
                legal_person_id_card_back:'',
                legal_person_id_card_facade:'',
            },
            rules:{
                applicant:                  [  {required:true,validator:this.$rulers.textTrim,trigger: 'blur'} ],
                id_card:                    [  {required:true,validator:this.$rulers.idcard,trigger: 'blur'} ],
                merchant_name:              [  {required:true,validator:this.$rulers.textTrim,trigger: 'blur'} ],  
                description:                [  {required:true,validator:this.$rulers.textTrim,trigger: 'blur'} ],  
                id_card_back:               [  {required:true,message:'请选择图片',trigger: 'blur'} ],  
                id_card_facade:             [  {required:true,message:'请选择图片',trigger: 'blur'} ],  
                id_card_handheld:           [  {required:true,message:'请选择图片',trigger: 'blur'} ],  
                enterprise_name:            [  {required:true,validator:this.$rulers.textTrim,trigger: 'blur'} ], 
                legal_person:               [  {required:true,validator:this.$rulers.textTrim,trigger: 'blur'} ], 
                legal_person_id_card:       [  {required:true,validator:this.$rulers.idcard,trigger: 'blur'} ], 
                business_license:           [  {required:true,message:'请选择图片',trigger: 'blur'} ],
                legal_person_id_card_back:  [  {required:true,message:'请选择图片',trigger: 'blur'} ],
                legal_person_id_card_facade:[  {required:true,message:'请选择图片',trigger: 'blur'} ],
                area:                       [  {required:true,message:'该项为必填项',trigger: 'blur'} ],
            },
            resourcesVisit:false,

            checkTaget:'', //当前正在选择资源的项
        }
    },
    computed:{
        domain(){
            return this.$domainUrl;
        },
        lastVideoUrl(){
            return this.$lastVideoUrl;
        },
        getRulesForm(){
            return this.rulesForm;
        },
        auditStatus(){
            return this.$store.state.userInfo.application_status  //.-2:未提交申请-1:待审核,0:审核失败,1:审核通过
        },
        disable(){
            return [-1,1].indexOf(this.auditStatus)>-1
        }
    },
    created(){
        if([-1,0].indexOf(this.auditStatus)>-1){
            getaAuditInfo().then(res=>{
                console.log(res);
                let rulesForm = {...res,area:[]};
                delete rulesForm.province_id;
                delete rulesForm.city_id;
                this.rulesForm = rulesForm;
                this.$refs.areaSelect.setData([ res.province_id , res.city_id ]);
            })
        }
    }, 
    methods:{
        onCheckChange(data){
            this.rulesForm[this.checkTaget] = data[0].folder_path+data[0].file_name
        },
        onBackClick(){
            this.$router.push('/merchantApply');
        },
        onCheckImgClick(taget){
            if(this.disable){
                return false
            }
            this.checkTaget = taget
            this.$refs['resources'].api_open();
        },
        // onProvinceChange(){ 
        //     this.rulesForm.city_id = '';
        //     this.cityArr = [];
        //     getLocation({level:2,parent_id:this.rulesForm.province_id})
        //     .then(res=>{
        //         this.cityArr = res;
        //     })
        // },
        onApplyClick(){
            let params;
            this.$refs['rulesForm'].validate().then(()=>{
                params = this._filterParams(this.getRulesForm);
                params.province_id = params.area[0];
                params.city_id = params.area[1];
                delete params.area
                console.log(params)
                return submitApply(params)
            })
            .then(res=>{
                this.$message.success('提交成功');
                this.$store.dispatch('getUserInfoData')//更新用户数据
                this.$router.push('/merchantApply');
            })
            .catch(err=>console.log(err))
        },
        onUploadOver(url){
            this.rulesForm[this.checkTaget] = url
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/info.less');
.info_box {
    padding: 20px;
}
</style>
