<template>
  <div style="height: 100%; width: 100%">
    <el-row type="flex" class="row-box" justify="space-around">
      <!--左侧视图-->
      <el-col :span="5" class="col-window" style="background-color: aliceblue ">
        <el-card class="box-card">
          <div slot="header">
            <span>Task View</span>
          </div>
          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row ref="oceanMapContainer" style="background-color: blueviolet; height: 35vh">
              <div
                  class="content_center" style="background-color: cadetblue;">
                <OceanMap id="OceanMap"
                          :style="{width: oceanMapWidth + 'px', height: oceanMapHeight + 'px'}"/>
              </div>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <div style="height: 55vh">
                <OceanRecord id="OceanRecord"/>
              </div>
            </el-row>
          </div>
        </el-card>

      </el-col>
      <!--中间视图-->
      <el-col :span="12" class="col-window" style="background-color: aliceblue">
        <el-card class="box-card">
          <div slot="header">
            <span>Statistic View</span>
          </div>

          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row>
              <div :style="{height: middleOneHeight + 'vh', marginBottom: 10 +'px'}">
                <middle-one/>
              </div>
            </el-row>
            <el-row>
              <div :style="{height: middleTwoHeight + 'vh', marginBottom: 10 +'px'}">
                <middle-two/>
              </div>
            </el-row>
            <el-row>
              <div :style="{height: middleThreeHeight + 'vh'}">
                <middle-three/>
              </div>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <!--右侧视图-->
      <el-col :span="6" class="col-window" style="background-color: aliceblue ">
        <el-card class="box-card">
          <div slot="header">
            <span>Path View</span>
          </div>

          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row style="background-color: blueviolet; height: 50vh">
              <right-one/>
            </el-row>
            <el-row style=" background-color: gold ">

            </el-row>
          </div>
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
import MiddleTwo from "@/components/MiddleTwo.vue";
import RightOne from "@/components/RightOne.vue";

export default {
  name: "MainWindow.vue",
  components: {MiddleTwo, MiddleThree, MiddleOne, OceanRecord, OceanMap, RightOne},

  data() {
    return {
      oceanMapWidth: 500,  // 初始化
      oceanMapHeight: 500,
      cardContentHeight: 90,  // 单位vh
    }
  },
  mounted() {
    // 动态挂载
    let containerWidth = this.$refs.oceanMapContainer.$el.offsetWidth;
    let containerHeight = this.$refs.oceanMapContainer.$el.offsetHeight;
    let minSize = Math.min(containerWidth, containerHeight);
    this.oceanMapWidth = minSize;
    this.oceanMapHeight = minSize;
  },

  computed: {
    middleOneHeight() {
      return this.cardContentHeight * 9.5 / 16;
    },
    middleTwoHeight() {
      return this.cardContentHeight * 2 / 16;
    },
    middleThreeHeight() {
      return this.cardContentHeight * 4 / 16;
    },
  }
}

</script>

<style>
/*去除开发中所有的颜色背景*/
/** {*/
/*  background-color: transparent !important;*/
/*}*/

/*输入（日期）框*/
.el-input__inner {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}

/*分割线*/
.el-divider--horizontal {
  /*默认 width:100%*/
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid #d2d2d2;
}

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

/* 内容仅垂直居中 */
.content_vertical_center {
  display: flex;
  align-items: center;
}


/*不会随着空格换行*/
.el-form-item__label {
  white-space: nowrap;
  font-size: 14px;
}


/*清除日期输入框前面的icon*/
.el-input__icon {
  display: none;
}

.el-input--prefix .el-input__inner {
  padding-left: 5px;
}

.el-input--suffix .el-input__inner {
  padding-right: 5px;
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

/deep/ .box-card .el-card__header {
  background-color: #f0f0f0;
  /*color: #333;*/
  height: 2vh;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: bold;
}


</style>