<template>
  <div class="videoContainer ">
      <video class="fullscreenVideo" id="bgVid" playsinline="true" autoplay="true" muted="true" loop="true">
        <source src="@/background/background_wolp.mp4" type="video/mp4">
      </video>
  </div>

  <nut-tabs v-model="value" :animated-time="0"  style="background-color: transparent;">
    <nut-tab-pane title="轮播图配置" pane-key="1" style="background-color: transparent;"> <rollingImg/></nut-tab-pane>
    <nut-tab-pane title="热卖商品配置" pane-key="2"><hotsale/></nut-tab-pane>
  </nut-tabs>
<!-- 
  <div class="flex-container">
        <div class="flex-menu-left" style="">
            1111111111
        </div>
        <div class="flex-content-right">
            222222222222222
        </div>
  </div> -->
</template>

<script setup>
import { defineComponent } from 'vue';
import rollingImg from '@components/homepage/components/rollingImg.vue'
import hotsale from '@components/homepage/components/hotsale.vue'
import { ref } from 'vue'
const value = ref('1')

const onChange = (val) => {
  console.log('val', val)
}

</script>

<style scoped>
.flex-container{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}
.videoContainer{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

.videoContainer:before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25,29,34,.65);
  background-size: cover;
}

.fullscreenVideo{
  width: 100%;
  height: 100%;
  object-fit: cover
}
</style>