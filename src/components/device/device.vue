<template>
  <nut-row>
    <nut-col :span="12">
      <div style="text-align:left"><nut-button size="small" type="default" shape="square" style="margin-right:10px" @click="showDetail(null,true)">新增</nut-button></div>
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
    <nut-row :gutter="20" v-for="item in device.list" :key="item">
        <nut-col :span="12">
          <div class="table-content">{{item.name}}</div>
        </nut-col>
        <nut-col :span="12">
          <div class="table-content">
              <span class="btn_link" @click="showDetail(item.id,false)">查看</span><span class="btn_link" @click="deleteDetail(item.id)">删除</span>
          </div>
        </nut-col>
  </nut-row>









  <nut-action-sheet v-model:visible="formShow" title="编辑">
    <nut-form>
    <nut-form-item label="设备名称">
      <nut-input v-model="formData.name" placeholder="请输入设备名称" type="text" />
    </nut-form-item>
    <nut-form-item label="摘要">
      <nut-input v-model="formData.abstractInfo" placeholder="请输入摘要" type="text" />
    </nut-form-item>
    <nut-form-item label="描述">
      <nut-input v-model="formData.description" placeholder="请输入描述" type="text" />
    </nut-form-item>
    <nut-form-item label="上架">
      <nut-switch v-model="formData.marketable" />
    </nut-form-item>
    <nut-form-item label="图片上传">
      <nut-uploader 
        :url="uploaderRegister.url" 
        v-model:file-list="imgShowList"
        method="post" 
        :before-xhr-upload="beforeXhrUpload"
        multiple 
        @delete="showImgDelete"
        :maximize="1024 * 100" 
        :maximum="5"
        @success="uploadSuccess"
        accept="image/*"
          ></nut-uploader>
    </nut-form-item>
      <nut-space style="margin: 10px">
        <nut-button size="small" type="primary" @click="formSubmit">提交</nut-button>
        <nut-button size="small" @click="formShow=false">取消</nut-button>
      </nut-space>
  </nut-form>
  </nut-action-sheet>  

    <nut-notify
      :type="notifyState.state.type"
      v-model:visible="notifyState.state.show"
      :msg="notifyState.state.desc"
    />
</template>
<script setup>
import { ref ,reactive,onMounted } from 'vue'
import { showToast } from '@nutui/nutui'
import service from '@/utils/request'
const formShow = ref(false)
const device = reactive({
  list:[]
})

const operationFlag = ref("ADD")
const uploaderRegister = reactive({
  url:"http://localhost:8998/api/file/uploadImgFile",
})

const notifyState = {
  state: reactive({
    show: false,
    desc: '',
    type: 'warning'
  }),
  methods: {
    cellClick(type, desc) {
      notifyState.state.show = true;
      notifyState.state.type = type;
      notifyState.state.desc = desc;
    }
  }
};

let imgShowList = ref([])
const formData = ref({
  id: '',
  guid: '',
  name: '',
  abstractInfo: '',
  description: '',
  marketable: true,
  imgList: []
})

const deleteDetail = (deviceSpuId) =>{
  service({
      url: '/api/device/deleteBatch',
      method: 'post',
      data:{ids:[deviceSpuId]}})
    .then((res) => {
      showToast.success("删除成功")
      getDevicePage()
    })
    .catch((err) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
    })
}
const showDetail = (deviceSpuId,isAdd) => {
  if(isAdd){
    operationFlag.value = "ADD"
    formData.value = {
      id: '',
      guid: '',
      name: '',
      abstractInfo: '',
      description: '',
      marketable: true,
      imgList: []
    }
    imgShowList.value = []
  }else{
    operationFlag.value = "UPDATE"
    service({
      url: '/api/device/getOne?id='+deviceSpuId,
      method: 'get'})
    .then((res) => {
      formData.value = res.data;
      formData.value.imgList = [];
      if(res.data.attaches!=null){
        imgShowList.value = [];
        res.data.attaches.forEach(item => {
          formData.value.imgList.push(item.id)
          imgShowList.value.push({
            name: item.oldName,
            url: item.onlinePath,
            status: 'success',
            message: '上传成功',
            type: 'image'
          })
        });
      }
    })
    .catch((err) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
    })
  }
  formShow.value = true
}

const getDevicePage=()=>{
  service({
      url: '/api/device/getPage',
      method: 'post',
      data:{"pageIndex":1,"pageSize":10}})
      .then((res) => {
        device.list = res.data.records;
      })
      .catch((err) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
      })
}

const formSubmit = () =>{
  
  let submitUrl = '/api/device/updateOne'
  if(operationFlag!="ADD"){
    submitUrl = '/api/device/addOne'
  }
    service({
      url: submitUrl,
      method: 'post',
      data:formData.value})
      .then((res) => {
        showToast.success(res.msg)
      getDevicePage()
      })
      .catch((err) => {
        showToast.fail(err.msg)
      })

}

const showImgDelete = (image) =>{
  console.log(image);
  formData.value.imgList.splice(image.index, 1);
}

const uploadSuccess = (response) => {
  var resTest = response.responseText;
  var responseObj = JSON.parse(resTest)
  console.log("提交成功", responseObj.data.id);
  console.log(">>>>>>>>>>>>>>>>>>>>>>",formData.value.imgList)
  if(formData.value.imgList==null){
    formData.value.imgList = []
  }
  formData.value.imgList.push(responseObj.data.id)
  console.log(">>>>>>>>>>>>>>>>>>>>>>",formData.value.imgList)
  // goback();//执行调整
};


const beforeXhrUpload = (xhr, options) => {
  console.log(xhr)
  console.log(options)
  if (options.method.toLowerCase() == 'put') {
    // service({
    //   url: options.url,
    //   method: 'post',
    //   data:{"file":options.sourceFile}})
    //   .then((res) => {
    //     device.list = res.data.records;
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+res)
    //   })
    //   .catch((err) => {
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
    //   })
    xhr.send(options.sourceFile)
  } else {
    xhr.send(options.formData)
  }
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
