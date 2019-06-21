<template>
    <el-header>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="./logo.png" alt="黑马程序员" title="黑马程序员">
        </div>
      </el-col>
      <el-col :span="16">
        <h1>电商后台管理系统</h1>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <a href="#" class="out" @click.prevent="out">退出</a>
        </div>
      </el-col>
    </el-header>
</template>

<script>
export default {
  data(){
    return {
      msg:''
    }
  },
  methods: {
      out() {
        this.$confirm('是否继续退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('token')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
}
</script>

<style>
.el-header {
  /* width: 100%; */
  height: 60px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
h1 {
  padding: 0;
  margin: 0 auto;
  font-weight: normal;
  color: #fff;
}
img {
  height: 50px;
  cursor: pointer;
  position: relative;
  left: -30px;
  top: 5px;
}
.out {
  float: right;
  text-decoration: none;
  color: orangered;
}
</style>
