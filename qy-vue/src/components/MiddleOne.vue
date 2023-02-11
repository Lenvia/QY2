<template>
  <el-form style="height: 100%; background-color: #42b983;display:flex;" :model="form2">
    <el-col :span="13" style="flex-grow:1">
      <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    </el-col>
    <el-col class="flex_column" :span="11" style="flex-grow:1;">
      <el-row class="flex_column" style="flex-grow:1; background-color: blueviolet;">
        <el-row class="height_adjust_equal el_content_center">
          <el-radio v-model="form2.date" label="1">Year</el-radio>
          <el-radio v-model="form2.date" label="2">Month</el-radio>
          <el-radio v-model="form2.date" label="3">Day</el-radio>
        </el-row>
        <el-row class="height_adjust_equal el_content_center">
          <el-col :span="8">
            <el-input v-model="form2.date1" style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="8">
            <el-input v-model="form2.date2" style="width: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="flex_column" style="flex-grow:2;">
        <el-row class="height_adjust_equal el_content_center" v-for="count in 4 " :key="count" >
          <el-col :span="8">
          <label>Threshold{{count}}</label>
          </el-col>
          <el-col :span="8">
            <label>_____________</label>
          </el-col>
        </el-row>
        <el-row style="display: flex; justify-content: end; flex-grow:0.6">
          <el-button style="height: 50%; margin-top: 15px; margin-right: 10px">Enter</el-button>
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
      backgroundImage: require('@/assets/bg2.png'),
      form2: {
        date: '',
      }
    };
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

/deep/ .el-input__inner {
  height: 30px;
}



/* el内容居中 */
.el_content_center{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>