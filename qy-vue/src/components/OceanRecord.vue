<template>
  <el-row class="flex_column" style="height: 100%">
    <!--Record-->
    <el-form class="flex_column" ref="form" :model="form" label-width="80px" style="height: 45%">
      <el-row class="flex_row" style="background-color: #42b983; height: 100%">
        <!--Record左侧框-->
        <el-col :span="14" class="flex_column height_adjust_equal" style="background-color: aliceblue; height: 100%">
          <el-radio-group v-model="form.operationType" @change="handleChange">
            <el-row class="content_center">
              <el-form-item id="case_label" class="custom-form-item" :label="`${case_label}`"
                            style="width:95%; margin-left:5% ;display: flex;align-items: center;"></el-form-item>
            </el-row>
            <el-divider class="bold-divider"></el-divider>

            <el-row class="ratio-content-left">
              <el-radio label="Start Region"></el-radio>
            </el-row>

            <el-row class="input-content-right">
              <el-form-item class="custom-form" label="lifetime">
                <input class="input-box" v-model="form.lifetime"/>
              </el-form-item>
            </el-row>
            <el-row class="input-content-right">
              <el-form-item class="custom-form" label="number">
                <input class="input-box" v-model="form.number"/>
              </el-form-item>
            </el-row>

            <el-row class="input-content-right">
              <el-form-item class="custom-form" label="depth">
                <input class="input-box" v-model="form.depth"/>
              </el-form-item>
            </el-row>

            <el-row class="input-content-right">
              <el-form-item class="custom-form" label="interval">
                <el-select class="interval-input" v-model="form.interval" placeholder="">
                  <el-option label="Year" value="Year"></el-option>
                  <el-option label="Month" value="Month"></el-option>
                  <el-option label="Day" value="Day"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row class="input-content-right">
              <el-form-item class="custom-form" style="margin-bottom: 10px" label="expand">
                <input class="input-box" v-model="form.expand"/>
              </el-form-item>
            </el-row>


            <el-row class="ratio-content-left">
              <el-radio label="Analysis Region"></el-radio>
            </el-row>
            <el-row class="input-content-right">
              <el-form-item class="custom-form" label="expand">
                <input class="input-box" v-model="form.expand"/>
              </el-form-item>
            </el-row>
          </el-radio-group>
        </el-col>
        <!--Record右侧框-->
        <el-col :span="10" class="height_adjust_equal flex_column" style="height: 100%">
          <!--记录框-->
          <el-row class="content_center" style="flex-grow: 8">
            <div style="background-color: beige; height: 90%; width: 80%">
              <textarea class="div-border" ref="recordBox" style="width: 100%; height: 100%; resize: none;"
                        readonly></textarea>
            </div>
          </el-row>
          <el-row class="content_center" style="flex-grow: 1">
            <el-button class="content_center" @click="onRecord" style="height: 50%; width: 80%">Record</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>

    <el-divider></el-divider>
    <!--Task-->
    <el-form class="flex_column" ref="form2" :model="form2" label-width="80px" style="height: 60%">
      <!--Task item-->
      <el-row class="flex_column" style="background-color: beige; height: 45%">
        <!--TaskName-->
        <el-row class="height_adjust_equal">
          <el-form-item class="custom-form" label="Task Name">
            <input class="input-box" v-model="form2.taskName"/>
          </el-form-item>
        </el-row>
        <!--TimeRange-->
        <el-row class="height_adjust_equal">
          <el-form-item class="custom-form" label="Time Range">
            <el-col :span="10" class="content_center">
              <el-date-picker type="month" value-format="yyyy-MM"
                              v-model="form2.timeStart" style="width: 100%;"></el-date-picker>
            </el-col>

            <el-col class="line" :span="2" style="display:flex; justify-content: center;">-</el-col>

            <el-col :span="10" class="content_center">
              <el-date-picker type="month" value-format="yyyy-MM"
                              v-model="form2.timeEnd" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row class="input-content-right height_adjust_equal">
          <el-button class="content_center" style="height: 25px; width: 40%; margin-bottom: 10px" @click="onCreateTask">
            Create Task
          </el-button>
        </el-row>
      </el-row>

      <!--Task view-->
      <el-row class="content_center" style="height: 50%;">
        <el-col :span="8" style="background-color: aliceblue; height: 100%">
          <div class="taskContainer " style="width: 100%; height: 100%; background-color: aliceblue; ">
            <el-table
                ref="singleTable"
                :data="tableData"
                border
                style="width: 100%; height: 100%;"
                highlight-current-row
                @current-change="handleCurrentChange">
              <el-table-column
                  prop="name"
                  label="Task Name">
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <!--        <el-col :span="4" class="flex_row" style=" height: 100%"></el-col>-->
        <el-col :span="16" class="flex_row" style="background-color: aliceblue; height: 100%">
          <textarea ref="taskBox" style="width: 100%; height: 95%; resize: none; border-width: 2px" readonly></textarea>
        </el-col>

      </el-row>

    </el-form>
  </el-row>
</template>


<script>
import {eventBus} from '@/plugin/event-bus'
import {task} from "@vue/cli-plugin-eslint/ui/taskDescriptor";

export default {
  name: "OceanRecord",

  data() {
    return {
      case_label: " ",  // 默认一个空格
      form: {
        region: [],
        operationType: 'Start Region',
        lifetime: 360,
        number: 3000,
        depth: 0,
        interval: 'Year',  // 下拉框
        expand: 1,
      },
      form2: {
        taskName: '',
        timeStart: '',
        timeEnd: '',
      },

      recordList: [],
      taskRecordMap: new Map(),

      // log
      tableData: [

      ],
      currentRow: null,  // table当前行
      taskLogMap: new Map(),
    }
  },

  created() {
    // eventBus.$on('nodeSelected', (nodeName) => {
    //   this.case_label = nodeName
    // })
    let digit = 2;
    eventBus.$on('rectCreated', ({lon1, lat1, lon2, lat2}) => {
      // console.log(lon1, lat1, lon2, lat2);
      if (isNaN(lon1) || isNaN(lat1) || isNaN(lon2) || isNaN(lat2)) {
        this.case_label = " ";
        this.form.region = [];
      } else {
        this.case_label = `(${lon1.toFixed(digit)}, ${lat1.toFixed(digit)}) -> (${lon2.toFixed(digit)}, ${lat2.toFixed(digit)})`;
        this.form.region = [lon1.toFixed(digit), lat1.toFixed(digit), lon2.toFixed(digit), lat2.toFixed(digit)];
      }
    });
  },

  methods: {
    onRecord() {
      console.log(this.form);
      this.$message({
        message: JSON.stringify(this.form),
        type: 'success'
      });
      this.recordList.push(this.form);

      this.$refs.recordBox.value += JSON.stringify(this.form);
      this.$refs.recordBox.value += '\n\n';
      this.$refs.recordBox.scrollTop = this.$refs.recordBox.scrollHeight;
    },
    onCreateTask() {
      if(this.checkTaskDuplicated(this.form2.taskName)){
        this.$message({
          message: 'Task name conflict!',
          type: 'error'
        });
        return ;
      }

      this.$message({
        message: JSON.stringify(this.form2),
        type: 'success'
      });

      // 添加到map，并清空recordBox
      this.taskRecordMap.set(this.form2.taskName, this.recordList);
      this.$refs.recordBox.value = ""

      // TODO: 把task和recordBox 的内容发送给后端
      // console.log(this.$refs.recordBox.value, JSON.stringify(this.form2));

      // 添加到日志列表
      this.tableData.push({name: this.form2.taskName});
      // 为task name建立一个hash表，存放日志
      this.taskLogMap.set(this.form2.taskName, "This is: " + this.form2.taskName);
    },

    handleChange(value) {
      // console.log('当前选项的值是：', value);
      eventBus.$emit('operationTypeChange', value);
    },

    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(val);

      this.$refs.taskBox.value = "";  // 清空上一个task的内容
      this.$refs.taskBox.value = this.taskLogMap.get(val.name);  // 从log表里取出内容

      // TODO 进行一些操作

    },

    checkTaskDuplicated(taskName){
      return this.taskRecordMap.has(taskName);
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.$refs.recordBox.value = ''; // 初始值
    });
  },

}
</script>


<style scoped>
* {
  background-color: transparent !important;
}


/deep/ .el-form {
  margin-bottom: 0;
  /*height: 100%;*/
}


/deep/ .el-table .el-table__cell {
  padding: 0;
}

/deep/ .el-table__body-wrapper {
  max-height: calc(100% - 20px); /* 20px是表头的高度，需要减去 */
  overflow-y: auto;
}

.el-form-item {
  margin-bottom: 0;
}

/*record坐标*/
/deep/ .custom-form-item .el-form-item__label {
  height: 25px;
  margin-bottom: 0;
  margin-top: 0;
  text-align: left;
  font-size: 12px;
}


.input-box {
  width: 80px;
  font-size: 12px;
  line-height: 15px;
}

/deep/ .el-radio__label{
  font-size: 13px;
}

.input-content-right {
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

.ratio-content-left {
  display: flex;
  justify-content: start;
  margin-left: 10px;
}

.custom-form {
  height: 22px;
  margin-bottom: 1px;
}
/deep/ .custom-form .el-form-item__label{
  font-size: 12px;
}


.date-picker {
  justify-content: center;
  align-items: center;
  height: 10px !important;
  font-size: 18px !important;
}



.bold-divider {
  border-top-width: 3px;
  border-top-color: black;
  width: 90%;
  margin-left: 5%;
}

/*record interval下拉框*/
/deep/ .interval-input .el-input__inner {
  height: 20px;
  width: 86px;  /*这里应该是 width = input-box 的width + 自己的 padding + border 才能对齐*/
  line-height: 20px;
  font-size: 12px;
  padding: 0 2px;
  border-width: 1px;
}


</style>