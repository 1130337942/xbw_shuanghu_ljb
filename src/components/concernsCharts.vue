<template>
    <div class="widthFit heightFit echartsBox">
        <div class="title">
            <div class="title_text">店铺关注量</div>
            <div class="title_time"></div>
        </div>
        <div id="concernsCharts"></div>
        <!-- <div class="noData" :style="{height:(boxHeight-54)+'px',lineHeight:(boxHeight-54)+'px'}"><i class="el-icon-warning"></i>暂无数据</div> -->
    </div>
</template>
<script>
export default {
    name:'concerns_charts',
    data(){
        return {
            concernsCharts:{},// echarts实例

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
        myChart.style.width = (this.boxWidth-50)+'px';
        myChart.style.height = (this.boxHeight-50)+'px';
        this.drawLine()
    },
     methods:{
         drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let me = this;
            this.concernsCharts = this.$echarts.init(document.getElementById('concernsCharts'))
            // 绘制图表
            this.setOption()
        },
        setOption(){
            let me = this;
            this.concernsCharts.setOption({
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
    #concernsCharts {
        width: 100%;
        height: calc(100% - 50px) ;
    }
    .title{
        width: 100%;
        line-height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .title_text { font-size: 16px; margin-left: 10px; }
        .title_time {
            float: right;
            margin-right: 10px;
        }
    }
    .noData {
        width: 100%;
        text-align: center;
        color: #909399;
        position: absolute;
        top:50px;
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