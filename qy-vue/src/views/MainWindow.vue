<template>
  <div style="height: 100%; width: 100%">
    <el-row type="flex" class="row-box" justify="space-around">
      <!--左侧视图-->
      <el-col :span="5" class="col-window" style="background-color: aquamarine">
        <el-card class="box-card">
          <div slot="header">
            <span>LeftWindow</span>
          </div>
          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row ref="container" style="background-color: blueviolet; height: 35vh">
              <div
                  class="content_center" style="margin-bottom: 20px; background-color: cadetblue;">
                <OceanMap id="OceanMap" ref="OceanMap"
                          :style="{width: oceanMapWidth + 'px', height: oceanMapHeight + 'px'}"/>
              </div>
            </el-row>
            <el-row style=" background-color: gold ">
              <div style="background-color: aliceblue; margin-top: 20px; height: 50vh">
                <OceanRecord id="OceanRecord"/>
              </div>
            </el-row>
          </div>
        </el-card>

      </el-col>
      <!--中间视图-->
      <el-col :span="12" class="col-window" style="background-color: darkkhaki">
        <el-card class="box-card">
          <div slot="header">
            <span>MiddleWindow</span>
          </div>

          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row>
              <div :style="{backgroundColor: 'brown', height: middleOneHeight + 'vh', marginBottom: 20 +'px'}">
                <middle-one/>
              </div>
            </el-row>
            <el-row>
              <div :style="{backgroundColor: 'brown', height: middleTwoHeight + 'vh', marginBottom: 20 +'px'}">

              </div>

            </el-row>
            <el-row>
              <div :style="{backgroundColor: 'brown', height: middleThreeHeight + 'vh'}">
                <middle-three/>
              </div>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6" class="col-window" style="background-color: aliceblue ">
        <el-card class="box-card">
          <div slot="header">
            <span>RightWindow</span>
          </div>

          <el-row>
            <div style="background-color: brown; height: 800px;">

            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>


</template>

<script>

import OceanMap from "@/components/OceanMap.vue";
import OceanRecord from "@/components/OceanRecord.vue";
import MiddleOne from "@/components/MiddleOne.vue";
import MiddleThree from "@/components/MiddleThree.vue";

export default {
  name: "MainWindow.vue",
  components: {MiddleThree, MiddleOne, OceanRecord, OceanMap},

  data() {
    return {
      oceanMapWidth: 400,  // 初始化
      oceanMapHeight: 400,
      cardContentHeight: 85,  // 单位vh
    }
  },
  mounted() {
    // 动态挂载
    let containerWidth = this.$refs.container.$el.offsetWidth;
    let containerHeight = this.$refs.container.$el.offsetHeight;
    let minSize = Math.min(containerWidth, containerHeight);
    this.oceanMapWidth = minSize;
    this.oceanMapHeight = minSize;

    // OceanMap的实际宽度高度可以通过clientWidth、clientHeight获取
    // console.log(this.$refs.OceanMap.$el.clientWidth, this.$refs.OceanMap.$el.clientHeight);
  },

  computed: {
    middleOneHeight() {
      return this.cardContentHeight * 7 / 16;
    },
    middleTwoHeight() {
      return this.cardContentHeight * 2 / 16;
    },
    middleThreeHeight() {
      return this.cardContentHeight * 6.5 / 16;
    },
  }
}

</script>

<style>
/* 父类标签如此设置，子标签可以通过 flex-grow 进行 高度划分*/
.flex_column {
  display: flex;
  flex-direction: column
}

.flex_row {
  display: flex;
  flex-direction: row;
}

.height_adjust_equal {
  flex-grow: 1;
}

/* 内容居中 */
.content_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<style scoped>
.row-box {
  height: 100%;
}

.col-window {
  flex-grow: 1;
}


.box-card {
  margin-left: 15px;
  margin-right: 15px;
}

/*已在钩子函数中自适应*/
/*#OceanMap {*/
/*  width: 0;*/
/*  height: 0;*/
/*}*/

</style>