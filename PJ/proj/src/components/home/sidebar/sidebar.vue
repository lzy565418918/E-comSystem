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
      <el-submenu v-for="(item, index) in menusList" :key="index" :index="item.path">
        <div slot="title" class="my-title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
          <!-- <router-link to="/userlist"></router-link> -->
        </div>
        <el-menu-item v-for="(item2, index) in item.children" :key="index" :index="item2.path" router>
          <i class="el-icon-menu"></i>
          <span>{{item2.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data(){
    return {
      menusList:[],
      'unique-opened':true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getLeftMenus(){
      this.$http({
        url:'menus'
      }).then(res=>{
        let{meta,data}=res.data
        if(meta.status===200){
          this.menusList=data
        }else{
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted() {
    this.getLeftMenus()
  },
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
