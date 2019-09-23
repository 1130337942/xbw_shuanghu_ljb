<template>
  <div class="merchant_home">
    <el-scrollbar style="height:100%;width:100%;" wrap-class="scrollBar">
    
    <div class="merchant_home_title">{{userInfo.name}}</div>
    <div class="merchant_data">
      <el-row :gutter="20">
        <el-col :span="12" :md="6">
          <el-row class="one widthFit merchant_data_item">
            <el-col :span="7" class="data_icon">
              <i class="iconfont icon-50 font50"></i>
            </el-col>
            <el-col :span="17" class="merchant_data_number">
              <div>0</div>
              <div class="color_EBEEF5">待付款</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :md="6">
          <el-row class="two widthFit merchant_data_item">
            <el-col :span="7" class="data_icon">
              <i class="iconfont icon-xinyongqia font50"></i>
            </el-col>
            <el-col :span="17" class="merchant_data_number">
              <div class="color_a979d1">0</div>
              <div>已支付</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :md="6">
          <el-row class="three widthFit merchant_data_item">
            <el-col :span="7" class="data_icon">
              <i class="iconfont icon-tuihuoshouhou font50"></i>
            </el-col>
            <el-col :span="17" class="merchant_data_number">
              <div>0</div>
              <div class="color_EBEEF5">待退货</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :md="6">
          <el-row class="four widthFit merchant_data_item">
            <el-col :span="7" class="data_icon">
              <i class="iconfont icon-yonghu font50"></i>
            </el-col>
            <el-col :span="17" class="merchant_data_number">
              <div class="color_53d192">0</div>
              <div>访客数</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 实时数据模块 -->
    <div class="merchant_liveData" >
      <el-row :gutter="20">
        <el-col :span="15" :style="chartsStyle" class="merchant_liveData_charts" ref="liveDataCha">
          <div class="grid-content bg-purple" ref="liveDataCharts">
            <echart-view />
          </div>
        </el-col>
        <el-col :span="9" :style="carouselStyle" class="merchant_liveData_carousel"> 
          <div class="grid-content bg-purple">
            <el-carousel height="300px" >
              <el-carousel-item v-for="(item,index) in sildeArr" :key="index">
                <div class="slider-item">
                  <h3>{{item.title}}</h3>
                  <div>{{item.text}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 订单支付渠道模块 -->
    <div class="merchant_order">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="merchant_order_header">
              <div class="merchant_order_title">订单支付渠道</div>
            </div>
            <el-row>
              <el-col :span="6" class="text_center">
                <div class="pay_count">5215</div>
                <div class="pay_count_text">支付次数</div>
              </el-col>
              <el-col :span="6" class="text_center">
                <el-progress type="dashboard" :percentage="percentage_weixin" :color="colors"></el-progress>
                <div class="progress_text text_center">
                  <!-- <div class="icon-img"></div> -->
                  <img :src="require('../assets/images/weixin_pay.png')" class="icon-img" />
                  微信支付
                </div>
              </el-col>
              <el-col :span="6" class="text_center">
                <el-progress type="dashboard" :percentage="percentage_ali" :color="colors"></el-progress>
                <div class="progress_text text_center">
                  <!-- <div class="icon-img"></div> -->
                  <img :src="require('../assets/images/ali_pay.png')" class="icon-img" />
                  支付宝
                </div>
              </el-col>
              <el-col :span="6" class="text_center">
                <el-progress type="dashboard" :percentage="percentage_bank" :color="colors"></el-progress>
                <div class="progress_text text_center">
                  <i class="iconfont icon-xinyongqia"></i>
                  银联支付
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- <div class="merchant_order_header">
              
            </div> -->
            <concernsCharts />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 资产中心模块 -->
    <div class="merchant_property">
      <el-row >
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-row>
    </div>
    </el-scrollbar>

  </div>
</template>
<script>
import echartView from '@/components/echarts';
import concernsCharts from '@/components/concernsCharts';
export default {
  components:{echartView,concernsCharts},
  data() {
    return {
      sildeArr :[
        {title:'防止被骗——纸币收藏必须了解的知识！',text:'纸币印刷有很多版别，而多是采用平、凹、凸三种版型相结合进行印刷。其印刷技术大多使用，接线印刷、胶版迭印、双面对印、花纹对线等特种印刷技术，那这些印刷方式和技术是什么意思呢？'},
        {title:'大清钱币户部，古玩市场交易',text:'各地铸造比较统一。铸造始于1900年（清光绪二十六年），止于1911年（宣统三年），流通时间较短。该枚户部大清铜币直径为2.8厘米，该钱币正币面珠圈环绕，圈内铸有“大清铜币”四字，中心突起铸一阴文代表地名，为“湘”字。上铸满文，满文的两旁是纪年“丙午”字样，左右两侧书“户部”二字，下环铸刻“当制钱十文”五字。'},
        {title:'鉴别明代玉器，这5个工艺特征要掌握 !',text:'永乐年间，工艺美术品的生产进入了复苏和发展时期，但琢玉业发展得比较缓慢，主要是继承宋元传统，琢玉水平虽然很高，但作品的数量不多，形体也都比较小，这种状态大约延续到嘉靖时期。'},
      ],
      chartsStyle:'',
      carouselStyle:'',
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      percentage_weixin:10,
      percentage_ali:70,
      percentage_bank:30,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    merchantType() {
      let ret = "";
      switch (this.userInfo.merchant_type) {
        case 1:
          ret = "优店";
          break;
        case 2:
          ret = "古玩";
          break;
        case 3:
          ret = "画廊";
          break;
      }
      return ret;
    },
  },
  mounted() {
      this.$nextTick(()=>{
          this.chartsStyle = `width:${this.$refs.liveDataCharts.offsetWidth+18}px !important;`
          this.carouselStyle = `width: calc(100% - ${this.$refs.liveDataCharts.offsetWidth+18}px) !important;`
      })
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/iconfont/iconfont.css');
.merchant_home {
  width: 100%;
  overflow: hidden;
  min-height: 100%;
  display: block;
  box-sizing: border-box;
  background-color: #ccc;
  padding: 0;
  /deep/.scrollBar {
    overflow-x: hidden;
  }
  .font50 {font-size: 50px;}
  .merchant_home_title {
    width: 100%;
    height: 90px;
    font-size: 30px;
    color: #303133;
    background-color: #e8e8e8;
    padding: 20px;
    box-sizing: border-box;
    font-family: "PingFang SC";
  }
  .merchant_data {
    height: 168px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .el-row,
    .el-col {
      height: 100%;
    }
    .data_icon {
      font-size: 45px;
      color: #f2f6fc;
      text-align: center;
      line-height: 67px;
      border-right: 1px solid #dcdfe6;
    }
    .two i {
      color: #a979d1;
    }
    .four i {
      color: #53d192;
    }
    // .el-row .el-col>div { height: 100%; }
    .merchant_data_item {
      box-sizing: border-box;
      padding: 30px 0;
    }
    .merchant_data_number {
      padding-left: 12%;
      div:first-child {
        font-size: 36px;
        color: #ffffff;
      }
    }
    .one {
      background-color: #a979d1;
    }
    .two {
      background-color: #ffffff;
    }
    .three {
      background-color: #53d192;
    }
    .four {
      background-color: #ffffff;
    }
    .color_a979d1 {
      color: #a979d1 !important;
    }
    .color_53d192 {
      color: #53d192 !important;
    }
    .color_EBEEF5 {
      color: #ebeef5 !important;
    }
  }
  // 实时数据样式
  .merchant_liveData {
      padding: 0 20px;
    .grid-content {
      height: 300px;
    }
    .slider-item {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      color: #fff;
      text-align: center;
      h3 {
        line-height:70px;
        padding-top: 10px;
      }
      div {
        padding-top: 30px;
        display: inline-block;
        width: 80%;
        height: 108px;
        word-break:break-all;
        overflow: hidden;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple {
      background: #fff;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .el-carousel {
      background: url('../assets/images/slider.jpg');
    }
  }
  // 订单支付渠道样式
  .merchant_order {
      padding: 0 20px;
    .grid-content {
      height: 250px;
    }
    .el-row {
      margin-top: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple {
      background: #fff;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      .el-row { margin: 0;height: 200px; }
      .el-col { margin-top: 20px; }
      .pay_count {
        font-size:28px;
        line-height: 50px;
        margin-top: 32px;
      }
      .progress_text {
        width: 100%;
        line-height: 30px; 
        .icon-img {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: text-top;
          margin-right: 2px;
        }
      }
    }
    .merchant_order_header {
      height: 50px;
      .merchant_order_title { font-size: 18px; line-height: 50px;padding-left:30px; }
    }
  }
  //   资产中心样式
  .merchant_property {
    padding: 0 20px;
    margin-bottom: 20px;
    .grid-content[data-v-7eb2bc79] {
      height: 200px;
    }
    .el-row {
      margin-top: 20px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #fff;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  }
}
</style>