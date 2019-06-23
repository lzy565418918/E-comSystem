<template>
  <!-- <router-view></router-view> -->
  <el-card>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="3" class="mycol">
      <el-button plain @click="add">添加角色</el-button>
    </el-col>
    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%" type="index">
      <!-- 点击箭头展开的内容 -->
      <el-table-column type="expand">
        <!-- <el-tag v-for="tag in tableData.children" :key="tag.authName" closable >
            {{tag.authName}}
        </el-tag>-->

        <el-tag closable>一级权限</el-tag>
        <i class="el-icon-arrow-right myicon"></i>
        <el-tag closable type="success">二级权限</el-tag>
        <i class="el-icon-arrow-right myicon"></i>
        <el-tag closable type="warning">三级权限</el-tag>
        <el-tag closable type="warning">三级权限</el-tag>
        <el-tag closable type="warning">三级权限</el-tag>

        <!-- <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>-->
      </el-table-column>
      <!-- 表头 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="330"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="320"></el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            @click="handleRole(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色模态框 -->
    <!-- roleListVisible表示模态框的显示和隐藏 -->
    <el-dialog title="添加角色" :visible.sync="roleListVisible">
      <el-form
        :model="roleList"
        label-width="100px"
        label-position="right"
        :rules="rules"
        ref="roleList"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="roleList.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="text" v-model="roleList.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('roleList')">取 消</el-button>
        <el-button type="primary" @click="addRole('roleList')">确 定</el-button>
        <!-- <el-button type="primary" @click="editUser('form')" v-if="showConfirmBtn">确认修改</el-button> -->
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    // 角色名称不能为空
    var checkout = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色名称"));
      }
      callback();
    };
    // 角色描述不能为空
    var checkout2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色描述"));
      }
      callback();
    };
    return {
      tableData: [],
      roleList: {
        roleName: "",
        roleDesc: ""
      },
      // 添加角色模态框显示和隐藏
      roleListVisible: false,
      rules: {
        roleName: [{ required: true, validator: checkout, trigger: "blur" }],
        roleDesc: [{ required: true, validator: checkout2, trigger: "blur" }]
      }
      // tags: [
      //   { name: "一级权限", type: "" },
      //   { name: "二级权限", type: "success" },
      //   { name: "三级权限", type: "warning" }
      // ]
    };
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      this.$http({
        url: "http://localhost:8888/api/private/v1/roles",
        headers: { Authorization: window.localStorage.getItem("token") },
        method: "get"
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    },
    // 点击 添加角色 按钮
    add() {
      this.roleListVisible = true;
    },
    // 提交添加角色
    addRole(formName) {
      // 验证角色名称和角色描述
      this.$refs[formName].validate(valid => {
        if (
          this.roleList.roleName.trim() == "" ||
          this.roleList.roleDesc.trim() == ""
        ) {
          this.$message({
            showClose: true,
            message: "角色名称和角色描述不能为空",
            type: "error"
          });
          return false;
        }
        if (valid) {
          this.$http({
            url: "http://localhost:8888/api/private/v1/roles",
            method: "post",
            headers: { Authorization: window.localStorage.getItem("token") },
            data: this.roleList
          }).then(res => {
            let { msg, status } = res.data.meta;
            if (status === 201) {
              this.$message({
                showClose: true,
                message: msg,
                type: "success"
              });
              this.$refs[formName].resetFields();
              for (const key in this.roleList) {
                this.roleList[key] = "";
              }
              this.roleListVisible = false;
              this.getRoleList();
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
    // 取消添加用户
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.roleListVisible = false;
      for (const key in this.roleList) {
        this.roleList[key] = "";
      }
    }
  },
  mounted() {
    this.getRoleList();
  }
};
</script>

<style>
.mycol {
  margin-top: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.myicon {
  margin-right: 60px;
}
</style>
