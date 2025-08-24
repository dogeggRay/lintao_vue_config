<template>
  待开发
  <!-- <div class="demo-list" style="background-color: transparent;">
    <nut-list :list-data="data" :container-height="470" @scroll-bottom="onScrollBottom">
      <template #default="{ index }">

        <div class="list-item" style="background: rgba(0, 0, 0, 0.8);color:white;">
            <nut-row>
                <nut-col :span="6">标题</nut-col>
                <nut-col :span="18">
                <div class="content">啊啊啊啊啊</div>
                </nut-col>
            </nut-row>
            <nut-row >
                <nut-col :span="6">跳转链接</nut-col>
                <nut-col :span="18">
                <div class="content" style="font-size: x-small;">https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg</div>
                </nut-col>
            </nut-row>
            <nut-row class="img-row" style="">
                <nut-col :span="6">滚动图</nut-col>
                <nut-col :span="18" >
                     <nut-uploader :url="uploadUrl" :data="formData" :headers="formData" :with-credentials="true"></nut-uploader>
                </nut-col>
            </nut-row>
        </div>
      </template>
    </nut-list>
  </div> -->
</template>
<script setup lang="ts">
import { ref, onMounted, reactive} from 'vue'

const uploadUrl = 'https://lintao.raysvivi.com'
const formData = {
  custom: 'test'
}

const url = 'https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg'
const defaultFileList = reactive([
  {
    name: '文件1.png',
    url: 'https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg',
    status: 'success',
    message: '上传成功',
    type: 'image'
  }])

const data = ref(new Array(5).fill(0))

onMounted(() => {
  data.value = data.value.map((_: number, index: number) => index + 1)
})

const onScrollBottom = () => {
//   let arr = new Array(5).fill(0)
//   const len = data.value.length
//   data.value = data.value.concat(arr.map((_: number, index: number) => len + index + 1))
}
</script>

<style>

.demo-list .list-item{
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  text-align: left;

}


</style>
