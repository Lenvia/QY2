<template>
  <el-form style="height: 100%; background-color: #d2d2d2;display:flex;" :model="form3">

    <!--左侧输入框-->
    <el-col class="flex_column" :span="8" style="flex-grow:1;height: 100%">
      <!--左侧上框-->
      <el-row class="flex_column" style="flex-grow:1; background-color: beige;height: 50%">
        <!--ymd-->
        <el-row class="height_adjust_equal content_center">
          <el-radio v-model="form3.dateType" label="Year">Year</el-radio>
          <el-radio v-model="form3.dateType" label="Month">Month</el-radio>
          <el-radio v-model="form3.dateType" label="Day">Day</el-radio>
        </el-row>
        <!--time range-->
        <!--        <el-row class="height_adjust_equal content_center">-->
        <!--          <el-col :span="8">-->
        <!--            <el-input v-model="form3.date1" style="width: 100%;"></el-input>-->
        <!--          </el-col>-->
        <!--          <el-col class="line" :span="2"></el-col>-->
        <!--          <el-col :span="8">-->
        <!--            <el-input v-model="form3.date2" style="width: 100%;"></el-input>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <el-row class="height_adjust_equal content_vertical_center">

          <el-col :span="8">
            <label class="label">Time Range</label>
          </el-col>

          <el-col :span="6" class="content_center">
            <el-date-picker type="month" value-format="yyyy-MM"
                            v-model="form3.timeStart" style="width: 100%;"></el-date-picker>
          </el-col>

          <el-col class="line" :span="2" style="display:flex; justify-content: center;">-</el-col>

          <el-col :span="6" class="content_center">
            <el-date-picker type="month" value-format="yyyy-MM"
                            v-model="form3.timeEnd" style="width: 100%;"></el-date-picker>
          </el-col>

        </el-row>
        <!--stay days-->
        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="8">
            <label class="label">Stay Days</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form3.stayDays" class="underline-input"></el-input>
          </el-col>
        </el-row>
        <!--entrance day-->
        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="8">
            <label class="label">Entrance day</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form3.entranceDay1" class="underline-input"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="display:flex; justify-content: center;">-</el-col>
          <el-col :span="6">
            <el-input v-model="form3.entranceDay2" class="underline-input"></el-input>
          </el-col>
        </el-row>
        <!--提交按钮-->
        <el-row style="display: flex; justify-content: end;align-items: center; flex-grow:1">
          <el-button style="height: 60%; margin-right: 10px" @click="onEnter">Enter</el-button>
        </el-row>
      </el-row>

      <!--左侧下框-->
      <el-row class="flex_column" style="flex-grow:1;height: 50%">
        <div ref="chartContainer" style="height: 100%; width: 100%">
          <div ref="pieChart" class="content_center"></div>
        </div>


      </el-row>

    </el-col>
    <!--右侧地图-->
    <el-col :span="16" style="flex-grow:1">
      <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    </el-col>
  </el-form>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "MiddleOne",
  data() {
    return {
      backgroundImage: require('@/assets/bg2.jpg'),
      form3: {
        dateType: '',
        date1: '',
        date2: '',
        stayDays: '',
        entranceDay1: '',
        entranceDay2: '',
      },
      chartData: [
        { label: 'A', value: 20 },
        { label: 'B', value: 80 },
      ],
      chartSize: 0,
      chartRadius: 0,
      chartColors: d3.scaleOrdinal(d3.schemeCategory10),
    };
  },

  methods: {
    onEnter() {
      this.$message({
        message: JSON.stringify(this.form3),
        type: 'success'
      });
    },

    drawChart() {
    this.chartSize = Math.min(this.$refs.chartContainer.clientWidth, this.$refs.chartContainer.clientHeight);
    console.log(this.$refs.chartContainer.clientWidth, this.$refs.chartContainer.clientHeight);
    this.chartRadius = this.chartSize* 0.4;

      const svg = d3.select(this.$refs.pieChart)
          .append('svg')
          .attr('width', this.chartSize)
          .attr('height', this.chartSize);

      const g = svg.append('g')
          .attr('transform', `translate(${this.chartSize / 2}, ${this.chartSize / 2})`);

      const pie = d3.pie()
          .sort(null)
          .value(d => d.value);

      const path = d3.arc()
          .outerRadius(this.chartRadius)
          .innerRadius(0);

      const arc = g.selectAll('.arc')
          .data(pie(this.chartData))
          .enter()
          .append('g')
          .attr('class', 'arc');

      arc.append('path')
          .attr('d', path)
          .attr('fill', (d, i) => this.chartColors(i));

      arc.append('text')
          .attr('transform', d => `translate(${path.centroid(d)})`)
          .attr('dy', '0.35em')
          .text(d => d.data.label);
    },
  },

  mounted() {
    this.drawChart();
  }
}
</script>

<style scoped>
.background-image-module {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

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

.custom-form {
  height: 25px;
  margin-bottom: 1px;
}

.label{
  padding-left: 10px;
  font-size: 14px;
}


</style>