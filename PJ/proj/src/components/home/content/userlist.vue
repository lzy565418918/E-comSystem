<template>
  <!-- <router-view></router-view> -->
  <el-card>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询功能 -->
    <!-- <div class="mycol"> -->
    <el-col :span="7" class="mycol">
      <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
        <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
      </el-input>
    </el-col>
    <el-col :span="3" class="mycol">
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </el-col>
    <!-- </div> -->
    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%" type="index">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="280"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="100">
        <el-switch v-model="tableData.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
        <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" plain type="success" icon="el-icon-check"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户模态框 -->
    <!-- dialogFormVisible表示模态框的显示和隐藏 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" label-position="right" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <!-- <el-col :span="6"> -->
          <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
          <!-- </el-col> -->
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.moblie" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="addUser('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 3 || value.length > 8) {
        callback(new Error("长度在 3 到 8 个字符"));
      }
      //   else {
      //     if (this.form.username !== "") {
      //       this.$refs.form.validateField("username");
      //     }
      //     callback();
      //   }
    };
    // 长度在 6 到 11 个字符
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 11) {
        callback(new Error("长度在 6 到 11 个字符"));
      }
      callback();
    };
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 3,
      pagesizes: [3, 5, 10],
      total: 0,
      // 设置模态框显示隐藏
      dialogFormVisible: false,
      // 文字文本右对齐
      labelPosition: "right",
      // 添加用户的信息
      form: {
        username: "",
        password: "",
        email: "",
        moblie: ""
      },
      rules: {
        username: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取用户列表
    getUsersList() {
      this.$http({
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        },
        method: "get"
      }).then(res => {
        console.log(res.data.data);
        let { users, total, pagenum } = res.data.data;
        this.tableData = users;
        this.total = total;
        console.log(this.tableData);
      });
    },
    // 切换页容量
    changePageSize(val) {
      this.pagesize = val;
      this.getUsersList();
      console.log(`每页 ${val} 条`);
    },
    // 切换当前页
    changePageNum(val) {
      this.pagenum = val;
      this.getUsersList();
      console.log(`当前页: ${val}`);
    },
    // 模糊搜索用户名
    searchUsers() {
      this.getUsersList();
    },
    // 添加用户

    addUser(formName) {
            console.log('0');

      this.$refs[formName].validate(valid => {
            console.log('1');

        console.log(this.form.username);
        console.log(this.form.password);
        if (!this.form.username.trim() || !this.form.password.trim()) {
          this.$message({
            showClose: true,
            message: "用户名和密码不能为空",
            type: "error"
          });
          return false;
        } else if (
          this.form.username.trim().length < 3 ||
          this.form.username.trim().length > 8
        ) {
          this.$message({
            showClose: true,
            message: "用户名长度在3到8个字符之间",
            type: "error"
          });
          return false
        } else if (
          this.form.password.length < 6 ||
          this.form.password.length > 11
        ) {
            console.log('2');
            
          this.$message({
            showClose: true,
            message: "密码长度在6到11个字符之间",
            type: "error"
          });
        }
        if (valid) {
          this.$http({
            url: "http://localhost:8888/api/private/v1/users",
            method: "post",
            headers: { Authorization: window.localStorage.getItem("token") },
            data: form
          }).then(res => {
            console.log(res);

            let { msg, status } = res.data.meta;
            console.log(status);

            if (status === 201) {
              this.$message({
                showClose: true,
                message: msg,
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getUsersList();
            } else {
              this.$message({
                showClose: true,
                message: msg,
                type: "error"
              });
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      for (const key in this.form) {
        this.form[key] = "";
      }
    }

    // addUser() {
    //   this.$http({
    //     method: "post",
    //     url: "http://localhost:8888/api/private/v1/users",
    //     headers: {
    //       Authorization: window.localStorage.getItem("token")
    //     },
    //     data: this.form
    //   }).then(res => {
    //     console.log(res);

    //     if (res.data.meta.status === 201) {
    //       this.dialogFormVisible = false;
    //       for (const key in this.form) {
    //         this.form[key] = "";
    //       }
    //     }
    //   });
    // },
    // 取消添加
    // addCancel() {
    //   this.dialogFormVisible = false;
    //   for (const key in this.form) {
    //     this.form[key] = "";
    //   }
    // }
  },

  mounted() {
    this.getUsersList();
  }
};
</script>

<style>
.mycol {
  margin-top: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
