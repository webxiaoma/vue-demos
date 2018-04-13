<template>
  <div class="footerWrap" >
     <div class="footerCenter">
       footer
     </div>
  </div>
</template>
<script>
export default {
  name:'FooterLayout',
  data(){
    return{

    }
  },
}
</script>

<style lang="less" scoped>

@import url("../../theme/base.less");

.footerWrap{
   height:100px;
   display:flex;
   justify-content:center;
   background:black;
   text-align:center;
   .footerCenter{
     width:1200px;
     color:#fff;
   }
}
</style>
