<template>
  <div class="div-border" ref="container" style="height: 100%; width: 100%; display: flex; flex-direction: column">
    <div class="border-bottom" ref="bgContainer" style="height: 71%; width: 100%; position: relative">
      <img class="full-size-img" v-if="showMap" :src="require('@/assets/CrossDomain/' + floorImage)" style="z-index: 1; position: absolute" alt="bg">
      <img class="full-size-img" v-if="hasSelected" :src="require('@/assets/cluster/line_cluster/' + selectedStream)"
           style="z-index: 2; position: absolute" alt="stream">
      <img class="point-img" v-if="showPoints" :src="require('@/assets/cluster/start_cluster/' + pointImage)" style="z-index: 3; position: absolute; bottom: 0; right: 0" alt="start">
      <div class="toolbar-container" style="z-index:4">
        <div style="position: absolute; top: 0; left: 0; width: 30px; height: 30px;">
          <img class="icon" :src="require('@/assets/icons/' + icon1.source)" @click="onClickIcon1" :title=icon1.title alt="icon1">
        </div>
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px;">
          <img class="icon" :src="require('@/assets/icons/' + icon2.source)" @click="onClickIcon2" :title=icon2.title alt="icon2">
        </div>

      </div>
    </div>

    <div id="pathContainer" ref="pathContainer">
      <div class="image-container" ref="imageContainer">
        <div class="image border" v-for="(image, index) in streamImageArray" :key="index"
             @click="handleImageClick(image)"
             :style="{ backgroundImage: `url(${require('@/assets/cluster/line_cluster/' + image)})` }"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RightOne.vue",
  data() {
    return {
      floorImage: 'result.png',  // 地图
      streamImageArray: [],  // 聚类流线

      selectedStream: '',  // 被选择的聚类流线

      pointImage: '',  // 起点聚类

      icon1:{
        title: "hide map",  // 鼠标悬停显示文字。 如果当前地图是打开的，那么文字表示下一个状态
        status: 'on',  // 当前地图的状态
        source: 'show_map.png',  // 当前图标路径
      },
      icon2:{
        title: "hide points",
        status: 'on',
        source: 'show_map.png',
      }

    }
  },

  created() {
    // 读取assets文件夹下所有图片的文件名
    const requireImg = require.context('@/assets/cluster/line_cluster', false, /\.(png)$/);
    // 将文件名保存到数组中
    this.streamImageArray = requireImg.keys().map(key => {
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

  computed: {
    hasSelected() {
      return this.selectedStream !== '';
    },

    showMap(){
      return this.icon1.status !== 'off';
    },

    showPoints(){
      return this.icon2.status !== 'off' && this.selectedStream !== '';
    }
  },

  methods: {
    handleImageClick(image) {
      // 处理图片点击事件
      this.selectedStream = image;
      let temp = image.split('.')[0].split('_');
      let num = temp[temp.length-1];
      this.pointImage = 'start_cluster_' + num + '.png';

    },

    onClickIcon1(){
      if(this.icon1.status === 'on'){  // 当前处于开启状态
        // 变换
        this.icon1.status = 'off';
        this.icon1.source = 'hide_map.png';
        this.icon1.title = 'show map';
      }
      else{
        this.icon1.status = 'on';
        this.icon1.source = 'show_map.png';
        this.icon1.title = 'hide map';
      }
    },

    onClickIcon2(){
      if(this.icon2.status === 'on'){
        this.icon2.status = 'off';
        this.icon2.source = 'hide_map.png';
        this.icon2.title = 'show points';
      }
      else{
        this.icon2.status = 'on';
        this.icon2.source = 'show_map.png';
        this.icon2.title = 'hide points';
      }
    }
  },

  watch: {},

}
</script>

<style scoped>

.full-size-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  /*  不可拖拽*/
  -webkit-user-drag: none; /* Safari */
  user-drag: none;
}



.point-img{
  width: 25%;
  height: 25%;
  object-fit: cover;

  /*  不可拖拽*/
  -webkit-user-drag: none; /* Safari */
  user-drag: none;
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

/*聚类流线*/
#pathContainer .image {
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

#pathContainer .image:hover {
  background-color: #eee;
}

/*工具栏*/
.toolbar-container {
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}


.icon {
  display: block;
  width: 30px;
  height: 30px;

  cursor: pointer;
}
.icon:hover{
  background-color: #eee;
}


</style>