<template>
  <div ref="chart"></div>
</template>

<script>
import * as d3 from 'd3';
import axios from "axios";
import async from "async";
import {eventBus} from "@/plugin/event-bus";


export default {
  name: "MiddleTwo",
  data() {
    return {

      focusLine: null,
      tooltip: null,
      timeRange: null,

      svg: null,
      lock: false,  // 面积图锁

      chart: {
        labels: [],
        data1: [],
        data2: [],
        margin: {top: 10, right: 20, bottom: 20, left: 40},
        width: 0,
        height: 0,
        color: 'blue',
      },
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
        this.removeChartContent(this.svg);
        this.drawChart(this.svg);
      });
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.chart.width = this.$parent.$el.offsetWidth - this.chart.margin.left - this.chart.margin.right;
      this.chart.height = this.$parent.$el.offsetHeight - this.chart.margin.top - this.chart.margin.bottom;

      this.svg = d3.select(this.$refs.chart)
          .append('svg')
          .attr('width', this.chart.width + this.chart.margin.left + this.chart.margin.right)
          .attr('height', this.chart.height + this.chart.margin.top + this.chart.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart.margin.left},${this.chart.margin.top})`);


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
        this.drawChart(this.svg);
      });


    });

  },
  methods: {
    parseJson(json_data) {
      this.chart.labels = json_data["label"];
      this.chart.data1 = []
      this.chart.data2 = []

      for (let i = 0; i < this.chart.labels.length; i++) {
        this.chart.data1.push({x: this.chart.labels[i], y: json_data["data"][i][0]});
        this.chart.data2.push({x: this.chart.labels[i], y: json_data["data"][i][1]});
      }
    },
    removeChartContent(svg) {
      svg.selectAll('path').remove();
      svg.selectAll('g').remove();
      this.focusLine.remove();
      this.tooltip.remove();
    },

    drawChart(svg) {
      const xScale = d3.scaleLinear()
          .domain([d3.min(this.chart.labels), d3.max(this.chart.labels)])
          .range([0, this.chart.width]);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(this.chart.data1.concat(this.chart.data2), d => d.y)])
          .range([this.chart.height, 0]);

      const tickFormat = d3.format(".0f");  // 禁用千位分隔符并保留整数部分
      const xAxisCall = d3.axisBottom(xScale).tickValues(this.chart.labels).tickFormat(tickFormat);  // 自定义刻度值
      const yAxisCall = d3.axisLeft(yScale).tickValues([0, d3.max(this.chart.data1.concat(this.chart.data2), d => d.y)]).tickFormat(tickFormat);

      const area1 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chart.data1);

      const area2 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chart.data2);

      // 绘制x和y轴
      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${this.chart.height})`)
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


      this.focusLine = svg.append('line')
          .attr('class', 'focus-line')
          .style('display', 'none')
          .style('stroke', 'black')
          .style('stroke-dasharray', '5 5')
          .style('pointer-events', 'none');

      this.tooltip = d3.select(this.$refs.chart)
          .append('div')
          .attr('class', 'tooltip')
          .style('display', 'none')
          .style('position', 'absolute')
          .style('border', '1px solid black')
          // .style('background-color', 'white')
          .style('font-size', '14px')
          .style('padding', '3px')
          .style('pointer-events', 'none');

      var that = this
      // 添加鼠标事件
      svg.on('mousemove', function (event) {
        // 获取鼠标相对于svg的位置
        const [x, y] = d3.pointer(event);
        const xPos = x;  // 由于在建立svg时，已经把margin和图表width单独计算了，所以不用在这里减margin
        const yPos = y;


        // 查找最近的数据点
        const bisect = d3.bisector(d => d.x).left;
        const map_x = xScale.invert(xPos);  // 当前位置反映射到x轴上的数值
        const index = bisect(that.chart.data1, map_x);  // 根据数值在x轴上二分查找

        const lower = that.chart.data1[index - 1];
        const upper = that.chart.data1[index];
        const d = map_x - lower.x > upper.x - map_x ? upper : lower;
        const d2 = d === lower ? that.chart.data2[index - 1] : that.chart.data2[index];

        // 更新虚线位置
        that.focusLine.style('display', null)
            .attr('x1', xScale(d.x))  // 根据数值再映射回位置
            .attr('y1', 0)
            .attr('x2', xScale(d.x))
            .attr('y2', that.chart.height);

        // 更新提示框内容和位置
        that.tooltip.transition()
            .duration(100)
            .style('display', null)
            .style('opacity', 1);
        that.tooltip.html(`time: ${d.x} <br> data1: ${d.y}, data2: ${d2.y}`)
            .style('left', `${xPos}px`)
            .style('top', `${yPos - 40}px`);
      })
          .on('mouseout', function () {
            // 隐藏虚线和提示框
            that.focusLine.style('display', 'none');
            that.tooltip.transition()
                .duration(200)
                .style('opacity', 0)
                .style('display', 'none');
          })
          .on('click', function (event) {
            if(that.lock === false){
              that.lock = true;  // 上锁，并禁用move
              const [x, y] = d3.pointer(event);
              const xPos = x;
              // 查找最近的数据点
              const bisect = d3.bisector(d => d).left;
              const map_x = xScale.invert(xPos);  // 当前位置反映射到x轴上的数值
              const index = bisect(that.chart.labels, map_x);  // 根据数值在x轴上二分查找

              const lower = that.chart.labels[index - 1];
              const upper = that.chart.labels[index];
              const d = map_x - lower > upper - map_x ? upper : lower;

              // 传递日期给子图
              let date;
              if(that.timeRange === null) date = d.toString();
              else date = [that.timeRange, d.toString()].join('-')

              eventBus.$emit('showMultiCharts', {
                date: date,
              });

              // 固定focusLine
              // 更新虚线位置，隐藏提示框
              // svg.on("mouseout", null);
              // that.tooltip.transition()
              //     .duration(200)
              //     .style('opacity', 0)
              //     .style('display', 'none');
              // svg.on('mousemove', null);

            }
            else{  // 关锁，打开move
              that.lock = false;
            }


          });
    },
  },
  watch: {}
}
</script>

<style scoped>

</style>