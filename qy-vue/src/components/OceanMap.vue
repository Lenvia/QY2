<template>
  <div ref="ocean_map" class="background-image-module" :style="{ backgroundImage: `url(${croppedImageUrl})`}"></div>

</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';
import {lonlat2imgxy, imgxy2lonlat} from '@/utils/utils';
import { eventBus } from '@/plugin/event-bus'
export default {
  name: "OceanMap",

  data() {
    return {
      container_w: 0,
      container_h: 0,
      originImage: require('@/assets/bg-30.png'),
      croppedImageUrl: '', // 裁剪后图片的路径
      imageWidth: 0, // 原始图片的宽度
      imageHeight: 0, // 原始图片的高度
      canvasWidth: 0, // canvas的宽度
      canvasHeight: 0, // canvas的高度
      croppedWidth: 0, // 裁剪后的宽度
      croppedHeight: 0, // 裁剪后的高度
      startX: 400,  // 裁剪区域左上角 x 坐标
      startY: 200,  // 裁剪区域左上角 y 坐标
      ratio: 0, // 原始图片宽高比例
      case: 0,
    };
  },

  methods: {
    // 绘制裁剪后的图片到canvas上
    draw(canvas, ctx) {
      const img = new Image();
      img.src = this.originImage;
      img.onload = () => {

        // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.drawImage(img, this.startX, this.startY, this.croppedWidth, this.croppedHeight, 0, 0, this.canvasWidth, this.canvasHeight);
        // ctx.drawImage(img, this.startX, this.startY, this.croppedWidth, this.croppedHeight, 0, 0, this.canvasWidth, this.canvasHeight);
        this.croppedImageUrl = canvas.toDataURL();
      };
    },

    handleClick(){
      const target = d3.select(event.target);
      this.selectNode(target.attr("name"));
    },
    selectNode(nodeName){  // 发送到 Record界面显示
      eventBus.$emit('nodeSelected', nodeName);
    }


  },

  mounted() {
    // [this.container_w, this.container_h] = [this.$refs.ocean_map.clientWidth, this.$refs.ocean_map.clientHeight]
    [this.container_w, this.container_h] = [this.$parent.$el.offsetWidth, this.$parent.$el.offsetHeight]

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 图片加载完成后初始化canvas
    const img = new Image();
    img.src = this.originImage;
    img.onload = () => {
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      this.ratio = this.imageWidth / this.imageHeight;
      // 实际尺寸
      this.canvasWidth = this.croppedWidth = this.container_w;
      this.canvasHeight = this.croppedHeight = this.container_h;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.$nextTick(this.draw(canvas, ctx));
      this.$nextTick(function () {
        const svg = d3.select(this.$refs.ocean_map).append('svg')
            .attr('width', this.container_w)
            .attr('height', this.container_h);

        if(this.case === 0) {
          axios.get('/geneFlowNode.json')
              .then(response => {
                const json_data = response.data;
                const nodes = json_data["nodes"];
                for (let i = 0; i < nodes.length; i++) {
                  let color = nodes[i]["color"];
                  if (Array.isArray(color) && color.length === 3) {  // 转成字符串
                    color = "rgb(" + color.join(',') + ")";
                  }

                  let display_name = nodes[i]["display name"];
                  let id = 'node' + nodes[i]["id"];
                  let lat = nodes[i]["latitude"];
                  let lon = nodes[i]["longitude"];
                  let name = nodes[i]["name"];
                  let radian = nodes[i]["radian"];
                  let shape = nodes[i]["shape"];

                  // 映射 + 偏移修正
                  let [x, y] = lonlat2imgxy(lon, lat, this.imageWidth, this.imageHeight);
                  x = x - this.startX;
                  y = y - this.startY;

                  // 显示图形
                  svg.append(shape)
                      .attr('cx', x)
                      .attr('cy', y)
                      .attr('r', radian)
                      .attr('id', id)
                      .attr('name', name)
                      .style('fill', color)
                      .style('opacity', 0.3)
                      .style('cursor', 'pointer')
                      .on('click', this.handleClick.bind(this))

                  // 显示文字
                  svg.append("text")
                      .attr("x", x)
                      .attr("y", y + radian / 3)
                      .attr("text-anchor", "middle")
                      .attr('font-size', '14px')
                      .style('fill', 'white')
                      .style('pointer-events','none')
                      .text(display_name);
                }
              })
              .catch(error => {
                console.log(error);
              }).then(() => {
            axios.get('/geneFlowLink.json').then(response => {
              var json_data = response.data;
              var links = json_data["links"];
              for (let i = 0; i < links.length; i++) {
                let node1 = links[i]["node-1"];
                let node2 = links[i]["node-2"];
                let value = links[i]["value"];


                let p1_x = parseFloat(d3.select("#node" + node1).attr('cx'));
                let p1_y = parseFloat(d3.select("#node" + node1).attr('cy'));
                let p2_x = parseFloat(d3.select("#node" + node2).attr('cx'));
                let p2_y = parseFloat(d3.select("#node" + node2).attr('cy'));

                let bias = 10
                if (p1_x < p2_x) {
                  p1_x += bias;
                  p2_x -= bias;
                } else if (p1_x > p2_x) {
                  p1_x -= bias;
                  p2_x += bias;
                }


                const arrowPath = `M${p1_x},${p1_y} L${p2_x},${p2_y}`;

                // 在 SVG 中添加箭头
                svg.append('path')
                    .attr('d', arrowPath)
                    .attr('marker-end', 'url(#arrow)')
                    .attr('stroke', 'cyan')
                ;

                // 在 SVG 中添加箭头定义
                svg.append('defs')
                    .append('marker')
                    .attr('id', 'arrow')
                    .attr('viewBox', '0 0 10 10')
                    .attr('refX', 8)
                    .attr('refY', 5)
                    .attr('markerWidth', 6)
                    .attr('markerHeight', 6)
                    .attr('orient', 'auto-start-reverse')
                    .append('path')
                    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
                    .style('fill', 'white');
              }

            }).catch(error => {
              console.log(error);
            })
          });
        }
        else{
          axios.get('/habitatNode.json')
              .then(response => {
                const json_data = response.data;
                const nodes = json_data["nodes"];
                for (let i = 0; i < nodes.length; i++) {

                  let color = nodes[i]["color"];
                  if (Array.isArray(color) && color.length === 3) {  // 转成字符串
                    color = "rgb(" + color.join(',') + ")";
                  }

                  let display_name = nodes[i]["display name"];
                  let id = 'habitat_node' + nodes[i]["id"];
                  let lat = nodes[i]["latitude"];
                  let lon = nodes[i]["longitude"];
                  let name = nodes[i]["name"];
                  let radian = nodes[i]["radian"];
                  let shape = nodes[i]["shape"];
                  let remark = nodes[i]["remark"];

                  // 映射 + 偏移修正
                  let [x, y] = lonlat2imgxy(lon, lat, this.imageWidth, this.imageHeight);
                  x = x - this.startX;
                  y = y - this.startY;


                  // 显示图形
                  svg.append(shape)
                      .attr('cx', x)
                      .attr('cy', y)
                      .attr('r', radian)
                      .attr('id', id)
                      .attr('name', name)
                      .style('fill', color)
                      .style('opacity', 1)
                      .on('click', this.handleClick.bind(this))
                }
              })
              .catch(error => {
                console.log(error);
              });
        }




      })
    };




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