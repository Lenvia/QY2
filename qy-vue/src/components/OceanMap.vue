<template>
  <div ref="ocean_map" class="background-image-module div-border border border-opacity-50" :style="{ backgroundImage: `url(${croppedImageUrl})`}"></div>

</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';
import {lonlat2imgxy, imgxy2lonlat} from '@/utils/utils';
import {eventBus} from '@/plugin/event-bus'

export default {
  name: "OceanMap",

  props: {
    minSize: {
      type: Number,
      required: true
    },
  },

  data() {
    return {
      container_w: 0,
      container_h: 0,
      originImage: require('@/assets/bg1-30.png'),
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
      rect: null,
      rectStrokeColor: 'red',
    };
  },

  created() {
    eventBus.$on('operationTypeChange', value => {
      // 修改变量
      if (this.rect) {
        if (value === 'Start Region') {
          this.rectStrokeColor = 'red';
        } else {
          this.rectStrokeColor = 'blue';
        }
        this.rect.attr("stroke", this.rectStrokeColor);
      }
    })
  },

  watch:{
    minSize: function (val) {
      // console.log(val);
    },
  },

  methods: {
    // 绘制裁剪后的图片到canvas上
    draw(canvas, ctx) {
      const img = new Image();
      img.src = this.originImage;
      img.onload = () => {

        // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.drawImage(img, this.startX, this.startY, this.croppedWidth, this.croppedHeight, 0, 0, this.canvasWidth, this.canvasHeight);
        this.croppedImageUrl = canvas.toDataURL();
      };
    },


    getEndpointCoordinates(x1, y1, x2, y2, bias, bias2) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const cosTheta = Math.cos(angle);
      const sinTheta = Math.sin(angle);

      const biasX = bias * cosTheta;
      const biasY = bias * sinTheta;


      const bias2X = bias2 * sinTheta;  // 注意是 sin
      const bias2Y = bias2 * cosTheta;


      // 注意 point1 和 point2 应该保持相同的 bias2 偏移，因为它是线段的两端，线段是平移的！
      // 至于为什么 x 需要 + bias2X 而 y 需要 -bias2Y，结合图来看
      let [point1, point2] = [[x1 + biasX + bias2X, y1 + biasY - bias2Y],
        [x2 - biasX + bias2X, y2 - biasY - bias2Y],
      ];

      return [point1, point2];
    },


  },

  mounted() {
    this.container_w = this.container_h = this.minSize;  // 接收父组件传来的size

    this.$nextTick(()=>{
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
        // 添加节点
        this.$nextTick(function () {
          const svg = d3.select(this.$refs.ocean_map).append('svg')
              .attr('width', this.container_w)
              .attr('height', this.container_h);

          if (this.case === 0) {
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
                        .style('opacity', 0.5)
                    // .style('cursor', 'pointer')
                    // .on('click', this.handleClick.bind(this))

                    // 显示文字
                    svg.append("text")
                        .attr("x", x)
                        .attr("y", y + radian / 3)
                        .attr("text-anchor", "middle")
                        .attr('font-size', '14px')
                        .style('fill', 'black')
                        .text(display_name)
                        .style('user-select', 'none')
                        .style("pointer-events", "none")
                        .style("-webkit-user-select", "none");
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

                  let bias = 15, bias2 = 5;
                  // let [point1, point2] = this.getEndpointCoordinates(p1_x, p1_y, p2_x, p2_y, bias);
                  let [point1, point2] = this.getEndpointCoordinates(p1_x, p1_y, p2_x, p2_y, bias, bias2);

                  const arrowPath = `M${point1[0]},${point1[1]} L${point2[0]},${point2[1]}`;

                  // 在 SVG 中添加箭头
                  const arrow = svg.append('path')
                      .attr('d', arrowPath)
                      .attr('marker-end', 'url(#arrow)')
                      .attr('stroke', '#000000')
                      .attr('stroke-width', 2)
                      .attr("id", "arrow-path");


                  // 在 SVG 中添加箭头定义
                  svg.append('defs')
                      .append('marker')
                      .attr('id', 'arrow')
                      .attr('viewBox', '0 0 10 10')
                      .attr('refX', 8)
                      .attr('refY', 5)
                      .attr('markerWidth', 4)
                      .attr('markerHeight', 4)
                      .attr('orient', 'auto-start-reverse')
                      .append('path')
                      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
                      .style('fill', '#000000');

                  // 要求文本方向平行于箭头的指向
                  const textPath = svg.append('defs')
                      .append('path')
                      .attr('id', 'text-path'+i)
                      .attr('d', arrowPath);
                  // 创建一个text元素，并将其嵌套在textPath元素中。然后，我们将xlink:href属性设置为箭头路径元素的id属性
                  const text = svg.append('text')
                      .append('textPath')
                      .attr('xlink:href', '#text-path'+i)
                      .text(value)
                      .attr('startOffset', '50%')
                      .attr('text-anchor', 'middle')
                      .attr('font-size', '12px')
                      // 禁止文本选中
                      .style('user-select', 'none')
                      .style("pointer-events", "none")
                      .style("-webkit-user-select", "none");

                  // 根据箭头路径的方向调整文本的旋转角度，以使其方向与箭头指向一致
                  const angle = Math.atan2(point2[1] - point1[1], point2[0] - point1[0]) * 180 / Math.PI;
                  text.attr('transform', `rotate(${angle} ${point1[0]} ${point1[1]})`);
                }

              }).catch(error => {
                console.log(error);
              })
            });
          }
          else {
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
                    // .style('cursor', 'pointer')
                    // .on('click', this.handleClick.bind(this))
                  }
                })
                .catch(error => {
                  console.log(error);
                });
          }

          let x1, y1, x2, y2;
          let that = this;  // 作用域

          // 鼠标拖动事件
          svg.on("mousedown", function () {
            // 清除上一次的矩形
            if (that.rect) that.rect.remove();

            [x1, y1] = d3.pointer(event);
            that.rect = svg.append("rect")
                .attr("x", x1)
                .attr("y", y1)
                .attr("width", 0)
                .attr("height", 0)
                .attr("stroke", that.rectStrokeColor)
                .attr("stroke-width", 2)
                .attr("fill", "none");

            svg.on("mousemove", function () {
              [x2, y2] = d3.pointer(event);
              that.rect.attr("x", Math.min(x1, x2))
                  .attr("y", Math.min(y1, y2))
                  .attr("width", Math.abs(x2 - x1))
                  .attr("height", Math.abs(y2 - y1));
            });

            svg.on("mouseup", function () {
              svg.on("mousemove", null);
              svg.on("mouseup", null);

              if ([x1, y1, x2, y2].every((value) => value !== undefined)) {  // 否定单点事件
                // 换算经纬度
                let [lon1, lat1] = imgxy2lonlat(x1 + that.startX, y1 + that.startY, that.imageWidth, that.imageHeight)
                let [lon2, lat2] = imgxy2lonlat(x2 + that.startX, y2 + that.startY, that.imageWidth, that.imageHeight)

                eventBus.$emit('rectCreated', {
                  lon1: lon1,
                  lat1: lat1,
                  lon2: lon2,
                  lat2: lat2,
                });

                x1 = y1 = x2 = y2 = undefined;  // 清除

              } else {
                eventBus.$emit('rectCreated', {
                  lon1: NaN,
                  lat1: NaN,
                  lon2: NaN,
                  lat2: NaN,
                });
              }
            });


          });
        })
      };

    })


  }
}
</script>

<style scoped>
.background-image-module {
  width: 100%;
  height: 100%;

  /*background-size: cover;*/
  /*background-position: center center;*/
}
</style>