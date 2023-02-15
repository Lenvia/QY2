<template>
  <div ref="ocean_map" class="background-image-module" :style="{ backgroundImage: `url(${croppedImageUrl})`}"></div>

</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';
import {lonlat2imgxy, imgxy2lonlat} from '@/utils/utils';

export default {
  name: "OceanMap",

  data() {
    return {
      backgroundImage: require('@/assets/bg2154-3504.png'),
      croppedImageUrl: '', // 裁剪后图片的路径
      imageWidth: 0, // 原始图片的宽度
      imageHeight: 0, // 原始图片的高度
      canvasWidth: 0, // canvas的宽度
      canvasHeight: 0, // canvas的高度
      croppedWidth: 1600, // 裁剪后的宽度
      croppedHeight: 1600, // 裁剪后的高度
      ratio: 0, // 原始图片宽高比例
    };
  },

  methods: {
    // 绘制裁剪后的图片到canvas上
    draw(canvas, ctx) {
      const img = new Image();
      img.src = this.backgroundImage;
      img.onload = () => {
        console.log('-------')
        ctx.drawImage(img, 1000, 350, this.croppedWidth, this.croppedHeight, 0, 0, this.canvasWidth, this.canvasHeight);
        this.croppedImageUrl = canvas.toDataURL();
      };
    },


  },

  mounted() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 图片加载完成后初始化canvas
    const img = new Image();
    img.src = this.backgroundImage;
    img.onload = () => {
      this.imageWidth = img.width;
      this.imageHeight = img.height;

      this.ratio = this.imageWidth / this.imageHeight;
      this.canvasWidth = this.croppedWidth;
      this.canvasHeight = this.croppedHeight;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.$nextTick(this.draw(canvas, ctx));
    };


    this.$nextTick(function (){
      let [container_w, container_h] = [this.$refs.ocean_map.clientWidth, this.$refs.ocean_map.clientHeight]
      const ocean_map = d3.select(this.$refs.ocean_map).append('svg')
          .attr('width', container_w)
          .attr('height', container_h);

      axios.get('/geneFlowNode.json')
          .then(response => {
            var json_data = response.data;
            console.log(json_data)
            var gene_nodes = json_data["nodes"];
            for (let i = 0; i < gene_nodes.length; i++) {

              let color = gene_nodes[i]["color"];
              let display_name = gene_nodes[i]["display_name"];
              let id = gene_nodes[i]["id"];
              let lat = gene_nodes[i]["latitude"];
              let lon = gene_nodes[i]["longitude"];
              let name = gene_nodes[i]["name"];
              let radian = gene_nodes[i]["radian"];
              let shape = gene_nodes[i]["shape"];

              let [x, y] = lonlat2imgxy(lon, lat, container_w, container_h);

              ocean_map.append(shape)
                  .attr('cx', x)
                  .attr('cy', y)
                  .attr('r', radian/3 )
                  .style('fill', color)
            }
          })
          .catch(error => {
            console.log(error);
          });

    })

  }


}
</script>

<style scoped>
.background-image-module {
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center center;
}
</style>