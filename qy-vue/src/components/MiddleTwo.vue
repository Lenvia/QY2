<template>
  <div ref="chart"></div>
</template>

<script>
import * as d3 from 'd3';
import axios from "axios";
import async from "async";

export default {
  name: "MiddleTwo",
  data() {
    return {
      year_json_data: null,
      month_json_data: null,
      day_json_data: null,

      chartLabels: [],
      chartData1: [],
      chartData2: [],
      chartMargin: {top: 10, right: 20, bottom: 20, left: 40},
      chartWidth: 0,
      chartHeight: 0,
      color: 'blue',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chartWidth = this.$parent.$el.offsetWidth - this.chartMargin.left - this.chartMargin.right;
      this.chartHeight = this.$parent.$el.offsetHeight - this.chartMargin.top - this.chartMargin.bottom;

      const url1 = 'json_area_year.json';
      const url2 = 'json_area_month.json';
      const url3 = 'json_area_day.json';
      axios.all([
        axios.get(url1),
        axios.get(url2),
        axios.get(url3)
      ])
          .then(axios.spread((response1, response2, response3) => {
            // 处理响应
            this.year_json_data = response1.data;
            this.month_json_data = response2.data;
            this.day_json_data = response3.data;
          }))
          .catch(error => {
            // 处理错误
            // console.error(error);
          }).then(() => {
        this.parseJson(this.year_json_data);
        this.drawChart();
      });


    });

  },
  methods: {
    parseJson(json_data) {
      this.chartLabels = json_data["label"];
      this.chartData1 = []
      this.chartData2 = []

      for (let i = 0; i < this.chartLabels.length; i++) {
        this.chartData1.push({x: this.chartLabels[i], y: json_data["data"][i][0]});
        this.chartData2.push({x: this.chartLabels[i], y: json_data["data"][i][1]});
      }
      console.log(this.chartData1)
      console.log(this.chartData2)
    },


    drawChart() {
      const svg = d3.select(this.$refs.chart)
          .append('svg')
          .attr('width', this.chartWidth + this.chartMargin.left + this.chartMargin.right)
          .attr('height', this.chartHeight + this.chartMargin.top + this.chartMargin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chartMargin.left},${this.chartMargin.top})`);

      const xScale = d3.scaleLinear()
          .domain([d3.min(this.chartLabels), d3.max(this.chartLabels)])
          .range([0, this.chartWidth]);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(this.chartData1.concat(this.chartData2), d => d.y)])
          .range([this.chartHeight, 0]);

      const tickFormat = d3.format(".0f");  // 禁用千位分隔符并保留整数部分
      const xAxisCall = d3.axisBottom(xScale).tickValues(this.chartLabels).tickFormat(tickFormat);  // 自定义刻度值
      const yAxisCall = d3.axisLeft(yScale).tickFormat(tickFormat);

      const area1 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chartData1);

      const area2 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chartData2);


      // 绘制x和y轴
      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${this.chartHeight})`)
          .call(xAxisCall);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)
      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxisCall);

      // 绘制面积图
      svg.append('path')
          .attr('d', area1)
          .attr('fill', '#33cc99')
          .attr("opacity", 0.7);

      svg.append('path')
          .attr('d', area2)
          .attr('fill', '#AAAAAA')
          .attr("opacity", 0.7);
    },
  },
}
</script>

<style scoped>

</style>