<template>
  <el-form style="height: 100%; background-color: #42b983;display:flex;" :model="form3">
    <el-col :span="15" style="flex-grow:1">
      <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    </el-col>
    <el-col class="flex_column" :span="9" style="flex-grow:1;height: 100%">
      <el-row class="flex_column" style="flex-grow:1; background-color: blueviolet;">
        <el-row class="height_adjust_equal content_center">
          <el-radio v-model="form3.dateType" label="Year">Year</el-radio>
          <el-radio v-model="form3.dateType" label="Month">Month</el-radio>
          <el-radio v-model="form3.dateType" label="Day">Day</el-radio>
        </el-row>
        <el-row class="height_adjust_equal content_center">
          <el-col :span="8">
            <el-input v-model="form3.date1" style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="8">
            <el-input v-model="form3.date2" style="width: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="flex_column" style="flex-grow:2;">
        <el-row class="height_adjust_equal content_center" v-for="count in 4 " :key="count" >
          <el-col :span="8">
          <label>Threshold{{count}}</label>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form3.thresholds[count-1]" class="underline-input" ></el-input>
          </el-col>
        </el-row>
        <el-row style="display: flex; justify-content: end;align-items: center; flex-grow:0.5">
          <el-button style="height: 60%; margin-right: 10px" @click="onEnter">Enter</el-button>
        </el-row>
      </el-row>

    </el-col>
  </el-form>
</template>

<script>
export default {
  name: "MiddleOne",
  data() {
    return {
      backgroundImage: require('@/assets/bg2.jpg'),
      form3: {
        dateType: '',
        date1: '',
        date2: '',
        thresholds: [],
      }
    };
  },

  methods:{
    onEnter(){
      this.$message({
        message: JSON.stringify(this.form3),
        type: 'success'
      });
    }
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

/deep/ .underline-input{
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

</style>