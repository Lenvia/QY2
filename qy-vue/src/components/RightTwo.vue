<template>
  <el-row class="flex_column div-border border mb-2 border-opacity-50" style="height: 100%">
    <el-row style="width:100%; height: 50%">
      <el-col :span="14" class="flex-column height_adjust_equal" style="height: 100%; ">

        <el-row class="flex-column border-end border-bottom mb-2 border-opacity-50"
                style="flex-grow: 1; height: 100%; width: 100%;">
          <el-row class="height_adjust_equal content_vertical_center" style="display: flex; height: 40%">
            <el-col :span="8" class="content_vertical_center" style="justify-content: end">
              <label class="label">Text</label>
            </el-col>
            <el-col :span="2"/>
            <el-col :span="6" class="content_vertical_center" style="justify-content: start">
              <el-input v-model="text" class="underline-input"></el-input>
            </el-col>
          </el-row>
          <el-row class="height_adjust_equal content_center" style="display: flex; height: 25%">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="shape"></el-checkbox>
              <el-checkbox label="time"></el-checkbox>
            </el-checkbox-group>
          </el-row>

          <el-row class="height_adjust_equal content_vertical_center" style="justify-content: end; height: 35%;">
            <el-button class="btn btn-outline-primary content_center"
                       style="width:30%; height: 60%; margin-right: 10px">Enter
            </el-button>
          </el-row>
        </el-row>


      </el-col>
      <el-col :span="10" class="height_adjust_equal" style="height: 100%">
        <div class="full-size" ref="chartContainer">
          <div ref="pieChart" class="full-size content_center"></div>
        </div>
      </el-col>
    </el-row>

    <el-row style="width:100%; height: 50%">
      <div class="full-size" ref="chartContainer2">
        <div ref="areaChart" class="full-size content_center"></div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  name: "RightTwo",

  data() {
    return {
      text: '',
      checkList: [],

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
            data: [],
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
      chartData2: {
        xAxis: [],
        data: [],
      },
      chartOption2: {
        title: {
          text: 'Time',
          // left: 'center',
          textStyle: {
            fontSize: 14,
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            axis: 'x',
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
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick:{
              show: true
            },
            axisLabel:{
              formatter: function (value, index) {
                return '';
              }
            }
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

  watch: {
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
/deep/ .underline-input {
  border: none;
  box-shadow: none !important;

}

/deep/ .underline-input .el-input__inner {
  border: none;
  border-bottom: 1px solid #000000;
  border-radius: 0;
  /*padding-left: 0;*/
  font-size: 14px;
  background-color: transparent;
}

.label {
  padding-left: 10px;
  font-size: 14px;
}
</style>