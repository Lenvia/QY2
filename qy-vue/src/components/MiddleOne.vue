<template>
  <el-form style="height: 100%;display:flex;" :model="form3">

    <!--左侧输入框-->
    <el-col class="flex_column" :span="9" style="flex-grow:1;height: 100%">
      <!--左侧上框-->
      <el-row class="flex_column div-border border  mb-2 border-opacity-50" style="flex-grow:1; height: 50%; width: 95%; ">

        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="10">
            <label class="label">Analysis Region</label>
          </el-col>
          <el-col :span="12">
            <el-select v-model="form3.value" placeholder="">
              <!--            <el-option-->
              <!--                v-for="item in options"-->
              <!--                :key="item.value"-->
              <!--                :label="item.label"-->
              <!--                :value="item.value">-->
              <!--            </el-option>-->
            </el-select>
          </el-col>
        </el-row>

        <!--ymd-->
        <el-row class="height_adjust_equal content_center">
          <el-radio-group v-model="form3.dateType" @change="onDateTypeChange">
            <el-radio label="Y">Year</el-radio>
            <el-radio label="M">Month</el-radio>
            <el-radio label="D">Day</el-radio>
          </el-radio-group>
        </el-row>

        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="10">
            <label class="label">Time Range</label>
          </el-col>

          <el-col :span="12" class="content_center">
            <el-date-picker id="timeRangePicker" :type=dateType :format=dateFormat :value-format=dateFormat :disabled=dateDisable
                            v-model="form3.timeRange" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-row>
        <!--stay days-->
        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="10">
            <label class="label">Stay Days</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form3.stayDays" class="underline-input"></el-input>
          </el-col>
        </el-row>
        <!--entrance day-->
        <el-row class="height_adjust_equal content_vertical_center">
          <el-col :span="10">
            <label class="label">Entrance day</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form3.entranceDay1" class="underline-input"></el-input>
          </el-col>
          <el-col class="line" :span="1" style="display:flex; justify-content: center;">-</el-col>
          <el-col :span="6">
            <el-input v-model="form3.entranceDay2" class="underline-input"></el-input>
          </el-col>
        </el-row>
        <!--提交按钮-->
        <el-row style="display: flex; justify-content: end;align-items: center; flex-grow:1">
          <el-button class="btn btn-primary content_center" style="width:30%; height: 60%; margin-right: 10px" @click="onEnter">Enter</el-button>
        </el-row>
      </el-row>

      <!--左侧饼图-->
      <el-row class="flex_column" style="flex-grow:1;height: 50%">
        <div class="div-border border mb-2 border-opacity-50" ref="chartContainer" style="height: 100%; width: 95%;">
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
import axios from "axios";
import {eventBus} from "@/plugin/event-bus";

export default {
  name: "MiddleOne",
  data() {
    return {
      backgroundImage: require('@/assets/bg2.jpg'),
      form3: {
        dateType: 'Y',
        timeRange: null,
        stayDays: '',
        entranceDay1: '',
        entranceDay2: '',
        value: '',
      },
      dateType:'',
      dateFormat: '',
      dateDisable: false,
      chartData: [],
      chartSize: 0,
      chartRadius: 0,
      chartColors: d3.scaleOrdinal(d3.schemePastel2),
    };
  },

  methods: {
    onEnter() {
      this.$message({
        message: JSON.stringify(this.form3),
        type: 'success'
      });

      eventBus.$emit('showArea', {
        dateType: this.form3.dateType,
        timeRange: this.form3.timeRange
      });

    },

    onDateTypeChange(){
      this.updateDatePicker();
    },

    updateDatePicker(){
      let datePicker = this.$el.querySelector('#timeRangePicker');
      // 清空当前里的日期
      this.form3.timeRange = null;
      switch (this.form3.dateType){
        case "Y":
          this.dateType = "";
          this.dateFormat = "";
          datePicker.readOnly = true;
          this.dateDisable = true;
          break;
        case "M":
          this.dateType = "year";
          this.dateFormat = "yyyy";
          datePicker.readOnly = false;
          this.dateDisable = false;
          break;
        case "D":
          this.dateType = "month";
          this.dateFormat = "yyyy-MM";
          datePicker.readOnly = false;
          this.dateDisable = false;
          break;
      }
    },

    drawChart() {
      this.chartSize = Math.min(this.$refs.chartContainer.clientWidth, this.$refs.chartContainer.clientHeight);
      // console.log(this.$refs.chartContainer.clientWidth, this.$refs.chartContainer.clientHeight);
      this.chartRadius = this.chartSize * 0.4;

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
          .attr('dy', '0.1em')
          .attr('font-size', '16px')
          .text(d => d.data.label);
    },
  },

  mounted() {
    this.updateDatePicker();

    this.$nextTick(function () {
      axios.get('/json_total.json')
          .then(response => {
            const json_data = response.data;
            // console.log(json_data);
            this.chartData = [];

            for (let key in json_data) {
              this.chartData.push({label: key, value: json_data[key]});
            }
          })
          .catch(error => {
            console.log(error);
          }).then(() => {
        this.drawChart();
      });

    });

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

.label {
  padding-left: 10px;
  font-size: 14px;
}


</style>