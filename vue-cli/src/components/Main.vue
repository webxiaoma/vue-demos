<template>
   <div class="loayoutWarp">
        <div class="header">
            <header-layout></header-layout>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>
        <div class="footer" >
           <footer-layout></footer-layout>
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

   }
 },
 created(){

 },
 computed:{

 },
 methods:{

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
    .body{

    }
    .footer{

    }

}

</style>
