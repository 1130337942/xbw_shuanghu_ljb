<template>
    <div class="widthFit heightFit echartsBox">
        <el-row class="charts-header">
            <el-col tag="div" :span="16" class="chart-nav">
                <el-menu mode="horizontal" :default-active="activeItem" @select="onNavSelect">
                    <el-menu-item index="visit_count">访问量</el-menu-item>
                    <el-menu-item index="pay_amount">支付金额</el-menu-item>
                    <el-menu-item index="order_count">订单数量</el-menu-item>
                    <el-menu-item index="pay_count">支付买家数</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="8" tag="div" class="chart-time">
                <el-date-picker
                    v-model="chartTime"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']"
                    size="mini"
                >
                </el-date-picker>
                <el-button type="text">全部</el-button>
            </el-col>
        </el-row>
        <div id="myChart" style="width:100%;height:100%;"></div>
        <!-- <div class="noData" :style="{height:(boxHeight-54)+'px',lineHeight:(boxHeight-54)+'px'}"><i class="el-icon-warning"></i>暂无数据</div> -->
    </div>    
</template>
<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    name:'echarts',
    data(){
        return {
            myChart:{},// echarts实例

            boxWidth:0,
            boxHeight:0,
            activeItem:'visit_count',
            chartsData:[10, 20, 30, 40, 50,60,0],  //图片数据
            lineColor:'#53d192',  //  主题颜色
            chartTime:[]
        }
    },
    mounted(){
        let box = document.querySelector('.echartsBox');
        this.boxWidth= box.offsetWidth;
        this.boxHeight= box.offsetHeight;
        let myChart = document.getElementById('myChart');
        myChart.style.width = (this.boxWidth-54)+'px';
        myChart.style.height = (this.boxHeight-54)+'px';
        this.drawLine()
    },
    methods:{
        onNavSelect(select){
            let data = this.chartsData.map((item)=>{
                return item+10;
            })
            this.chartsData = data;
            this.setOption();
        },
        getData(){

        },

        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let me = this;
            this.myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            this.setOption()
        },
        setOption(){
            let me = this;
            this.myChart.setOption({
                // title: { text: '在Vue中使用echarts' },
                tooltip: {
                    trigger:'axis',
                    axisPointer:{
                        type:'line',
                        lineStyle:{
                            color:me.lineColor
                        }
                    }
                },
                grid:{
                    show:false,
                    top:20,
                    left:40,
                    right:0,
                    bottom:40,  
                    lineStyle:{color:'#EBEEF5'}
                },
                xAxis: {
                    data: ["01","02","03","04","05","06","07"],
                    axisLine:{
                        lineStyle:{color:'#EBEEF5'}
                    },
                    boundaryGap :true,
                    splitLine:{
                        show:false,
                        lineStyle:{
                            color:'#EBEEF5'
                        }
                    }
                },
                yAxis: {
                    axisLine:{
                        lineStyle:{color:'#EBEEF5'}
                    },
                    boundaryGap :true,

                    splitLine:{
                        show:false,
                        lineStyle:{
                            color:'#EBEEF5'
                        }
                    }
                },
                axisLabel:{
                    color:'#C0C4CC',
                },
                series: [{
                    name: '销量',
                    type: 'line',
                    smooth: true,
                    lineStyle:{ // 曲线
                        color:me.lineColor,
                    },
                    itemStyle:{  // 拐点 
                        color:me.lineColor,
                        borderWidth:2
                    },
                    areaStyle:{  //图标颜色填充
                        color:{
                            x: 0, //右
                            y: 0, //下
                            x2: 0, //左
                            y2: 1, //上
                            colorStops: [{
                                offset: 0, color: me.lineColor // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffffff' // 100% 处的颜色
                            }],
                        }
                    },
                    data: me.chartsData
                }]
            });
        },
    }
}
</script>
<style lang="less" scoped>
.echartsBox{
    position: relative;
    .charts-header{
        width: 100%;
        .chart-nav {
            padding-left:10px;
            background-color:#ffffff;
        }
        .chart-time {
            height: 60px;
            line-height: 60px;  
            .el-date-editor { width: 80%; }
            .el-button { margin-left: 8px; }
        }
    }
    .noData {
        width: 100%;
        text-align: center;
        color: #909399;
        position: absolute;
        top:60px;
        left:0;
        background: rgba(225, 225, 225 ,.3);
        i {
            padding-right: 5px;
            font-size: 20px;
            vertical-align: text-bottom;
        }
    }
}
</style>
