<template>
  <el-row class="flex_row" style="height: 100%;">
<!--    <el-col :span="10" class="height_adjust_equal content_center" >-->
<!--      <div style="height: 80%; width: 90%; background-color: #42b983"></div>-->
<!--    </el-col>-->
    <el-col class="height_adjust_equal flex_column" style="height: 100%">
      <el-row class="height_adjust_equal flex_row" style="background-color: blueviolet; display: flex">
        <el-col :span="8" class="height_adjust_equal content_center">
          <div class="small-view">123</div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div class="small-view">123</div>
        </el-col>
        <el-col :span="8" class="height_adjust_equal content_center">
          <div class="small-view">123</div>
        </el-col>
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

.small-view{
  height: 80%;
  width: 80%;
  background-color: limegreen;
}
</style>