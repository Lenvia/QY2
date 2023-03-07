<template>
  <div id="timeLineContainer" ref="timeLineContainer" style="height: 100%; width: 100%">
    <div class="image-container" ref="imageContainer">
      <div class="image border" v-for="(image, index) in timeLineImageArray" :key="index"
           :style="{ backgroundImage: `url(${require('@/assets/cluster/line_cluster_step/' + image)})` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightThree",
  
  data(){
    return{
      timeLineImageArray: [],  // 聚类流线

      selectedStream: '',  // 被选择的聚类流线

    }
  },

  created() {
    // 读取assets文件夹下所有图片的文件名
    const requireImg = require.context('@/assets/cluster/line_cluster_step', false, /\.(png)$/);
    // 将文件名保存到数组中
    this.timeLineImageArray = requireImg.keys().map(key => {
      return key.slice(2); // 去掉文件名前面的'./'
    });
  },

  mounted() {
    this.$nextTick(() => {
      const element = this.$refs.imageContainer;
      element.addEventListener("wheel", (event) => {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      });
    });

  },
}
</script>

<style scoped>
.image-container {
  display: flex;
  width: 100%;
  height: 100%;

  overflow-x: auto;
  align-items: center;
}

/*聚类流线*/
#timeLineContainer .image {
  flex-shrink: 0; /*图片不缩放，溢出部分有滚动条*/
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

#timeLineContainer .image:hover {
  background-color: #eee;
}
</style>