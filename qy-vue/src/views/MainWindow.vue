<template>
  <div style="height: 100%; width: 100%">
    <el-row type="flex" class="row-box" justify="space-around">
      <!--左侧视图-->
      <el-col :span="5" class="col-window" style="background-color: aliceblue ">
        <el-card class="box-card">
          <div class="card-header" slot="header">
            <span>Task View</span>
          </div>
          <div :style="{height: cardContentHeight + 'vh'}">
            <el-row ref="oceanMapContainer" style="height: 35vh">
              <div class="content_center" style="height: 100%; width: 100%">
                <!-- v-if="hasSize" 子组件延迟加载，只有计算出了 minSize后才会挂载子组件-->
                <OceanMap id="OceanMap" v-if="hasSize" :minSize="oceanMapHeight"
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
            <el-row style="height: 60%">
              <div :style="{height:100+'%', marginBottom: 10 +'px'}">
                <middle-one/>
              </div>
            </el-row>
            <!-- 间隙 -->
            <el-row style="height: 1%"></el-row>

            <el-row class="div-border border border-success mb-2 border-opacity-50" style="height: 40%">
              <el-row style="height: 33%">
                <div :style="{height:100+'%', marginTop:10 + 'px', marginBottom: 10 +'px'}">
                  <middle-two/>
                </div>
              </el-row>
              <el-row style="height: 66%">
                <div :style="{height:100+'%'}">
                  <middle-three/>
                </div>
              </el-row>
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
            <el-row style="height: 55%">
              <right-one/>
            </el-row>
            <el-row style="height: 1%"></el-row>
            <el-row style="height: 30%" >
              <right-two/>
            </el-row>
            <el-row style="height: 15%; ">
              <right-three/>
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
import RightTwo from "@/components/RightTwo.vue";
import RightThree from "@/components/RightThree.vue";

export default {
  name: "MainWindow.vue",
  components: {MiddleTwo, MiddleThree, MiddleOne, OceanRecord, OceanMap, RightOne, RightTwo, RightThree},

  data() {
    return {
      oceanMapWidth: 0,  // 初始化
      oceanMapHeight: 0,
      cardContentHeight: 90,  // 单位vh
    }
  },

  created() {

  },

  mounted() {
    this.$nextTick(()=>{
      // 动态挂载
      let containerWidth = this.$refs.oceanMapContainer.$el.clientWidth;
      let containerHeight = this.$refs.oceanMapContainer.$el.clientHeight;
      let minSize = Math.min(containerWidth, containerHeight);
      this.oceanMapWidth = minSize;
      this.oceanMapHeight = minSize;
    })

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

    hasSize() {
      return this.oceanMapWidth;
    },
  }
}

</script>

<style>
/*去除开发中所有的颜色背景*/
/** {*/
/*  background-color: transparent !important;*/
/*}*/

*, *::before, *::after{
  box-sizing: unset;
}

.full-size{
  height: 100%;
  width: 100%;
}

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
  font-size: 12px;
}

.label{
  white-space: nowrap;
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

.div-border {
  border: 1px solid black;
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

/*header*/
/deep/ .box-card .el-card__header {
  background-color: #e9f8f6;
  color: #123456;
  height: 2vh;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: bold;
}


</style>