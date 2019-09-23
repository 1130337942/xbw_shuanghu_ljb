<template>
  <div class="merchant_home">
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
              <div class="color_53d192">{{total_count}}</div>
              <div>访客数</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 实时数据模块 -->
    <div class="merchant_liveData">
      <el-row :gutter="20" style="margin: 0;">
        <el-col :span="16">
          <!-- <div class="grid-content bg-purple" :style="`background:url('${require('../assets/images/charts.png')}') no-repeat;background-size:100%;`"> -->
          <div class="grid-content bg-purple">
            <span class="data-left">订单数据</span>
            <div class="data-right">
              <div class="date">
                <!-- 日期选择组件 -->
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  ></el-date-picker>
                </div>
              </div>
              <span class="all">全部</span>
            </div>
            <el-tabs type="border-card">
              <el-tab-pane label="访客数">
                <echart-view />
              </el-tab-pane>
              <el-tab-pane label="支付金额">
                <echart-view />
              </el-tab-pane>
              <el-tab-pane label="支付订单">
                <echart-view />
              </el-tab-pane>
              <el-tab-pane label="支付买家数">
                <echart-view />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-carousel height="400px">
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
      <el-row :gutter="20" style="margin: 10px auto 0;">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="pay-top">订单支付渠道</div>
            <div class="pay-bottom">
              <ul>
                <li>
                  <div class="Payment-times">
                    <div class="number">5212</div>
                    <div>支付次数</div>
                  </div>
                </li>
                <li>
                  <el-progress type="dashboard" :percentage="60" :color="colors"></el-progress>
                  <div>
                    <span class="el-icon-edit"></span>
                    <span>微信支付</span>
                  </div>
                </li>
                <li>
                  <el-progress type="dashboard" :percentage="40" :color="colors"></el-progress>
                  <div>
                    <span class="el-icon-edit"></span>
                    <span>支付宝</span>
                  </div>
                </li>
                <li>
                  <el-progress type="dashboard" :percentage="20" :color="colors"></el-progress>
                  <div>
                    <span class="el-icon-edit"></span>
                    <span>银联支付</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple attention">
            <div class="attention-top">
              <div class="top-left">店铺关注量</div>
              <div class="top-right">xx年xx月xx日</div>
            </div>
            <div class="attention-bottom">曲线图</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 资产中心模块 -->
    <div class="merchant_property">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="property-top">
              <div class="tp-left">资金中心</div>
              <div class="tp-right">2019-08-05</div>
            </div>
            <div class="property-bottom">
              <div class="bt-left">
                <ul>
                  <li>
                    <div class="tittle">总资产(元)</div>
                    <div class="number">781.57</div>
                    <div class="one">订单总金额(元):250.1</div>
                    <div class="two"></div>
                  </li>
                  <li>
                    <div class="tittle">
                      <span></span>
                      总资产(元)
                    </div>
                    <div class="number">781.57</div>
                    <div class="one">昨日收入(元):250.1</div>
                    <div class="two">昨日收入笔数:3</div>
                  </li>
                  <li>
                    <div class="tittle">
                      <span></span>
                      总资产(元)
                    </div>
                    <div class="number">781.57</div>
                    <div class="one">昨日支出(元):250.1</div>
                    <div class="two">昨日支出笔数:3</div>
                  </li>
                </ul>
              </div>
              <div class="bt-right">
                <span class="tittle">七日内变化趋势</span>
                <el-tabs type="border-card">
                  <el-tab-pane label="总资产">总资产</el-tab-pane>
                  <el-tab-pane label="店铺收入">店铺收入</el-tab-pane>
                  <el-tab-pane label="店铺支出">店铺支出</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import echartView from "@/components/echarts";
import { getVistorsData, getGoodsVistorsData } from "@/api/home";
import { log } from "util";
export default {
  components: { echartView },
  data() {
    return {
      sildeArr: [
        {
          title: "防止被骗——纸币收藏必须了解的知识！",
          text:
            "纸币印刷有很多版别，而多是采用平、凹、凸三种版型相结合进行印刷。其印刷技术大多使用，接线印刷、胶版迭印、双面对印、花纹对线等特种印刷技术，那这些印刷方式和技术是什么意思呢？"
        },
        {
          title: "大清钱币户部，古玩市场交易",
          text:
            "各地铸造比较统一。铸造始于1900年（清光绪二十六年），止于1911年（宣统三年），流通时间较短。该枚户部大清铜币直径为2.8厘米，该钱币正币面珠圈环绕，圈内铸有“大清铜币”四字，中心突起铸一阴文代表地名，为“湘”字。上铸满文，满文的两旁是纪年“丙午”字样，左右两侧书“户部”二字，下环铸刻“当制钱十文”五字。"
        },
        {
          title: "鉴别明代玉器，这5个工艺特征要掌握 !",
          text:
            "永乐年间，工艺美术品的生产进入了复苏和发展时期，但琢玉业发展得比较缓慢，主要是继承宋元传统，琢玉水平虽然很高，但作品的数量不多，形体也都比较小，这种状态大约延续到嘉靖时期。"
        }
      ],
      activeName: "second",
      // 月份选择组件参数
      value1: "",
      // 仪表盘环形精度条
      percentage: 10,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      total_count: "0"
    };
  },
  created() {
    this.getVistorsData();
    this.getGoodsVistorsData();
  },
  methods: {
    getVistorsData() {
      getVistorsData({ days: 10 }).then(res => {
        console.log(res);
        this.total_count = res.total_count;
      });
    },
    getGoodsVistorsData() {
      getGoodsVistorsData({ commodity_id: 1, days: 1 }).then(res => {
        console.log(res);
      });
    }
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
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import url("../assets/iconfont/iconfont.css");
element.style {
  margin: 0;
}
.merchant_home {
  width: 100%;
  overflow: auto;
  min-height: 100%;
  display: block;
  box-sizing: border-box;
  background-color: #ccc;
  padding: 0;
  .font50 {
    font-size: 50px;
  }
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
  // 实时数据样式开始
  .merchant_liveData {
    .el-tabs--border-card > .el-tabs__header {
      margin-left: 100px;
      // width: 420px;
      // background-color: orange;
      height: 40px;
      border: none;
      margin-top: 10px;
      background-color: transparent;
      .el-tabs__item {
        border: none;
      }
    }
    .grid-content {
      position: relative;
      .data-left {
        width: 72px;
        height: 40px;
        line-height: 40px;
        // background-color: red;
        position: absolute;
        top: 0;
        left: 20px;
        margin-top: 10px;
      }
      .data-right {
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 0;
        right: 20px;
        z-index: 2;
        margin-top: 10px;
        // background-color: skyblue;
        .date {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
    .grid-content[data-v-7eb2bc79] {
      height: 400px;
    }

    .title {
      font-size: 22px;
      line-height: 50px;
      text-indent: 20px;
      border: 1px solid #f2f6fc;
    }
    .slider-item {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      text-align: center;
      h3 {
        line-height: 70px;
        padding-top: 10px;
      }
      div {
        padding-top: 30px;
        display: inline-block;
        width: 80%;
        height: 108px;
        word-break: break-all;
        overflow: hidden;
      }
    }
    .el-row {
      margin-bottom: 20px;
      padding: 0 10px;
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
    }
    .el-carousel {
      background: url("../assets/images/slider.jpg") no-repeat;
      background-size: 100% 100%;
    }
  }
  // 订单支付渠道样式
  .merchant_home .merchant_order .grid-content {
    height: 300px;
  }
  .merchant_order {
    .el-row {
      padding: 0 10px;
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
      padding: 0 10px;
      .pay-top {
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
      }
      .pay-bottom {
        height: 150px;
        margin-top: 20px;
        // background-color: pink;
        ul {
          display: flex;
          justify-content: space-around;
          text-align: center;
          li {
            .Payment-times {
              width: 126px;
              height: 140px;
              font-size: 13px;
              // background-color: skyblue;
              text-align: center;
              .number {
                font-size: 28px;
                margin: 20px auto;
              }
            }
          }
        }

        .circle {
          float: left;
          height: 150px;
          // background-color: orange;
          margin-left: 50px;
        }
      }
    }
    // 右侧关注量
    .attention {
      // background-color: red;
      .attention-top {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        .top-left {
        }
        .top-right {
        }
      }
      .attention-bottom {
        // background-color: green;
        text-align: center;
      }
    }
  }
  //   资产中心样式
  .merchant_property {
    padding: 0 20px;
    font-size: 18px;
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
      height: 250px;
      .property-top {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 10px;
      }
      .property-bottom {
        height: 180px;
        padding: 0 10px;
        // background-color: blue;
        display: flex;
        .bt-left {
          flex: 5;
          // background-color: pink;
          border-right: 1px solid rgba(187, 187, 187, 1);
          ul {
            display: flex;
            justify-content: space-around;

            li {
              // background-color: red;
              width: 200px;
              // height: 150px;
              .tittle {
                padding-left: 5px;
                border-left: 6px solid #259b24;
              }
              .number {
                font-size: 28px;
              }
              .one {
                font-size: 16px;
                margin-top: 40px;
              }
              .two {
                font-size: 16px;
              }
            }
          }
        }
        .bt-right {
          flex: 4;
          bottom: blue;
          position: relative;
          .el-tabs--border-card {
            border: none;
          }
          .el-tabs--border-card > .el-tabs__header {
            margin-left: 300px;
            border: none;
            background-color: transparent;
            .el-tabs__item {
              border: none;
            }
          }
          .tittle {
            padding-left: 5px;
            border-left: 6px solid #259b24;
            position: absolute;
            top: 10px;
            left: 20px;
          }
        }
      }
    }
  }
}
</style>
