<template>
  <el-card>
    <!-- 面包屑导航栏 -->
    <mybeard class="mymar" title1="权限管理" title2="权限列表"></mybeard>
    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%" type="index" max-height="500px">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mybeard from '../../../mybeard'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getRoleList() {
      this.$http({
        url: "rights/list",
        method: "get",
        
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message.success(meta.msg);
          this.tableData = data;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].level == 0) {
              this.tableData[i].level = "一级";
            } else if (this.tableData[i].level == 1) {
              this.tableData[i].level = "二级";
            } else if (this.tableData[i].level == 2) {
              this.tableData[i].level = "三级";
            }
          }
        }
      });
    }
  },
  components:{mybeard},
  mounted() {
    this.getRoleList();
  }
};
</script>

<style>
.mymar {
  margin-bottom: 16px;
}
</style>
