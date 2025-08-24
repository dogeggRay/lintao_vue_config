<template>

  <nut-image-preview :show="preview.show" :images="preview.urls" @close="hideFn"/>

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
    <nut-row :gutter="20" v-for="item in rollingImage.list" :key="item">
        <nut-col :span="12">
          <div class="table-content"><nut-image :src="item.link" height="50" fit="contain" position="left" @click="showImagePreview(item.link)"/></div>
        </nut-col>
        <nut-col :span="12">
          <div class="table-content">
              <span class="btn_link" @click="showDetail(item.id,false)">查看</span><span class="btn_link" @click="deleteDetail(item.id)">删除</span>
          </div>
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
import { ref,reactive,onMounted} from 'vue'
import { ImagePreview } from '@nutui/nutui'
import service from '@/utils/request'
const preview = reactive({
  show:false,
  urls:[],
})

const rollingImage = reactive({
  list:[]
})

const showImagePreview = (url) =>{
  console.log("showImagePreview access,url:"+url,preview.show)
  preview.urls = []
  preview.urls.push({
    src:url
  })
  preview.show = true
}

const hideFn = () =>{
  preview.show = false
}

const getRollingImagePage=()=>{
  service({
      url: '/api/rollingImage/getPage',
      method: 'post',
      data:{"pageIndex":1,"pageSize":10}})
      .then((res) => {
        rollingImage.list = res.data.records;
      })
      .catch((err) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
      })
}

onMounted(() => {
  getRollingImagePage()
})
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

.btn_link{
  color: blue;
  text-decoration: underline;
  margin-right: 10px;
  cursor: pointer;
}
</style>
