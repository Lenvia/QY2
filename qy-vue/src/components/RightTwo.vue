<template>
  <el-row class="flex_row" style="height: 100%">
    <el-col :span="12" class="height_adjust_equal" style="height: 100%; ">
      <div class="div-border border mb-2 border-opacity-50" ref="chartContainer" style="height: 100%; width: 100%;">
        <div ref="pieChart" class="content_center" style="height: 100%; width: 100%"></div>
      </div>
    </el-col>
    <el-col :span="12" class="height_adjust_equal" style="height: 100%">
      <div class="div-border border mb-2 border-opacity-50" ref="chartContainer2" style="height: 100%; width: 100%;">
        <div ref="areaChart" class="content_center" style="height: 100%; width: 100%"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  name: "RightTwo",

  data(){
    return {

      chart1: null,
      chartData1: [],
      chartOption1: {

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'data',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },

      chart2: null,
      chartData2:{
        xAxis: [],
        data: [],
      },
      chartOption2:{
        title: {
          text: 'clusters',
          // left: 'center',
          textStyle:{
            fontSize: 14,
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            // saveAsImage: {},
            dataZoom: {
              yAxisIndex: 'none',
              restore: {},
            },
          }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'sum',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },

            data: []
          },
        ]
      },
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.chart1 = echarts.init(this.$refs.pieChart)
      this.chart2 = echarts.init(this.$refs.areaChart)
      axios.get('/cluster.json')
          .then(response => {
            const json_data = response.data;
            this.chartData1 = [];

            for (let key in json_data) {
              this.chartData1.push({name: key, value: json_data[key]});
            }

            const keys = Object.keys(json_data);
            const values = Object.entries(json_data).map(([key, value]) => value);
            this.chartData2.xAxis = keys;
            this.chartData2.data = values;

          })
          .catch(error => {
            console.log(error);
          }).then(() => {

        this.chartOption1.series[0].data = this.chartData1.map(item => ({
          name: item.name,
          value: item.value,
        }));
        this.chart1.setOption(this.chartOption1)

        this.chartOption2.series[0].data = this.chartData2.data;
        this.chartOption2.xAxis[0].data = this.chartData2.xAxis;
        this.chart2.setOption(this.chartOption2);

      });

    });

  },

  watch:{
    chartData1() {
      this.chartOption1.series[0].data = this.chartData1.map(item => ({
        "value": item.value,
        "name": item.name,
      }));

      this.chart1.setOption(this.chartOption1)
    },

    chartData2() {
      this.chartOption2.series[0].data = this.chartData2.data;
      this.chartOption2.xAxis[0].data = this.chartData2.xAxis;

      this.chart2.setOption(this.chartOption2)
    },
  }

}
</script>

<style scoped>

</style>