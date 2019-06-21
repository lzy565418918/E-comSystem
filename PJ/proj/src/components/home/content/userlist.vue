<template>
<!-- <router-view></router-view> -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

</template>

<script>
export default {

}
</script>

<style>
.el-breadcrumb-item{
    font-size: 18px
}
</style>
