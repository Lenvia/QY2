<template>
  <el-form style="height: 100%; background-color: #42b983;display:flex;" :model="form2">
    <el-col :span="13" style="flex-grow:1">
      <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
    </el-col>
    <el-col class="flex_column" :span="11" style="flex-grow:1;">
      <el-row class="flex_column" style="flex-grow:1; background-color: blueviolet;">
        <el-row class="height_adjust_equal" style="align-items: center;" type="flex" justify="center">
          <el-radio v-model="form2.date" label="1">Year</el-radio>
          <el-radio v-model="form2.date" label="2">Month</el-radio>
          <el-radio v-model="form2.date" label="3">Day</el-radio>
        </el-row>
        <el-row class="height_adjust_equal" style="align-items: center;" type="flex" justify="center">
          <el-col :span="8">
            <el-input v-model="form2.date1" style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="8">
            <el-input v-model="form2.date2" style="width: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="flex_column" style="flex-grow:3;">
        <el-row class="height_adjust_equal" style="background-color: cadetblue">

        </el-row>
        <el-row class="height_adjust_equal">

        </el-row>
        <el-row class="height_adjust_equal" style="background-color: cadetblue">

        </el-row>
        <el-row class="height_adjust_equal">

        </el-row>
        <el-row class="height_adjust_equal" style="background-color: cadetblue">

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

/* 父类标签如此设置，子标签可以通过 flex-grow 进行 高度划分*/
.flex_column{
  display:flex;
  flex-direction:column
}

.height_adjust_equal{
  flex-grow:1;
}

/* 内容居中 */
.content_center{

}

</style>