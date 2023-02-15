<template>
  <div ref="ocean_map" class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>

</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';
import {lonlat2imgxy, imgxy2lonlat} from '@/utils/utils';

export default {
  name: "OceanMap",

  data() {
    return {
      backgroundImage: require('@/assets/bg2154-3504.png')
    };
  },

  mounted() {

    const [container_w, container_h] = [this.$refs.ocean_map.clientWidth, this.$refs.ocean_map.clientHeight];


    const container = this.$refs.ocean_map;
    const width = 500;  // 裁剪出来的宽度
    const height = 500;  // 裁剪出来的高度
    const scale = Math.min(container_w / width, container_h / height);  // 缩放比例
    container.style.backgroundPosition = '0 0';  // 将背景图片定位到左上角
    container.style.backgroundSize = `${scale * width}px ${scale * height}px`;  // 缩放背景图片


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
                .attr('r', radian)
                .style('fill', color)

          }
        })
        .catch(error => {
          console.log(error);
        });


  }
}
</script>

<style scoped>
.background-image-module {
  width: 100%;
  height: 100%;
  /*background-position: left top;*/
  /*background-size: 351px 351px;*/
  background-size: cover;
  /*background-repeat: no-repeat;*/
  /*background-position: 0 0;*/
}
</style>