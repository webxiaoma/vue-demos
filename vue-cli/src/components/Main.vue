<template>
   <div class="loayoutWarp">
        <div class="header">

        </div>
        <div class="body">
          <!-- <router-view></router-view> -->
        </div>
        <div class="footer" >

        </div>
   </div>
</template>

<script>
// import {mapState} from 'vuex'

import { HeaderLayout, FooterLayout} from './layout'

export default {
 name: 'Main',
 data(){
   return{
      position:{
          right:'20px'
      },
      floatMsg:'隐藏'
   }
 },
 created(){
   let name = this.$route.meta.title;
   if(name !== "登录"){
       this.isHeader = true;
   }else{
       this.isHeader = false;
   }
 },
 computed:{
   ...mapState(['isHeaderBlogroll']),
 },
 methods:{
   floatShow(){
      if(parseInt(this.position.right) == 20){
         this.position.right = '-172px';
         this.floatMsg = '显示';
      }else{
           this.position.right = '20px';
           this.floatMsg = '隐藏';
      }
   }
 },
 components:{
     HeaderLayout,
     FooterLayout,
 }
}
</script>

<style lang="less" scoped>
@import url("../theme/base.less");

.loayoutWarp{
    min-height:100%;
    .header{

    }
    .content{

    }
    .footer{

    }

}

</style>
