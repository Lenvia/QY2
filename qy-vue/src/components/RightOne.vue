<template>
  <div class="div-border" ref="container" style="height: 100%; width: 100%; display: flex; flex-direction: column">
    <div class="border-bottom" ref="bgContainer" style="height: 71%; width: 100%; position: relative">
      <img class="full-size" :src="originImage" style="z-index: 1; position: absolute" alt="bg">
      <img class="full-size" v-if="hasSelected" :src="require('@/assets/cluster/' + selectedImage)"
           style="z-index: 2; position: absolute" alt="stream">
    </div>

    <div id="pathContainer" ref="pathContainer">
      <div class="image-container">
        <div class="image border" v-for="(image, index) in imageArray" :key="index"
             @click="handleImageClick(image)"
             :style="{ backgroundImage: `url(${require('@/assets/cluster/' + image)})` }"></div>
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

      imageArray: [],

      selectedImage: '',

    }
  },

  created() {
    // 读取assets文件夹下所有图片的文件名
    const requireImg = require.context('@/assets/cluster', false, /\.(png)$/);
    // 将文件名保存到数组中
    this.imageArray = requireImg.keys().map(key => {
      return key.slice(2); // 去掉文件名前面的'./'
    });
    // console.log(this.imageArray)
  },

  mounted() {
    this.$nextTick(() => {

    });

  },

  computed: {
    hasSelected() {
      return this.selectedImage !== '';
    }
  },

  methods: {
    handleImageClick(image) {
      // 处理图片点击事件
      console.log(image);
      this.selectedImage = image;
    }
  },

  watch: {},

}
</script>

<style scoped>

.full-size {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-image {
  position: absolute
}


#pathContainer {
  height: 29%;
  width: 100%;
  box-sizing: border-box;
}

.image-container {
  display: flex;
  width: 100%;
  height: 100%;

  overflow-x: auto;
  align-items: center;
}

#pathContainer .image {
  flex-shrink: 0;  /*图片不缩放，溢出部分有滚动条*/
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 5px;
  margin-left: 5px;

  background-repeat: no-repeat;
  background-size: cover;
  white-space: nowrap;
  background-color: #fff;

  cursor: pointer;
}

#pathContainer .image:hover {
  background-color: #eee;
}


</style>