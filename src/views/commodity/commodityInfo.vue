<template>
  <!-- 添加商品页面 -->
  <div class="container">
    <div class="info_box">
      <img @click="onBackBtn" class="back_image" :src="require('../../assets/images/back.png')" />
      <el-scrollbar style="width:100%;height:100%">
        <el-form
          :model="rulesForm"
          label-width="110px"
          ref="rulesForm"
          :rules="rules"
          label-position="right"
          size="small"
        >
          <div class="form_title">1.基本信息</div>
          <el-row class="form_box">
            <el-col :span="24">
              <el-form-item label="商品名称:" prop="name">
                <el-input v-model="rulesForm.name" :maxlength="20" placeholder="请输入商品名称">
                  <span slot="suffix">{{rulesForm.name.length}}/20</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品副标题:" prop="subtitle">
                <el-input v-model="rulesForm.subtitle" :maxlength="20" placeholder="请输入商品副标题">
                  <span slot="suffix">{{rulesForm.subtitle.length}}/20</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="rulesForm.code">
              <el-form-item label="商品编号:" prop="code">
                <span>{{rulesForm.code}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="商品分类:" prop="genre_one" label-width="110px">
                <el-select
                  v-model="rulesForm.genre_one"
                  @change="getGenreArrData(rulesForm.genre_one)"
                  placeholder="一级分类"
                >
                  <el-option
                    v-for="item in genreOneArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="genre_two" label-width="0px">
                <el-select
                  v-model="rulesForm.genre_two"
                  :disabled="!rulesForm.genre_one"
                  placeholder="二级分类"
                >
                  <el-option
                    v-for="item in genreTwoArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model="rulesForm.price" placeholder="请输入商品价格"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品年份:" prop="years">
                <el-input v-model="rulesForm.years" placeholder="请输入商品年份"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="作者:" prop="author">
                <el-input v-model="rulesForm.author" :maxlength="20" placeholder="请输入商品作者">
                  <span slot="suffix">{{rulesForm.author.length}}/20</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form_title">2.图文描述</div>
          <el-row class="form_box">
            <el-col :span="24">
              <el-form-item label="商品图片:">
                <div
                  style="display:inline-block;position:relative;"
                  class="imageCon"
                  v-for="(item,index) in rulesForm.images"
                  :key="index"
                  @mouseover="imageDelete=index"
                  @mouseleave="imageDelete=-1"
                >
                  <el-image
                    :src="domain+item+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                    fit="scale-down"
                    class="commodityImg"
                  />
                  <div
                    class="imageDelet"
                    :class="[imageDelete===index?'':'hidden']"
                    @click="onDelImgClick(index)"
                  >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div
                  v-if="rulesForm.images.length<5"
                  class="imageCon"
                  @click.stop="onCheckImageClick('images',(5-rulesForm.images.length))"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <span style="color:#F56C6C">建议尺寸1:1</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品略缩图:">
                <div class="imageCon" @click="onCheckImageClick('thumbnail',1)">
                  <el-image
                    v-if="rulesForm.thumbnail"
                    :src="domain+rulesForm.thumbnail+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                    fit="scale-down"
                    class="commodityImg"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <span style="color:#F56C6C">建议尺寸1:1</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品详情:" prop="description">
                <quill-editor v-model="rulesForm.description" ref="rich_editor"></quill-editor>
                <!-- <div v-html="rulesForm.description"></div> -->
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form_title">3.商品设置</div>
          <el-row class="form_box">
            <el-col :span="12">
              <el-form-item label="排序:" prop="sort">
                <el-input-number v-model="rulesForm.sort" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否显示:" prop="release">
                <el-switch v-model="rulesForm.release" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否置顶:" prop="top">
                <el-switch v-model="rulesForm.top" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="info_box_footer">
                <el-button type="primary" @click="onSaveBtn(1)" size="medium">提交</el-button>
                <el-button type="danger" @click="onCancelBtn(0)" size="medium">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
      <resources ref="resources" :checkLength="checkLength" @onCheckChange="onCheckChange" />
    </div>
  </div>
</template>

<script>
import resources from "@/components/resources";
import {
  getClassisData,
  saveCommodityInfot,
  getCommodityInfot
} from "@/api/commodity";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      propType: 2,
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        subtitle: [
          { required: true, message: "请输入副标题", trigger: "blur" }
        ],
        years: [{ required: true, message: "请输入年限", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        merchant_id: [
          { required: true, message: "请选择所属商铺", trigger: "blur" }
        ],
        genre_one: [
          { required: true, message: "请选择一级商品的分类", trigger: "blur" }
        ],
        genre_two: [
          { required: true, message: "请选择二级商品的分类", trigger: "blur" }
        ]
      },
      rulesForm: {
        sort: 0,
        boutique: 0,
        recommend: 0,
        top: 0,
        release: 1,
        name: "",
        merchant_id: "",
        price: "",
        images: [],
        years: "",
        subtitle: "",
        author: "",
        description: "",
        reply: "",
        genre_one: "",
        genre_two: "",
        thumbnail: ""
      },
      dialogTableVisible: false,
      clickOrigin: "", //正在选取图片的项

      imgList: [],
      type: 0, //0头像上传 1富文本上传

      cascaderOptions: [],
      genreOneArr: [], //一级商品分类
      genreTwoArr: [], //二级商品分类
      cascaderProps: {
        label: "name",
        value: "id",
        children: "children"
      },

      merchantData: [], //商户列表数据
      imageDelete: -1,

      checkLength: 1
    };
  },
  components: {
    resources
  },
  computed: {
    domain() {
      return this.$domainUrl;
    },
    editor() {
      return this.$refs.rich_editor.quill;
    },
    getParams() {
      return { ...this.rulesForm };
    }
  },
  created() {
    const record = this.$route.query.record;
    if (this.$route.query.record != "-1") {
      console.log(record);
      getCommodityInfot({ commodity_id: record.id }).then(res => {
        const that = this;
        this.rulesForm = {
          sort: res.sort,
          boutique: res.boutique,
          recommend: res.recommend,
          top: res.top,
          name: res.name,
          code: res.code,
          price: res.price,
          images: res.images.length ? res.images : [],
          thumbnail: res.thumbnail,
          years: res.years,
          subtitle: res.subtitle,
          author: res.author,
          merchant_id: record.merchant_id,
          description: res.description,
          genre_one: res.genre_one,
          genre_two: res.genre_two,
          release: res.release
        };
        this.getGenreArrData()
          .then(() => {
            return this.getGenreArrData(res.genre_one);
          })
          .then(() => (this.rulesForm.genre_two = res.genre_two)) // =>res.genre_one
          .catch(err => console.log(err));
      });
    } else {
      this.getGenreArrData();
    }
  },
  mounted() {
    var toolbar = this.editor.getModule("toolbar");
    toolbar.addHandler("thumbnail", value => {
      if (value) {
        this.$refs.uploader_btn.$el.click();
      } else {
        this.editor.format("thumbnail", false);
      }
    });
    this.$refs.rich_editor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler); // 为图片ICON绑定事件
  },
  methods: {
    imgHandler(state) {
      if (state == true) {
        this.type = 1;
        this.dialogTableVisible = true;
      }
    },
    getGenreArrData(id) {
      if (id || id === 0) {
        this.rulesForm.genre_two = "";
        return getClassisData({ superior_id: id }).then(res => {
          this.genreTwoArr = res;
          return Promise.resolve();
        });
      } else {
        return getClassisData({}).then(res => {
          this.genreOneArr = res;
          return Promise.resolve();
        });
      }
    },
    onCheckImageClick(tager, checkLength) {
      //选择图片
      this.propType++;
      this.type = 0;
      this.clickOrigin = tager;
      this.checkLength = checkLength;
      // this.dialogTableVisible = true;
      this.$refs["resources"].api_open();
    },
    onBackBtn() {
      this.$router.back();
    },
    onDelImgClick(index) {
      this.rulesForm.images.splice(index, 1);
    },
    onSaveBtn() {
      let params = this.getParams,
        isEdit = this.$route.query.record != "-1";

      params.images = params.images.map(item => {
        return this._replaceUrl(item);
      });
      if (params.thumbnail) {
        params.thumbnail = this._replaceUrl(params.thumbnail);
        this.$refs["rulesForm"]
          .validate()
          // .then(()=>{
          //     console.log( this._filterParams(params,isEdit?{commodity_id:this.$route.query.record.id}:false), isEdit)
          // })
          .then(() =>
            saveCommodityInfot(
              this._filterParams(
                params,
                isEdit ? { commodity_id: this.$route.query.record.id } : false
              ),
              isEdit
            )
          )
          .then(res => {
            this.$message.success("操作成功!");
            this.$router.back();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.warning("请选择商品略缩图!");
      }
    },
    onCancelBtn() {
      this.$router.back();
    },
    onCheckChange() {
      let data = this.$refs["resources"].api_getcheckItem();
      if (this.type == 1) {
        if (data != null && data.length) {
          // 将文件上传后的URL地址插入到编辑器文本中
          let value = data[0].url;
          let length = this.$refs.rich_editor.quill.getSelection().index;
          this.$refs.rich_editor.quill.insertEmbed(length, "image", value); // 调用编辑器的 insertEmbed 方法，插入URL
          this.$refs.rich_editor.quill.setSelection(length + 1);
        } else {
          this.$message.error(`图片插入失败`);
        }
      } else {
        switch (this.clickOrigin) {
          case "thumbnail":
            this.rulesForm.thumbnail = this._replaceUrl(data[0].url);
            break;
          case "images":
            let imgs = data.map(item => {
              return this._replaceUrl(item.url);
            });
            this.rulesForm.images = this.rulesForm.images.concat(imgs);
            break;
        }
      }
      this.dialogTableVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/info.less");
.container {
  .info_box {
    color: rgb(0, 150, 125);
    font-size: 18px;
    .form_title {
      font-size: 18px;
      margin: 20px 0 30px 10px;
    }
    .form_box {
      margin: 0;
      padding: 0;
    }
  }
}
.top {
  margin-left: 120px;
}
.imageCon {
  vertical-align: middle;
  margin-right: 8px;
  margin-bottom: 8px;
}
.imageDelet {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  line-height: 117px;
  i {
    font-size: 20px;
    color: #ffffff;
  }
}
.imageCon .hidden {
  display: none;
}
.commodityImg {
  width: 120px;
  max-height: 120px;
  overflow: hidden;
}
</style>
