<template>
  <div ref="chartContainer" style="height: 100%; width: 100%; background-color: #42b983">
    <div ref="scatterChart" class="content_center" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";

export default {
  name: "RightOne.vue",
  data() {
    return {
      svg: null,
      chart: {
        labels: [],
        data: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
        color: ["#9400D3", "#009999"],
      },
    }
  },

  mounted() {
    this.$nextTick(() => {

      // 初始化 svg
      this.chart.width = this.$refs.chartContainer.offsetWidth - this.chart.margin.left - this.chart.margin.right;
      this.chart.height = this.$refs.chartContainer.offsetHeight - this.chart.margin.top - this.chart.margin.bottom;

      this.svg = d3.select(this.$refs.scatterChart)
          .append('svg')
          .attr('width', this.chart.width + this.chart.margin.left + this.chart.margin.right)
          .attr('height', this.chart.height + this.chart.margin.top + this.chart.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart.margin.left},${this.chart.margin.top})`);


      // 获取数据
      axios.get('/json_statistics.json')
          .then(response => {
            const json_data = response.data;

            // 解析json
            this.chart.labels = json_data["label"];
            this.chart.data = this.chart.labels.map((label, i) => ({ x: label, y: json_data.data3[i] }));
          })
          .catch(error => {
            console.log(error);
          }).then(() => {  // 绘制
        this.drawScatterChart(this.svg, this.chart);
      });



    });

  },

  methods:{
    drawScatterChart(svg, chart) {
      // 设置 SVG 尺寸和 margin

      // 创建 X 轴比例尺
      const xScale = d3.scaleLinear()
          .domain([0, d3.max(chart.data, d => d.x)])
          .range([0, chart.width]);

      // 创建 Y 轴比例尺
      const yScale = d3.scaleLinear()
          .domain([0, d3.max(chart.data, d => d.y)])
          .range([chart.height, 0]);

      // 添加 X 轴
      svg.append('g')
          .attr('transform', `translate(0,${chart.height})`)
          .call(d3.axisBottom(xScale));

      // 添加 Y 轴
      svg.append('g')
          .call(d3.axisLeft(yScale));

      // 添加散点
      svg.selectAll('circle')
          .data(chart.data)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 5)
          .attr('fill', 'steelblue');
    },
  }

}
</script>

<style scoped>

</style>