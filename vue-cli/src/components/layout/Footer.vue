<template>
  <div class="footerWarp" >
      <ul>
        <li><router-link to='/about/introduce'>关于我们</router-link></li>|
        <li><router-link to='/about/contact'>联系我们</router-link></li>|
        <li><router-link to='/about/help'>常见问题</router-link></li>
      </ul>
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

.footerWarp{
  min-width:1200px;
  padding:20px 0;
  display:flex;
  justify-content:center;
  ul{
    width:1200px;
    display:flex;
    justify-content:center;
    li{
      a{
        padding:0px 10px;
        &:hover {
          color: @hover-color;
        }
      }
     
    }
  }
}
</style>
