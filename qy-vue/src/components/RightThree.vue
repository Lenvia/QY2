<template>
  <div id="timeLineContainer" ref="timeLineContainer" style="height: 100%; width: 100%">
    <div class="image-container" ref="imageContainer" v-if="hasSelected">
      <div class="image border" v-for="(image, index) in timeLineImageArray" :key="index"
           :style="{ backgroundImage: `url(${require('@/assets/cluster/line_time/' + image)})` }"></div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/plugin/event-bus";

export default {
  name: "RightThree",

  data() {
    return {
      timeLineImageArray: [],  // 聚类流线

      selectedStream: '',  // 被选择的聚类流线
      requireImg: null,
    }
  },

  created() {
    this.requireImg = require.context('@/assets/cluster/line_time', false, /\.(png)$/);

    eventBus.$on('clusterSelected', (num) => {
      this.selectedStream = num;

      // 读取assets文件夹下所有图片的文件名
      const imageRegex = new RegExp(`^.*cluster_${num}_.*\\.png$`) // 动态生成正则表达式
      const temp = this.requireImg.keys().filter(key => imageRegex.test(key));

      // 将文件名保存到数组中
      let unsortedArray = temp.map(item => {
        return item.slice(2); // 去掉文件名前面的'./'
      });

      // 排序
      this.timeLineImageArray = unsortedArray
          .map(str => ({
            str,
            num: parseInt(str.match(/step_(\d+)/)[1], 10) // 提取数字并转换为数字类型
          }))
          .sort((a, b) => a.num - b.num) // 按照数字大小进行排序
          .map(({ str }) => str); // 将排序后的数字与原始字符串进行拼接

    })
  },

  mounted() {
    this.$nextTick(() => {
      // const element = this.$refs.imageContainer;
      // element.addEventListener("wheel", (event) => {
      //   event.preventDefault();
      //   element.scrollLeft += event.deltaY;
      // });
    });

  },

  computed: {
    hasSelected() {
      return this.selectedStream !== '';
    }
  }
}
</script>

<style scoped>
.image-container {
  display: flex;
  width: 100%;
  height: 100%;

  overflow-x: auto;
  align-items: center;
  background-color: #f5f5f5;
}

/*聚类流线*/
#timeLineContainer .image {
  flex-shrink: 0; /*图片不缩放，溢出部分有滚动条*/
  display: inline-block;
  width: 124px;
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