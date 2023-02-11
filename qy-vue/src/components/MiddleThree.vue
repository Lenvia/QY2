<template>
  <el-row class="flex_row" style="height: 100%;">
    <el-col :span="10" class="height_adjust_equal content_center" >
      <div style="height: 80%; width: 90%; background-color: #42b983"></div>
    </el-col>
    <el-col :span="14" class="height_adjust_equal flex_column" style="height: 100%">

      <el-row class="height_adjust_equal" style="background-color: blueviolet; display: flex">
        <el-row class="height_adjust_equal content_center">
          <el-col :span="8">
            <el-input style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="8">
            <el-input  style="width: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-row>


      <el-row class="flex_column height_adjust_equal">
        <el-row class="height_adjust_equal content_center" v-for="count in 2 " :key="count" >
          <el-col :span="8">
            <label>Threshold{{count}}</label>
          </el-col>
          <el-col :span="8">
            <label>_____________</label>
          </el-col>
        </el-row>
      </el-row>


    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MiddleThree"
}
</script>

<style scoped>

</style>