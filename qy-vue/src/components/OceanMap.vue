<template>
  <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>

</template>

<script>
export default {
  name: "OceanMap",

  data() {
    return {
      backgroundImage: 'https://github.com/Lenvia/md-pic/blob/master/uPic/68747470733a2f2f73322e617831782e636f6d2f323031392f30352f32322f56397435616e2e706e67.png'
    };
  }
}
</script>

<style scoped>
.background-image-module {
  height: 50px;
  width: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>