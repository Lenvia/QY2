<template>
  <div class="div-border" ref="chartContainer" style="height: 100%; width: 100%; background-color: #f6fafd">
    <div ref="scatterChart" class="content_center" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import * as echarts from 'echarts'

export default {
  name: "RightOne.vue",
  data() {
    return {
      chart: null,
      chartData: {
        nodes: [
          // {id: 1, name: 'Node 1', x: 100, y: 100},
          // {id: 2, name: 'Node 2', x: 200, y: 50},
          // {id: 3, name: 'Node 3', x: 300, y: 250}
        ],
        links: [
          // {source: 1, target: 2},
          // {source: 2, target: 3}
        ]
      },
      chartOption: {
        title: {
          // text: 'Graph on Cartesian'
        },
        tooltip: {},
        xAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          },
          axisLabel:{
            show: false
          },
          axisTick:{
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          },
          axisLabel:{
            show: false
          },
          axisTick:{
            show: false
          }
        },
        // grid: {
        //   show: false
        // },
        series: [
          {
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 40,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            data: [],
            links: [],
            lineStyle: {
              color: '#2f4554'
            }
          }
        ]
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      // 初始化画布
      this.chart = echarts.init(this.$refs.scatterChart)

      axios.get('/fake.json')
          .then(response => {
            const json_data = response.data;

            // 解析json
            this.chartData.nodes = json_data["nodes"];
            this.chartData.links = json_data["links"];
          })
          .catch(error => {
            console.log(error);
          }).then(() => {  // 绘制

            /*
              series[0].data 需要传入一个数组，该数组中的每一项都是一个对象，该对象包含了一组数据，其中包括：
              value：表示数据值，可以是数字或字符串；
              name：表示数据项的名称，可以是数字或字符串；
              itemStyle：表示数据项的样式，可以是对象或函数；
              label：表示数据项的标签，可以是对象或函数；
              emphasis：表示数据项的高亮状态，可以是对象或函数。
             */
            this.chartOption.series[0].data = this.chartData.nodes.map(node => ({
              value: [node.x, node.y],
              name: node.name,
              symbolSize: Math.sqrt(node.size) * 10,
              itemStyle:{
                color: node.color,
              }
            }));


            this.chartOption.series[0].links = this.chartData.links.map(link => ({
              source: link.source,
              target: link.target,
              lineStyle: {
                color: link.color,
                width: link.width,
                curveness: link.curveness,
              },
            }));

            this.chart.setOption(this.chartOption)
          });


    });

  },

  watch: {
    chartData() {
      this.chartOption.series[0].data = this.chartData.nodes.map(node => ({
        "value": [node.x, node.y],
        "name": node.name,
      }));


      this.chartOption.series[0].links = this.chartData.links.map(link => ({
        source: link.source,
        target: link.target,
        lineStyle: {
          color: '#0000ff',
        },
      }));

      this.chart.setOption(this.chartOption)
    },
  },

  methods: {}

}
</script>

<style scoped>

</style>