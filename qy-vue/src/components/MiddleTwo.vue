<template>
  <div ref="chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: "MiddleTwo",
  data() {
    return {
      chartData: [
        {x: 0, y: 10},
        {x: 1, y: 20},
        {x: 2, y: 30},
        {x: 3, y: 25},
        {x: 4, y: 15},
        {x: 5, y: 9},
        {x: 6, y: 15},
        {x: 7, y: 17},
        {x: 8, y: 15},
        {x: 9, y: 12},
        {x: 10, y: 15},
        {x: 11, y: 14},
        {x: 12, y: 15},

      ],
      chartMargin: {top: 10, right: 10, bottom: 20, left: 20},
      chartWidth: 0,
      chartHeight: 0,
      color: 'blue',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chartWidth = this.$parent.$el.offsetWidth - this.chartMargin.left - this.chartMargin.right;
      this.chartHeight = this.$parent.$el.offsetHeight - this.chartMargin.top - this.chartMargin.bottom;
      this.drawChart();
    });

  },
  methods: {
    drawChart() {
      const svg = d3.select(this.$refs.chart)
          .append('svg')
          .attr('width', this.chartWidth + this.chartMargin.left + this.chartMargin.right)
          .attr('height', this.chartHeight + this.chartMargin.top + this.chartMargin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chartMargin.left},${this.chartMargin.top})`);

      const x = d3.scaleLinear()
          .domain([0, this.chartData.length - 1])
          .range([0, this.chartWidth]);

      const y = d3.scaleLinear()
          .domain([0, d3.max(this.chartData, d => d.y)])
          .range([this.chartHeight, 0]);

      const xAxisCall = d3.axisBottom(x);
      const yAxisCall = d3.axisLeft(y);

      const area = d3.area()
          .x(function (d) {
            return x(d.x);
          })
          .y0(y(0))
          .y1(function (d) {
            return y(d.y);
          });

      svg.append('path')
          .datum(this.chartData)
          .attr('class', 'area')
          .attr("fill", this.color)
          .attr('d', area);

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${this.chartHeight})`)
          .call(xAxisCall);

      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxisCall);
    },
  },
}
</script>

<style scoped>

</style>