<template>
  <el-row class="flex_column" style="height: 100%">
    <!--Record-->
    <el-form class="flex_column" ref="form" :model="form" label-width="80px" style="height: 50%">
      <el-row class="flex_row" style="background-color: #42b983">
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
                <input class="input-box" v-model="form.interval"/>
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
              <el-form-item class="custom-form"  label="expand">
                <input class="input-box" v-model="form.expand"/>
              </el-form-item>
            </el-row>
          </el-radio-group>
        </el-col>
        <!--Record右侧框-->
        <el-col :span="10" class="height_adjust_equal flex_column" style="height: 100%">
          <!--记录框-->
          <el-row class="content_center" style="flex-grow: 8">
            <div style="background-color: blueviolet; height: 90%; width: 80%">
              <textarea ref="recordBox" style="width: 100%; height: 100%; resize: none; border-width: 2px" readonly></textarea>
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
    <el-form class="flex_column" ref="form2" :model="form2" label-width="80px" style="height: 45%">

      <el-row style="background-color: darkkhaki; flex-grow: 0">
        <!--TaskName-->
        <el-row>
          <el-form-item class="custom-form" label="Task Name">
            <input class="input-box" v-model="form2.taskName"/>
          </el-form-item>
        </el-row>
        <!--TimeRange-->
        <el-row>
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
        <el-row class="input-content-right">
          <el-button class="content_center" style="height: 25px; width: 40%; margin-bottom: 10px" @click="onCreateTask">
            Create Task
          </el-button>
        </el-row>
      </el-row>

      <el-row class="content_center" style="flex-grow: 3">
        <div style="background-color: blueviolet; height: 95%; width: 95%">
          <textarea ref="taskBox" style="width: 100%; height: 95%; resize: none; border-width: 2px" readonly></textarea>
        </div>
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
        interval: '',  // 下拉框
        expand: 1,
      },
      form2: {
        taskName: '',
        timeStart: '',
        timeEnd: '',
      }
    }
  },

  created() {
    // eventBus.$on('nodeSelected', (nodeName) => {
    //   this.case_label = nodeName
    // })
    let digit = 2;
    eventBus.$on('rectCreated', ({lon1, lat1, lon2, lat2}) => {
      // console.log(lon1, lat1, lon2, lat2);
      if (isNaN(lon1) || isNaN(lat1) || isNaN(lon2) || isNaN(lat2)){
        this.case_label = " ";
        this.form.region = [];
      }
      else {
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
      this.$refs.recordBox.value += JSON.stringify(this.form);
      this.$refs.recordBox.value += '\n\n';
      this.$refs.recordBox.scrollTop = this.$refs.recordBox.scrollHeight;
    },
    onCreateTask() {
      console.log(this.form2);
      this.$message({
        message: JSON.stringify(this.form2),
        type: 'success'
      });

      this.$refs.taskBox.value = "";  // 清空上一个task的内容
      this.$refs.taskBox.value = this.$refs.taskBox.value + "Creating task: " + `${this.form2.taskName}` + " ......\n";
      // 进行一些操作
      // 把task和recordBox 的内容发送给后端
      console.log(this.$refs.recordBox.value, JSON.stringify(this.form2));
      // ...
      this.$refs.taskBox.value += "The task is created!";

    },

    handleChange(value) {
      // console.log('当前选项的值是：', value);
      eventBus.$emit('operationTypeChange', value);
    },
  },

  mounted() {
    this.$nextTick(function () {
      this.$refs.recordBox.value = ''; // 初始值
    });
  },

}
</script>


<style scoped>
/deep/ .el-form {
  margin-bottom: 0;
  /*height: 100%;*/
}

.el-form-item {
  margin-bottom: 0;
}


/deep/ .custom-form-item .el-form-item__label {
  height: 25px;
  margin-bottom: 0;
  margin-top: 0;
  text-align: left;
  font-size: 14px;
}


.input-box {
  width: 80px;
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
  height: 25px;
  margin-bottom: 1px;
}

.date-picker {
  justify-content: center;
  align-items: center;
  height: 10px !important;
  font-size: 18px !important;
}

/*分割线*/
.el-divider--horizontal {
  /*默认 width:100%*/
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid #d2d2d2;
}

.bold-divider {
  border-top-width: 3px;
  border-top-color: black;
  width: 90%;
  margin-left: 5%;
}

</style>