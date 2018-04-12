<template>
  <div class='header'>
     <div class='header-center'>

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

.header{
  display:flex;
  justify-content:center;
  background:#fff;
  .header-center{
    width:1200px;
    height:80px;

  }
}
</style>
