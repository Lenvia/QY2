<template>
  <div class="background-image-module" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>

</template>

<script>
export default {
  name: "OceanMap",

  data() {
    return {
      backgroundImage: require('@/assets/bg2154-3504.png')
    };
  }
}
</script>

<style scoped>
.background-image-module {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>