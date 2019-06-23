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
    <!-- dialogFormVisible表示模态框的显示和隐藏 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" label-position="right" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" >
          <el-input type="text" v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="addUser('form')" v-if="showAddBtn">确 定</el-button>
        <el-button type="primary" @click="editUser('form')" v-if="showConfirmBtn">确认修改</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form:'',
      dialogFormVisible:false,
      showAddBtn:false,
      showConfirmBtn:false,
      title:'',

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
    add(){
      this.title='',
      this.dialogFormVisible='true'
      this.showAddBtn='true'
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
