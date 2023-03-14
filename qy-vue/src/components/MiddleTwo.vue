<template>
  <div ref="chart" class="full-size"></div>
</template>

<script>
import axios from "axios";
import {eventBus} from "@/plugin/event-bus";
import * as echarts from "echarts";


export default {
  name: "MiddleTwo",
  data() {
    return {
      timeRange: null,

      chartData: {
        labels: [],
        data1: [],
        data2: [],
      },


      areaChart: null,
      chartOption: {
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        legend: {
          data: ["into", "out"]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          min: function (value) {
            return value.min;
          },
          max: function (value) {
            return value.max;
          },
          splitLine: {
            show: false
          },
          // axisLabel:{
          //   formatter: function(value) {
          //     // console.log(value)
          //     // console.log(this)
          //     // const axisModel = this.areaChart.getModel().getComponent('yAxis', 0).axis.scale;
          //     // const [minValue, maxValue] = axisModel.getExtent();
          //     //
          //     // return (value === minValue || value === maxValue) ? value : '';
          //   }
          // }

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
        series: [
          {
            name: "into",
            data: [],
            type: 'line',
            areaStyle: {}
          },
          {
            name: "out",
            data: [],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    };
  },

  created() {
    eventBus.$on('showArea', ({dateType, timeRange}) => {
      this.timeRange = timeRange;
      let url;
      if (dateType === 'Y') {  // 显示年份图
        url = 'json_area_year.json';

      } else if (dateType === 'M') {
        url = 'json_area_month.json';

      } else {
        url = 'json_area_day.json';
      }

      // 获取数据并redraw
      axios.get(url)
          .then((response) => {
            this.parseJson(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          }).then(() => {
        this.updateData();
      });
    })
  },
  mounted() {
    this.$nextTick(() => {

      this.areaChart = echarts.init(this.$refs.chart);
      const url = 'json_area_year.json';  // 默认全年数据

      axios.get(url)
          .then((response) => {
            // 处理响应
            this.parseJson(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          }).then(() => {
        // this.drawChart(this.svg);
        this.updateData();

      });
    });

  }
  ,
  methods: {
    parseJson(json_data) {
      this.chartData.labels = json_data["label"];
      this.chartData.data1 = json_data["data"].map((item) => {
        return item[0]
      })
      this.chartData.data2 = json_data["data"].map((item) => {
        return item[1]
      })
    }
    ,

    updateData() {
      this.chartOption.xAxis.data = this.chartData.labels;
      this.chartOption.series[0].data = this.chartData.data1;
      this.chartOption.series[1].data = this.chartData.data2;


      let that = this
      this.areaChart.setOption(this.chartOption);
      this.areaChart.getZr().on('click', function (params) {

        let [idx, _idy] = that.areaChart.convertFromPixel({seriesIndex: 0}, [params.offsetX, params.offsetY]);
        // x 轴索引
        let xValue = that.chartData.labels[idx];

        // 传递日期给子图
        let date;
        if (that.timeRange === null) date = xValue.toString();
        else date = [that.timeRange, xValue.toString()].join('-')

        eventBus.$emit('showMultiCharts', {
          date: date,
        });
      });
    },

    parseJson2(json_data) {
      this.areaChart.labels = json_data["label"];
      this.areaChart.data1 = []
      this.areaChart.data2 = []

      for (let i = 0; i < this.areaChart.labels.length; i++) {
        this.areaChart.data1.push({x: this.areaChart.labels[i], y: json_data["data"][i][0]});
        this.areaChart.data2.push({x: this.areaChart.labels[i], y: json_data["data"][i][1]});
      }
    }
  },
  watch: {
    chartData() {
      this.updateData();
    },
  }
}
</script>

<style scoped>

</style>