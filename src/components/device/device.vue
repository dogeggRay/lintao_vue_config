<template>
  <nut-row>
    <nut-col :span="12">
      <div style="text-align:left"><nut-button size="small" type="default" shape="square" style="margin-right:10px">新增</nut-button></div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="12">
      <div class="table-header">设备名称</div>
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
    <nut-row :gutter="20" v-for="item in device.list" :key="item">
        <nut-col :span="12">
          <div class="table-content">{{item.name}}</div>
        </nut-col>
        <nut-col :span="12">
          <div class="table-content">
              <span class="btn_link" @click="showDetail">查看</span><span class="btn_link">删除</span>
          </div>
        </nut-col>
  </nut-row>









  <nut-action-sheet v-model:visible="formShow" title="Title">
    <nut-form>
    <nut-form-item label="姓名">
      <nut-input v-model="formData.name" placeholder="请输入姓名" type="text" />
    </nut-form-item>
    <nut-form-item label="年龄">
      <nut-input v-model="formData.age" placeholder="请输入年龄" type="text" />
    </nut-form-item>
    <nut-form-item label="联系电话">
      <nut-input v-model="formData.tel" placeholder="请输入联系电话" type="text" />
    </nut-form-item>
    <nut-form-item label="地址">
      <nut-input v-model="formData.addr" placeholder="请输入地址" type="text" />
    </nut-form-item>
    <nut-form-item label="备注">
      <nut-textarea v-model="formData.info" placeholder="请输入备注" type="text" />
    </nut-form-item>
  </nut-form>
  </nut-action-sheet>  
</template>
<script setup>
import { ref ,reactive,onMounted } from 'vue'
import service from '@/utils/request'
const formShow = ref(false)
const device = reactive({
  list:[]
})

const formData = ref({
  name: '',
  age: '',
  tel: '',
  addr: '',
  info: ''
})
const showDetail = () => {
  formShow.value = true
}

const getDevicePage=()=>{
  service({
      url: '/api/device/getPage',
      method: 'post',
      data:{"pageIndex":1,"pageSize":10}})
      .then((res) => {
        device.list = res.data.records;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+res)
      })
      .catch((err) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
      })
}

onMounted(() => {
getDevicePage()
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
