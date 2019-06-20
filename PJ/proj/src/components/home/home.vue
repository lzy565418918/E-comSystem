<template>
  <el-container>
    <Head></Head>
    <el-container>
     <SideBar></SideBar>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Head from "./head/head";
import SideBar from "./sidebar/sidebar";
export default {
  components: {
    Head,
    SideBar
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
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
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
