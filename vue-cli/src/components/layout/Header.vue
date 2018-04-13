<template>
  <div class='headerWrap'>
     <div class='headerCenter'>
         头部
     </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderLayout',

}
</script>

<style lang="less" scoped>
@import url("../../theme/base.less");

.headerWrap{
  display:flex;
  justify-content:center;
  background:red;
  .headerCenter{
    width:1200px;
    height:80px;

  }
}
</style>
