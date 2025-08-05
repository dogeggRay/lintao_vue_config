<template>
  <nut-row>
    <nut-col :span="12">
      <div style="text-align:left"><nut-button size="small" type="default" shape="square" style="margin-right:10px">新增</nut-button></div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="12">
      <div class="table-header">轮播图</div>
    </nut-col>
    <nut-col :span="12">
      <div class="table-header">操作</div>
    </nut-col>
  </nut-row>  

  <!-- <nut-row :gutter="20">
    <nut-col :span="4">
      <div class="table-content"><nut-image src="https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" height="50" fit="contain" position="left"/></div>
    </nut-col>
    <nut-col :span="8">
      <div class="table-content">https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg</div>
    </nut-col>
    <nut-col :span="6">
      <div class="table-content">热卖单品</div>
    </nut-col>
    <nut-col :span="6">
      <div class="table-content">
        <nut-button size="small" type="default" shape="square" style="margin-right:10px" @click="click">新增</nut-button>
        <nut-button size="small" type="primary" shape="square">删除</nut-button></div>
    </nut-col>
  </nut-row > -->
    <nut-row :gutter="20">
    <nut-col :span="12">
      <div class="table-content"><nut-image src="https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" height="50" fit="contain" position="left"/></div>
    </nut-col>
    <nut-col :span="12">
      <div class="table-content">
        <nut-button size="small" type="default" shape="square" style="margin-right:10px" @click="click">查看</nut-button>
        <nut-button size="small" type="primary" shape="square">删除</nut-button></div>
    </nut-col>
  </nut-row>









  <nut-action-sheet v-model:visible="show" title="Title">
    <nut-row>
    <nut-col :span="24">
      <div class="content">span:24</div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="12">
      <div class="content">span:12</div>
    </nut-col>
    <nut-col :span="12">
      <div class="content light">span:12</div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="8">
      <div class="content">span:8</div>
    </nut-col>
    <nut-col :span="8">
      <div class="content light">span:8</div>
    </nut-col>
    <nut-col :span="8">
      <div class="content">span:8</div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="6">
      <div class="content">span:6</div>
    </nut-col>
    <nut-col :span="6">
      <div class="content light">span:6</div>
    </nut-col>
    <nut-col :span="6">
      <div class="content">span:6</div>
    </nut-col>
    <nut-col :span="6">
      <div class="content">span:6</div>
    </nut-col>
  </nut-row>
  </nut-action-sheet>  
</template>
<script setup>
import { ref } from 'vue'
const show = ref(false)
const val = ref('')
const click = () => {
  show.value = true
}
</script>
<style scoped>
.table-content{
  font-size: x-small;
  text-align: left;
  margin-bottom: 10px;
}
.table-header{
  background-color: beige;
  border:solid 1px black
}
</style>
