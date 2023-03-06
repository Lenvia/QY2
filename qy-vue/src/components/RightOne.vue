<template>
  <div class="div-border" ref="container" style="height: 100%; width: 100%; background-color: #123456; display: flex; flex-direction: column">
    <div ref="bgContainer" style="height: 70%; width: 100%;"
         :style="{ backgroundImage: `url(${originImage})`, backgroundSize: `cover`}"></div>
    <div id="pathContainer" ref="pathContainer">
      <div class="image-container">
              <div class="image" v-for="(image, index) in imageArray" :key="index"
                   @click="handleImageClick(image)" :style="{ backgroundImage: `url(${require('@/assets/' + image)})` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import * as echarts from 'echarts'

export default {
  name: "RightOne.vue",
  data() {
    return {
      originImage: require('@/assets/CrossDomain/result.png'),

      imageArray: [
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',
        'CrossDomain/result.png',

        //...
      ]

    }
  },

  mounted() {
    this.$nextTick(() => {

    });

  },

  methods: {
    handleImageClick(image) {
      // 处理图片点击事件
      console.log(image);
    }
  },

  watch: {},

}
</script>

<style scoped>

#pathContainer {
  height: 30%;
  width: 100%;
  box-sizing: border-box;
}

.image-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #123456;
  overflow-x: auto;
  align-items: center;
}

#pathContainer .image {
  flex-shrink: 0;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 5px;
  margin-left: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  white-space: nowrap;
}

</style>