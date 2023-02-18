<template>
  <el-form class="flex_column" ref="form" :model="form" label-width="80px" style="height: 100%">
    <el-row class="flex_row" style="background-color: #42b983">
      <el-col :span="14" class="flex_column height_adjust_equal" style="background-color: aliceblue; height: 100%">
        <el-radio-group v-model="form.resource">
          <el-row class="ratio-content-left">
            <el-form-item id="case_label" class="custom-form-item" :label="`${case_label}`" ></el-form-item>
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
            <el-form-item class="custom-form" label="number" style="padding: 0">
              <input class="input-box" v-model="form.number"/>
            </el-form-item>
          </el-row>
          <el-row class="input-content-right">
            <el-form-item class="custom-form" style="margin-bottom: 10px" label="depth">
              <input class="input-box" v-model="form.depth"/>
            </el-form-item>
          </el-row>


          <el-row class="ratio-content-left">
            <el-radio label="Analysis Region"></el-radio>
          </el-row>

          <el-row class="input-content-right">
            <el-checkbox label="necessary" v-model="form.necessary" name="type"></el-checkbox>
          </el-row>

          <el-row class="input-content-right">
            <el-form-item class="custom-form" label="stay">
              <input class="input-box" v-model="form.stay"/>
            </el-form-item>
          </el-row>
        </el-radio-group>
      </el-col>
      <el-col :span="10" class="height_adjust_equal flex_column" style="height: 100%">

        <el-row class="content_center" style="flex-grow: 8">
          <div style="background-color: blueviolet; height: 90%; width: 80%">123</div>
        </el-row>

        <el-row class="content_center" style="flex-grow: 1">
          <el-button class="content_center" style="height: 50%; width: 80%">Record</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="background-color: darkkhaki">
      <el-row class="">
        <el-form-item class="custom-form" label="Task Name">
          <input class="input-box" v-model="form.taskName"/>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item class="custom-form" label="Time Range">
          <el-col :span="11" class="content_center">
            <el-date-picker class="date-picker" type="date" icon="none" value-format="yyyy-MM-dd"
                            v-model="form.timeRange1" style="width: 100%;"></el-date-picker>
          </el-col>

          <el-col class="line" :span="2" style="display:flex; justify-content: center;">-</el-col>

          <el-col :span="11" class="content_center">
            <el-date-picker class="date-picker" type="date" icon="none" value-format="yyyy-MM-dd"
                            v-model="form.timeRange2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row class="input-content-right">
        <el-button class="content_center" style="height: 30px; width: 40%; margin-bottom: 10px">Create Task</el-button>
      </el-row>
    </el-row>

    <el-row class="content_center" style="flex-grow: 3">
      <div style="background-color: blueviolet; height: 90%; width: 95%">123</div>
    </el-row>

  </el-form>
</template>

<script>
export default {
  name: "OceanRecord",

  data() {
    return {
      case_label: " ",  // 默认一个空格
      form: {
        name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: '',
        // lifetime: '',
        // number: '',
        // depth: '',
        // necessary: '',
        // stay: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.case_label = "123";
    });
  },

}
</script>


<style scoped>
.el-form-item{
  margin-bottom: 0;
}

/deep/ .el-input__inner {
  height: 30px;
  line-height: 30px;
  font-size: 10px;
}

/deep/ .el-form-item__label {
  white-space: nowrap
}

/deep/ .custom-form-item .el-form-item__label {
  height: 25px;
  margin-bottom: 0;
  margin-top: 0;
  text-align: left;
  font-size: 18px;
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
  margin-bottom: 5px;
}

.date-picker {
  justify-content: center;
  align-items: center;
  height: 10px !important;
  font-size: 10px !important;
}

.el-divider--horizontal{
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid #d2d2d2;
}

.bold-divider{
  border-top-width: 3px;
  border-top-color: black;
}

</style>