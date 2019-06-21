<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo my-menu"
      :unique-opened="true"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 用户管理 -->
      <el-submenu index="1">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
          <!-- <router-link to="/userlist"></router-link> -->
        </div>
        <el-menu-item index="/home/userlist" router>
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </el-menu-item>
      </el-submenu>
      <!-- 权限管理 -->
      <el-submenu index="2">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </div>
        <el-menu-item index="/home/rolelist">
          <i class="el-icon-menu"></i>
          <span>角色列表</span>
        </el-menu-item>
        <el-menu-item index="/home/limitslist">
          <i class="el-icon-menu"></i>
          <span>权限列表</span>
        </el-menu-item>
      </el-submenu>
      <!-- 商品管理 -->
      <el-submenu index="3">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </div>
        <el-menu-item index="/home/goodlist">
          <i class="el-icon-menu"></i>
          <span>商品列表</span>
        </el-menu-item>
        <el-menu-item index="/home/classparams">
          <i class="el-icon-menu"></i>
          <span>分类参数</span>
        </el-menu-item>
        <el-menu-item index="/home/goodclass">
          <i class="el-icon-menu"></i>
          <span>商品分类</span>
        </el-menu-item>
      </el-submenu>
      <!-- 订单管理 -->
      <el-submenu index="4">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </div>
        <el-menu-item index="/home/orderlist">
          <i class="el-icon-menu"></i>
          <span>订单列表</span>
        </el-menu-item>
      </el-submenu>
      <!-- 数据统计 -->
      <el-submenu index="5">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </div>
        <el-menu-item index="/home/datareport">
          <i class="el-icon-menu"></i>
          <span>数据报表</span>
        </el-menu-item>
      </el-submenu>
      <!-- -- -->
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data(){
    return {
      'unique-opened':true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-aside {
  width: 100%;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
