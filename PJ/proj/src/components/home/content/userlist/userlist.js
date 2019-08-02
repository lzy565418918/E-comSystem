import mybeard from '../../../mybeard'
export default {
  data () {
    // 用户名长度在3到8个字符
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 3 || value.length > 8) {
        callback(new Error('长度在 3 到 8 个字符'))
      }
      callback()
    }
    // 密码长度在6到11个字符
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 11) {
        callback(new Error('长度在 6 到 11 个字符'))
      }
      callback()
    }
    // 邮箱匹配规则
    var validatePass3 = (rule, value, callback) => {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (value !== '') {
        if (!reg.test(value)) {
          callback(new Error('邮箱地址格式不正确'))
        }
      }
      callback()
    }
    return {
      // id框隐藏
      showIdText: false,
      // showAddBtn添加用户时显示
      showAddBtn: false,
      // showConfirm修改信息时显示
      showConfirmBtn: false,
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 3,
      pagesizes: [2, 3, 4, 6, 8, 10],
      total: 0,
      // 设置添加模态框显示隐藏
      dialogFormVisible: false,
      // 编辑模态框显示隐藏
      dialogEditForm: false,
      // assignRole分配角色模态框
      assignRole: false,
      // 文字文本右对齐
      labelPosition: 'right',
      // 添加用户的数据源
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 编辑用户的数据源
      userform: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [{ validator: validatePass3, trigger: 'blur' }]
      },
      // 分配角色的信息
      role: {
        username: '',
        id: ''
      },
      // 下拉框选项
      roleList: [],
      value: '',
      label: ''
    }
  },
  methods: {
    // 获取用户列表
    getUsersList () {
      this.$http({
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        },
        method: 'get'
      }).then(res => {
        // console.log(res.data.data);
        let { users, total } = res.data.data

        this.tableData = users
        if (this.tableData.length === 0 && this.pagenum !== 1) {
          this.pagenum--
          this.getUsersList()
          return
        }
        this.total = total
        // console.log(this.tableData);
      })
    },
    // 切换页容量
    changePageSize (val) {
      window.localStorage.setItem('userListPage', val)
      this.pagesize = val || 3
      this.getUsersList()
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页
    changePageNum (val) {
      this.pagenum = val
      this.getUsersList()
      console.log(`当前页: ${val}`)
    },
    // 模糊搜索用户名
    searchUsers () {
      this.getUsersList()
    },
    // 改变用户状态
    changeStatus (id, status) {
      console.log(id, status)
      this.$http({
        url: `users/${id}/state/${status}`,
        method: 'put'
      })
        .then(res => {
          // console.log(res);
          const { status, msg } = res.data.meta
          if (status === 200) {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    },
    // 点击 添加用户 按钮
    add () {
      // this.form = "";
      for (const key in this.form) {
        this.form[key] = ''
      }
      this.dialogFormVisible = true
    },
    // 提交添加用户的信息
    addUser (formName) {
      // 邮箱验证正则表达式
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      this.$refs[formName].validate(valid => {
        if (
          this.form.username.trim() === '' ||
          this.form.password.trim() === ''
        ) {
          this.$message({
            showClose: true,
            message: '用户名和密码不能为空',
            type: 'error'
          })
          return false
        } else if (
          this.form.username.trim().length < 3 ||
          this.form.username.trim().length > 8
        ) {
          this.$message({
            showClose: true,
            message: '用户名长度在3到8个字符之间',
            type: 'error'
          })
          return false
        } else if (
          this.form.password.length < 6 ||
          this.form.password.length > 11
        ) {
          this.$message({
            showClose: true,
            message: '密码长度在6到11个字符之间',
            type: 'error'
          })
          return false
        } else if (this.form.email !== '') {
          if (!reg.test(this.form.email)) {
            this.$message({
              showClose: true,
              message: '邮箱地址格式不正确',
              type: 'error'
            })
            return false
          }
        }
        if (valid) {
          this.$http({
            url: 'users',
            method: 'post',

            data: this.form
          }).then(res => {
            // console.log(res);

            let { msg, status } = res.data.meta
            // console.log(status);

            if (status === 201) {
              this.$message({
                showClose: true,
                message: msg,
                type: 'success'
              })
              this.$refs[formName].resetFields()
              for (const key in this.form) {
                this.form[key] = ''
              }
              this.dialogFormVisible = false
              this.getUsersList()
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
      this.dialogFormVisible = false
      // this.form = "";
      for (const key in this.form) {
        this.form[key] = ''
      }
    },
    // 点击 编辑用户信息 按钮
    handleEdit (id) {
      this.dialogEditForm = true

      // this.$http({
      //   url: `users/${id}`,
      //   method: 'get'
      // }).then(res => {
      //   // console.log(res.data);
      //   let { status } = res.data.meta
      //   if (status === 200) {
      //     this.userform = res.data.data
      //     this.dialogEditForm = true
      //   }
      // })
    },
    // 取消编辑用户
    cancelEdit (formName) {
      // this.$refs[formName].resetFields();
      this.dialogEditForm = false
      // this.form = "";
      for (const key in this.roleform) {
        this.roleform[key] = ''
      }
    },
    // 提交编辑用户信息
    editUser (formName) {
      // 邮箱验证正则表达式
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      this.$refs[formName].validate(valid => {
        if (this.userform.email !== '') {
          if (!reg.test(this.userform.email)) {
            this.$message({
              showClose: true,
              message: '邮箱地址格式不正确',
              type: 'error'
            })
            return false
          }
        }
        if (valid) {
          this.$http({
            url: `users/${this.userform.id}`,
            method: 'put',
            data: {
              email: this.userform.email,
              mobile: this.userform.mobile
            }
          }).then(res => {
            let { msg, status } = res.data.meta
            if (status === 200) {
              this.$message({
                showClose: true,
                message: msg,
                type: 'success'
              })
              // 重置表单
              this.$refs[formName].resetFields()
              for (const key in this.userform) {
                this.userform[key] = ''
              }
              // 关闭对话框
              this.dialogEditForm = false
              // 重新刷新页面
              this.getUsersList()
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

    // 点击 删除用户 按钮
    handleDelete (id) {
      // console.log(id);
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(id);

          this.$http({
            url: `users/${id}`,
            method: 'delete'
            // data: { id: "url:" + id },
          }).then(res => {
            // console.log(res);
            const { msg, status } = res.data.meta
            if (status === 200) {
              this.$message({
                showClose: true,
                message: msg,
                type: 'success'
              })
              this.getUsersList()
            } else {
              this.$message({
                showClose: true,
                message: msg,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击 分配角色 按钮
    handleRole (id) {
      this.assignRole = true
      // 先通过id获取到当前用户
      this.$http({
        url: `users/${id}`,
        method: 'get'
      }).then(res => {
        this.role = res.data.data
        if (res.data.data.rid !== -1) {
          this.value = res.data.data.rid
        } else {
          this.value = ''
        }
      })
      // 下拉框
      this.$http({
        url: 'roles',
        method: 'get'
      }).then(res => {
        this.roleList = res.data.data
      })
    },
    // 提交分配角色
    addRole (userId, roleId) {
      this.$http({
        url: `users/${userId}/role`,
        method: 'put',

        data: { rid: roleId }
      }).then(res => {
        let { msg, status } = res.data.meta
        if (status === 200) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
          this.assignRole = false
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          })
        }

        this.getUsersList()
        // console.log(roleId);
      })
    },
    // 取消分配角色
    cancelRole () {
      this.assignRole = false
      for (const key in this.form) {
        this.form[key] = ''
      }
    }
  },
  components: {
    mybeard
  },
  mounted () {
    this.changePageSize(JSON.parse(window.localStorage.getItem('userListPage')))
    this.getUsersList()
  }
}
