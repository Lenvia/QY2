<template>
  <div ref="chartContainer" style="height: 100%; width: 100%; background-color: #42b983">
    <div ref="scatterChart" className="content_center" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import * as echarts from 'echarts'

export default {
  name: "RightOneBP.vue",
  data() {
    return {
      chart: null,
      chartData: {
        nodes: [
          {id: '1', name: 'Node 1', x: 100, y: 100},
          {id: '2', name: 'Node 2', x: 200, y: 50},
          {id: '3', name: 'Node 3', x: 300, y: 250}
        ],
        links: [
          {source: '1', target: '2'},
          {source: '2', target: '3'}
        ]
      },
      chartOption: {
        title: {
          text: 'Graph on Cartesian'
        },
        tooltip: {},
        xAxis: {
          type:'value'
        },
        yAxis: {
          type: 'value'
        },
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
      
      this.chart = echarts.init(this.$refs.scatterChart)
      this.chartOption.series[0].data = this.chartData.nodes.map(function (node){
        return [node.x, node.y]
      });
      this.chartOption.series[0].links = this.chartData.links.map(link => ({
        source: link.source,
        target: link.target,
        lineStyle: {
          color: '#0000ff',
        },
      }));

      this.chart.setOption(this.chartOption)

    });

  },

  methods: {

  }

}
</script>

<style scoped>

</style>