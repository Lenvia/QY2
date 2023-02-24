<template>
  <el-row class="flex_row" style="height: 100%;">
    <!--    <el-col :span="10" class="height_adjust_equal content_center" >-->
    <!--      <div style="height: 80%; width: 90%; background-color: #42b983"></div>-->
    <!--    </el-col>-->
    <el-col class="height_adjust_equal flex_column" style="height: 100%">
      <el-row class="height_adjust_equal flex_row" style="background-color: blueviolet; display: flex">
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

export default {
  name: "MiddleThree",

  data() {
    return {

      chart1: {
        labels: [],
        data1: [],
        data2: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
      },
      chart2: {
        labels: [],
        data: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
      },
      chart3: {
        labels: [],
        data: [],
        margin: {top: 10, right: 10, bottom: 20, left: 30},
        width: 0,
        height: 0,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs.chartContainer1.offsetWidth)
      this.chart1.width = this.$refs.chartContainer1.offsetWidth - this.chart1.margin.left - this.chart1.margin.right;
      this.chart1.height = this.$refs.chartContainer1.offsetHeight - this.chart1.margin.top - this.chart1.margin.bottom;
      this.chart2.width = this.$refs.chartContainer1.offsetWidth - this.chart2.margin.left - this.chart2.margin.right;
      this.chart2.height = this.$refs.chartContainer1.offsetHeight - this.chart2.margin.top - this.chart2.margin.bottom;
      this.chart3.width = this.$refs.chartContainer1.offsetWidth - this.chart3.margin.left - this.chart3.margin.right;
      this.chart3.height = this.$refs.chartContainer1.offsetHeight - this.chart3.margin.top - this.chart3.margin.bottom;

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
        this.drawChart1();
        this.drawChart2();
        this.drawChart3();
      });


    });
  },

  methods: {


    drawChart1() {
      const svg = d3.select(this.$refs.chart1)
          .append('svg')
          .attr('width', this.chart1.width + this.chart1.margin.left + this.chart1.margin.right)
          .attr('height', this.chart1.height + this.chart1.margin.top + this.chart1.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart1.margin.left},${this.chart1.margin.top})`);


      // 计算x和y轴的比例尺
      const xScale = d3.scaleLinear()
          .domain([d3.min(this.chart1.labels), d3.max(this.chart1.labels)])  // 定义数据范围
          .range([0, this.chart1.width]);  // 定义输出范围

      // 创建x轴对象
      const xAxis = d3.axisBottom(xScale)
          .tickValues(this.chart1.labels);  // 自定义刻度值

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(this.chart1.data1.concat(this.chart1.data2), d => d.y)])
          .range([this.chart1.height, 0]);  // 由于在Web中像素坐标的原点是左上角，所以yScale输出值的范围是反向的

      // 绘制面积图，将数据分别处理成面积生成器所需的格式
      const area1 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chart1.data1);

      const area2 = d3.area()
          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y))(this.chart1.data2);


      // 绘制x和y轴
      svg.append('g')
          .attr('transform', `translate(0, ${this.chart1.height})`)
          .call(xAxis);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)

      svg.append('g')
          .call(d3.axisLeft(yScale));

      // 绘制面积图
      svg.append('path')
          .attr('d', area1)
          .attr('fill', 'steelblue')
          .attr("opacity", 0.7);

      svg.append('path')
          .attr('d', area2)
          .attr('fill', 'yellow')
          .attr("opacity", 0.7);
    },
    drawChart2(){
      const svg = d3.select(this.$refs.chart2)
          .append('svg')
          .attr('width', this.chart2.width + this.chart2.margin.left + this.chart2.margin.right)
          .attr('height', this.chart2.height + this.chart2.margin.top + this.chart2.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart2.margin.left},${this.chart2.margin.top})`);


      // 计算x和y轴的比例尺
      const xScale = d3.scaleLinear()
          .domain([d3.min(this.chart2.labels), d3.max(this.chart2.labels)])  // 定义数据范围
          .range([0, this.chart2.width]);  // 定义输出范围

      // 创建x轴对象
      const xAxis = d3.axisBottom(xScale)
          .tickValues(this.chart2.labels);  // 自定义刻度值

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(this.chart2.data, d => d.y)])
          .range([this.chart2.height, 0]);  // 由于在Web中像素坐标的原点是左上角，所以yScale输出值的范围是反向的


      const area = d3.area()

          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y));


      // 绘制x和y轴
      svg.append('g')
          .attr('transform', `translate(0, ${this.chart2.height})`)
          .call(xAxis);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)

      svg.append('g')
          .call(d3.axisLeft(yScale));

      // 绘制面积图
      svg.append('path')
          .datum(this.chart2.data)
          .attr('d', area)
          .attr('fill', 'steelblue')
          .attr("opacity", 0.7);

    },
    drawChart3(){
      const svg = d3.select(this.$refs.chart3)
          .append('svg')
          .attr('width', this.chart3.width + this.chart3.margin.left + this.chart3.margin.right)
          .attr('height', this.chart3.height + this.chart3.margin.top + this.chart3.margin.bottom)
          .append('g')
          .attr('transform', `translate(${this.chart3.margin.left},${this.chart3.margin.top})`);


      // 计算x和y轴的比例尺
      const xScale = d3.scaleLinear()
          .domain([d3.min(this.chart3.labels), d3.max(this.chart3.labels)])  // 定义数据范围
          .range([0, this.chart3.width]);  // 定义输出范围

      // 创建x轴对象
      const xAxis = d3.axisBottom(xScale)
          .tickValues(this.chart3.labels);  // 自定义刻度值

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(this.chart3.data, d => d.y)])
          .range([this.chart3.height, 0]);  // 由于在Web中像素坐标的原点是左上角，所以yScale输出值的范围是反向的


      const area = d3.area()

          .x(d => xScale(d.x))
          .y0(yScale(0))
          .y1(d => yScale(d.y));


      // 绘制x和y轴
      svg.append('g')
          .attr('transform', `translate(0, ${this.chart3.height})`)
          .call(xAxis);  // 如果没有自定义x轴，那么这里应该填 d3.axisBottom(xScale)

      svg.append('g')
          .call(d3.axisLeft(yScale));

      // 绘制面积图
      svg.append('path')
          .datum(this.chart3.data)
          .attr('d', area)
          .attr('fill', 'steelblue')
          .attr("opacity", 0.7);

    },
  }
}
</script>

<style scoped>

.small-view {
  height: 80%;
  width: 90%;
  background-color: limegreen;
}
</style>