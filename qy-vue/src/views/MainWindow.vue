<template>
  <div style="height: 100%; width: 100%">
    <el-row type="flex" class="row-box" justify="space-around">
      <el-col :span="5" class="col-box" style="background-color: aquamarine">
        <div class="window">
          <el-card class="box-card">
            <div slot="header">
              <span>LeftWindow</span>
            </div>
            <el-row >
              <div style="margin-bottom: 20px; background-color: cadetblue ">
                <OceanMap id="OceanMap"/>
              </div>
            </el-row>
            <el-row>
              <div style="background-color: aliceblue; height: 470px; margin-top: 5px">
                <OceanRecord id="OceanRecord"/>
              </div>
            </el-row>
          </el-card>

        </div>

      </el-col>

      <el-col :span="12" class="col-box" style="background-color: darkkhaki">
        <div class="window">
          <el-card class="box-card">
            <div slot="header">
              <span>MiddleWindow</span>
            </div>

            <el-row>
              <div style="background-color: brown; height: 350px; margin-bottom: 20px;">
                <middle-one/>
              </div>
            </el-row>
            <el-row>
              <div style="background-color: brown; height: 100px; margin-bottom: 20px;">

              </div>

            </el-row>
            <el-row>
              <div style="background-color: brown; height: 300px;">

              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>

      <el-col :span="6" class="col-box" style="background-color: aliceblue ">
        <div class="window">
          <el-card class="box-card">
            <div slot="header">
              <span>RightWindow</span>
            </div>

            <el-row>
              <div style="background-color: brown; height: 800px;">

              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>

import OceanMap from "@/components/OceanMap.vue";
import OceanRecord from "@/components/OceanRecord.vue";
import MiddleOne from "@/components/MiddleOne.vue";

export default {
  name: "MainWindow.vue",
  components: {MiddleOne, OceanRecord, OceanMap}
}

</script>

<style scoped>
.row-box {
  height: 100%;
}

.col-box {
  height: 100%;
}

.window {
  height: 900px;
}

.box-card {
  margin-left: 15px;
  margin-right: 15px;
}

#OceanMap {
  width: 300px;
  height: 300px;
}

</style>