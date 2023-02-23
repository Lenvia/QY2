<template>
  <el-row class="flex_row" style="height: 100%;">
<!--    <el-col :span="10" class="height_adjust_equal content_center" >-->
<!--      <div style="height: 80%; width: 90%; background-color: #42b983"></div>-->
<!--    </el-col>-->
    <el-col class="height_adjust_equal flex_column" style="height: 100%">
      <el-row class="height_adjust_equal flex_row" style="background-color: blueviolet; display: flex">
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer1" class="small-view" >
            <div ref="chart1" class="content_center"></div>
          </div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer2"  class="small-view" >
            <div ref="chart2" class="content_center"></div>
          </div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div ref="chartContainer3" class="small-view" >
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
      chart1:{
        data: [],
        margin: {top: 10, right: 10, bottom: 10, left: 10},
        width: 0,
        height: 0,
        color: 'blue',
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
    // console.log(this.$refs.chartContainer1.offsetWidth)
      this.chart1.width = this.$refs.chartContainer1.offsetWidth - this.chart1.margin.left - this.chart1.margin.right;
      this.chart1.height = this.$refs.chartContainer1.offsetHeight - this.chart1.margin.top - this.chart1.margin.bottom;

      // 获取数据
      axios.get('/json_statistics.json')
          .then(response => {
            const json_data = response.data;
            console.log(json_data)
            // this.chartData = [];

            // for (let key in json_data) {
            //   this.chartData.push({label: key, value: json_data[key]});
            // }
          })
          .catch(error => {
            console.log(error);
          }).then(() =>{  // 绘制
        this.drawChart1();
      });



    });
  },

  methods:{
    drawChart1() {
      // const svg = d3.select(this.$refs.chart)
      //     .append('svg')
      //     .attr('width', this.chartWidth + this.chartMargin.left + this.chartMargin.right)
      //     .attr('height', this.chartHeight + this.chartMargin.top + this.chartMargin.bottom)
      //     .append('g')
      //     .attr('transform', `translate(${this.chartMargin.left},${this.chartMargin.top})`);
      //
      // const x = d3.scaleLinear()
      //     .domain([0, this.chartData.length - 1])
      //     .range([0, this.chartWidth]);
      //
      // const y = d3.scaleLinear()
      //     .domain([0, d3.max(this.chartData, d => d.y)])
      //     .range([this.chartHeight, 0]);
      //
      // const xAxisCall = d3.axisBottom(x);
      // const yAxisCall = d3.axisLeft(y);
      //
      // const area = d3.area()
      //     .x(function (d) {
      //       return x(d.x);
      //     })
      //     .y0(y(0))
      //     .y1(function (d) {
      //       return y(d.y);
      //     });
      //
      // svg.append('path')
      //     .datum(this.chartData)
      //     .attr('class', 'area')
      //     .attr("fill", this.color)
      //     .attr('d', area);
      //
      // svg.append('g')
      //     .attr('class', 'x axis')
      //     .attr('transform', `translate(0, ${this.chartHeight})`)
      //     .call(xAxisCall);
      //
      // svg.append('g')
      //     .attr('class', 'y axis')
      //     .call(yAxisCall);
    },
  }
}
</script>

<style scoped>

.small-view{
  height: 80%;
  width: 80%;
  background-color: limegreen;
}
</style>