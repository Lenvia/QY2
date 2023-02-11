<template>
  <el-form class="flex_column" ref="form" :model="form" label-width="50px" style="height: 100%">
    <el-row style="display:flex; background-color: #42b983">
      <el-col :span="14" class="flex_column height_adjust_equal" style="background-color: aliceblue; height: 100%">
        <el-radio-group v-model="form.resource">
          <el-row class="ratio_content_left">
            <el-radio label="Start Region"></el-radio>
          </el-row>

          <el-row class="input_content_right">
            <el-form-item class="custom-form" label="lifetime">
              <input class="input_box" v-model="form.lifetime"/>
            </el-form-item>
          </el-row>
          <el-row class="input_content_right">
            <el-form-item class="custom-form" label="number" style="padding: 0">
              <input class="input_box" v-model="form.number"/>
            </el-form-item>
          </el-row>
          <el-row class="input_content_right">
            <el-form-item class="custom-form" label="depth">
              <input class="input_box" v-model="form.depth"/>
            </el-form-item>
          </el-row>


          <el-row class="ratio_content_left">
            <el-radio label="Analysis Region"></el-radio>
          </el-row>

          <el-row class="input_content_right">
            <el-checkbox label="necessary" v-model="form.necessary" name="type"></el-checkbox>
          </el-row>

          <el-row class="input_content_right">
            <el-form-item class="custom-form" label="stay">
              <input class="input_box" v-model="form.stay"/>
            </el-form-item>
          </el-row>
        </el-radio-group>
      </el-col>
      <el-col :span="10" class="height_adjust_equal">

        <el-row class="content_center">
          <div>asdad</div>
        </el-row>

        <el-row class="content_center">
          <el-button style="height: 50%; margin-top: 15px; margin-right: 10px">Enter</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-row style="flex-grow: 2; background-color: darkkhaki">

    </el-row>

    <el-row style="flex-grow: 3">

    </el-row>


    <!--    <el-form-item label="活动性质">-->
    <!--      <el-checkbox-group v-model="form.type">-->
    <!--        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
    <!--      </el-checkbox-group>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="活动时间">-->
    <!--      <el-col :span="11">-->
    <!--        <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
    <!--      </el-col>-->
    <!--      <el-col class="line" :span="2">-</el-col>-->
    <!--      <el-col :span="11">-->
    <!--        <el-date-picker type="date" placeholder="截止日期" v-model="form.date2" style="width: 100%;"></el-date-picker>-->
    <!--      </el-col>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item>-->
    <!--      <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
    <!--      <el-button>取消</el-button>-->
    <!--    </el-form-item>-->
  </el-form>
</template>

<script>
export default {
  name: "OceanRecord",

  data() {
    return {
      form: {
        // name: '',
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
  }
}
</script>


<style scoped>
/deep/ .el-input__inner {
  height: 30px;
}

/deep/ .el-form-item__label {
  padding: 0;
}

.input_box {
  width: 80px;
}

.input_content_right {
  display: flex;
  justify-content: end;
  margin-right: 10px;
}

.ratio_content_left {
  display: flex;
  justify-content: start;
  margin-left: 10px;
}

.custom-form {
  margin-bottom: 0 !important;
}

</style>