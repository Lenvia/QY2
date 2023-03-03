<template>
  <el-row class="flex_row" style="height: 100%;">
    <el-col class="height_adjust_equal flex_column" style="height: 100%">
      <!--      -->
      <el-row class="height_adjust_equal flex_row" style=" display: flex">
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer1" class="small-view">
            <div ref="chart1" class="content_center"></div>
          </div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer2" class="small-view">
            <div ref="chart2" class="content_center"></div>
          </div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer3" class="small-view">
            <div ref="chart3" class="content_center"></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import {eventBus} from "@/plugin/event-bus";

export default {
  name: "MiddleThree",

  data() {
    return {
      svg1: null,
      svg2: null,
      svg3: null,
      chart1: {
        labels: [],
        data1: [],
        data2: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
        color: ["#1E90FF", "#3CB371"],
      },
      chart2: {
        labels: [],
        data: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
        color: '#9370DB',
      },
      chart3: {
        labels: [],
        data: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
        color: 'steelblue',
      },
    };
  },

  created() {
    eventBus.$on('showMultiCharts', ({date}) =>{
      console.log(date);
    })
  },

  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs.chartContainer1.offsetWidth)
      // 初始化 svg
      this.chart1.width = this.$refs.chartContainer1.offsetWidth - this.chart1.margin.left - this.chart1.margin.right;
      this.chart1.height = this.$refs.chartContainer1.offsetHeight - this.chart1.margin.top - this.chart1.margin.bottom;
      this.chart2.width = this.$refs.chartContainer1.offsetWidth - this.chart2.margin.left - this.chart2.margin.right;
      this.chart2.height = this.$refs.chartContainer1.offsetHeight - this.chart2.margin.top - this.chart2.margin.bottom;
      this.chart3.width = this.$refs.chartContainer1.offsetWidth - this.chart3.margin.left - this.chart3.margin.right;
      this.chart3.height = this.$refs.chartContainer1.offsetHeight - this.chart3.margin.top - this.chart3.margin.bottom;

      this.svg1 = d3.select(this.$refs.chart1)
          .append('svg')
          .attr('width', this.chart1.width + this.chart1.margin.left + this.chart1.margin.right)
          .attr('height', this.chart1.height + this.chart1.margin.top + this.chart1.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart1.margin.left},${this.chart1.margin.top})`);

      this.svg2 = d3.select(this.$refs.chart2)
          .append('svg')
          .attr('width', this.chart2.width + this.chart2.margin.left + this.chart2.margin.right)
          .attr('height', this.chart2.height + this.chart2.margin.top + this.chart2.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart2.margin.left},${this.chart2.margin.top})`);

      this.svg3 = d3.select(this.$refs.chart3)
          .append('svg')
          .attr('width', this.chart3.width + this.chart3.margin.left + this.chart3.margin.right)
          .attr('height', this.chart3.height + this.chart3.margin.top + this.chart3.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart3.margin.left},${this.chart3.margin.top})`);


      // 获取数据
      axios.get('/json_statistics.json')
          .then(response => {
            const json_data = response.data;

            // 解析json
            this.chart1.labels = this.chart2.labels =this.chart3.labels = json_data["label"];
            this.chart1.data1 = this.chart1.labels.map((label, i) => ({ x: label, y: json_data.data1[0][i] }));
            this.chart1.data2 = this.chart1.labels.map((label, i) => ({ x: label, y: json_data.data1[1][i] }));
            this.chart2.data = this.chart2.labels.map((label, i) => ({ x: label, y: json_data.data2[i]}));
            this.chart3.data = this.chart3.labels.map((label, i) => ({ x: label, y: json_data.data3[i]}));

          })
          .catch(error => {
            console.log(error);
          }).then(() => {  // 绘制
        this.drawGroupBarChart(this.svg1, this.chart1);
        this.drawAreaChart(this.svg2, this.chart2);
        this.drawAreaChart(this.svg3, this.chart3);
      });


    });
  },

  methods: {
    // 分组柱状统计图
    drawGroupBarChart(svg, chart) {
      // 计算x和y轴的比例尺
      const xScale = d3.scaleBand()
          .domain(chart.data1.map((d) => d.x))
          .range([0, chart.width]).padding(0.1);

      // 创建x轴对象
      const xAxis = d3.axisBottom(xScale);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(chart.data1.concat(chart.data2), d => d.y)])
          .range([chart.height, 0]);  // 由于在Web中像素坐标的原点是左上角，所以yScale输出值的范围是反向的

      const yAxis = d3.axisLeft(yScale)
          .tickValues([0, d3.max(chart.data1.concat(chart.data2), d => d.y)]);

      // 绘制x和y轴
      svg.append('g')
          .attr('transform', `translate(0, ${chart.height})`)
          .call(xAxis);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)

      svg.append('g')
          .call(yAxis);


      // 绘制柱状图。两个并列
      const barWidth = xScale.bandwidth() / 2;

      const group1 = svg
          .selectAll(".group1")
          .data(chart.data1)
          .enter()  // 对于每个数据点在绑定的元素集合中创建一个矩形元素
          .append("g")
          .attr("class", "group1")
          .attr("transform", (d) => `translate(${xScale(d.x)}, 0)`);
      group1
          .append("rect")
          .attr("class", "bar1")
          // .attr("x", (d) => xScale(d.x))
          .attr("y", (d) => yScale(d.y))
          .attr("width", barWidth)
          .attr("height", (d) => chart.height - yScale(d.y))
          .attr("fill", chart.color[0])
          .attr("opacity", 0.7);

      const group2 = svg
          .selectAll(".group2")

          .data(chart.data2)
          .enter()  // 对于每个数据点在绑定的元素集合中创建一个矩形元素
          .append("g")
          .attr("class", "group1")
          .attr("transform", (d) => `translate(${xScale(d.x) + barWidth}, 0)`);
      group2
          .append("rect")
          .attr("class", "bar2")
          // .attr("x", (d) => xScale(d.x))
          .attr("y", (d) => yScale(d.y))
          .attr("width", barWidth)
          .attr("height", (d) => chart.height - yScale(d.y))
          .attr("fill", chart.color[1])
          .attr("opacity", 0.7);



    },
    // 面积图
    drawAreaChart(svg, chart){
      // 计算x和y轴的比例尺
      const xScale = d3.scaleLinear()
          .domain([d3.min(chart.labels), d3.max(chart.labels)])  // 定义数据范围
          .range([0, chart.width]);  // 定义输出范围

      // 创建x轴对象
      const xAxis = d3.axisBottom(xScale)
          .tickValues(chart.labels);  // 自定义刻度值

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(chart.data, d => d.y)])
          .range([chart.height, 0]);  // 由于在Web中像素坐标的原点是左上角，所以yScale输出值的范围是反向的

      const yAxis = d3.axisLeft(yScale)
          .tickValues([0, d3.max(chart.data, d => d.y)]);

      const area = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y));


      // 绘制x和y轴
      svg.append('g')
          .attr('transform', `translate(0, ${chart.height})`)
          .call(xAxis);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)

      svg.append('g')
          .call(yAxis);

      // 绘制面积图
      svg.append('path')
          .datum(chart.data)
          .attr('d', area)
          .attr('fill', chart.color)
          .attr("opacity", 0.7);
    },
  }
}
</script>

<style scoped>

.small-view {
  height: 80%;
  width: 95%;
  /*background-color: beige;*/
}
</style>