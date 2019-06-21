<template>
  <el-container style="flex-direction: column">
    <Head></Head>
    <el-container>
      <SideBar></SideBar>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <Content></Content> -->
    </el-container>
  </el-container>
</template>

<script>
import Head from "./head/head";
import SideBar from "./sidebar/sidebar";
// import Content from './content/content'
export default {
  components: {
    Head,
    SideBar
    // Content
  },
  mounted(){
    const token = window.localStorage.getItem('token')
    console.log(token);
    if(!token){
      this.$message.error('请先登录')
      this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
#app > .el-container {
  height: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.my-menu {
  height: 100%;
}
.my-title {
  position: absolute;
  left: 20px;
}
</style>
