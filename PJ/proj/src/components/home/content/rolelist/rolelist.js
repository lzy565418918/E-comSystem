
import mybeard from '../../../mybeard'
export default {
  data () {
    // 角色名称不能为空
    var checkout = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'))
      }
      callback()
    }
    // 角色描述不能为空
    var checkout2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色描述'))
      }
      callback()
    }
    return {
      tableData: [],
      // 添加模态框数据源
      roleList: {
        roleName: '',
        roleDesc: ''
      },
      // 编辑模态框数据源
      editRoleList: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      // 添加角色模态框显示和隐藏
      roleListVisible: false,
      // 编辑角色模态框显示和隐藏
      editRoleListVisible: false,
      rules: {
        roleName: [{ required: true, validator: checkout, trigger: 'blur' }],
        roleDesc: [{ required: true, validator: checkout2, trigger: 'blur' }]
      }
      // tags: [
      //   { name: "一级权限", type: "" },
      //   { name: "二级权限", type: "success" },
      //   { name: "三级权限", type: "warning" }
      // ]
    }
  },
  methods: {
    // 获取角色列表
    getRoleList () {
      this.$http({
        url: 'roles',

        method: 'get'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
          console.log(this.tableData)
        }
      })
    },
    // 点击 添加角色 按钮
    add () {
      this.roleListVisible = true
    },
    // 提交添加角色
    addRole (formName) {
      // 验证角色名称和角色描述
      this.$refs[formName].validate(valid => {
        if (
          this.roleList.roleName.trim() === '' ||
            this.roleList.roleDesc.trim() === ''
        ) {
          this.$message({
            showClose: true,
            message: '角色名称和角色描述不能为空',
            type: 'error'
          })
          return false
        }
        if (valid) {
          this.$http({
            url: 'roles',
            method: 'post',

            data: this.roleList
          }).then(res => {
            let { msg, status } = res.data.meta
            if (status === 201) {
              this.$message({
                showClose: true,
                message: msg,
                type: 'success'
              })
              this.$refs[formName].resetFields()
              for (const key in this.roleList) {
                this.roleList[key] = ''
              }
              this.roleListVisible = false
              this.getRoleList()
            } else {
              this.$message({
                showClose: true,
                message: msg,
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 取消添加用户
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.roleListVisible = false
      for (const key in this.roleList) {
        this.roleList[key] = ''
      }
    },
    // 点击 编辑 按钮
    handleEdit (roleId) {
      this.$http({
        url: `roles/${roleId}`,
        method: 'get'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.editRoleList = data
          this.editRoleListVisible = true
        }
      })
    },
    // 提交编辑角色
    editRole (formName) {
      // 验证角色名称和角色描述
      this.$refs[formName].validate(valid => {
        if (
          this.editRoleList.roleName.trim() === '' ||
            this.editRoleList.roleDesc.trim() === ''
        ) {
          this.$message({
            showClose: true,
            message: '角色名称和角色描述不能为空',
            type: 'error'
          })
          return false
        }
        if (valid) {
          this.$http({
            url: `roles/${this.editRoleList.roleId}`,
            method: 'put',
            data: this.editRoleList
          }).then(res => {
            let { msg, status } = res.data.meta
            if (status === 200) {
              this.$message.success('修改成功')
              this.$refs[formName].resetFields()
              for (const key in this.editRoleList) {
                this.editRoleList[key] = ''
              }
              this.editRoleListVisible = false
              this.getRoleList()
            } else {
              this.$message.error(msg)
            }
          })
        }
      })
    },
    // 取消编辑用户
    resetRoleForm (formName) {
      this.$refs[formName].resetFields()
      this.editRoleListVisible = false
      for (const key in this.editRoleList) {
        this.editRoleList[key] = ''
      }
    },
    // 点击 删除 按钮
    handleDelete (roleId) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            url: `roles/${roleId}`,
            method: 'delete'
          }).then(res => {
            const { msg, status } = res.data.meta
            if (status === 200) {
              this.$message.success(msg)
              this.getRoleList()
            } else {
              this.$message.error(msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  components: {
    mybeard
  },
  mounted () {
    this.getRoleList()
  }
}
