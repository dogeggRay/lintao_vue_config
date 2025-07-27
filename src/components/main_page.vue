<template>
    <view><router-view></router-view></view>
      <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder  @tab-switch="tabSwitch" unactive-color="#7d7e80" active-color="#1989fa">
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :name="item.name" :tab-title="item.title" :icon="item.icon">
      </nut-tabbar-item>
    </nut-tabbar>
</template>

<script lang="ts" setup>
import service from '@/utils/request'
import { h,ref,onMounted} from 'vue'
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();

   const List = [
    {
      title: '首页配置',
      name: 'Home',
      icon: h(Home)
    },
    {
      title: '分类配置',
      name: 'Category',
      icon: h(My)
    },
    {
      title: '设备配置',
      name: 'Device',
      icon: h(Category)
    }
  ]

const active = ref(0)

const tabSwitch = (item: Record<string, unknown>, index: number) => {
  console.log(item, index)
  if(item.name == 'Home'){
    router.push('/homepage'); 
  }
  if(item.name == 'Device'){
    router.push('/device'); 
  }
  if(item.name == 'Category'){
    router.push('/category'); 
  }    
}


onMounted(() => {
  service({
      url: '/api/tourist/article/getArtclePageList',
      method: 'post',
      data:{"startIndex":0,"pageSize":5,"keyword":"","tag":"","showHidden":false}})
      .then((res: any) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+res)
      })
      .catch((err: any) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+err)
      })
})

</script>
