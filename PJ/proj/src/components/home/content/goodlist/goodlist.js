import mybeard from '../../../mybeard'
export default {
  data () {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      pagesizes: [10, 20, 30],
      total: 0,
      query: ''
    }
  },
  methods: {
    getGoodsList () {
      this.$http({
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let {
          data,
          meta
        } = res.data
        if (meta.status === 200) {
          this.tableData = data.goods
          this.total = data.total
          if (this.tableData.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getGoodsList()
          }
        }
      })
    },
    // 切换页容量
    changePageSize (val) {
      window.localStorage.setItem('goodsListPage', val)
      this.pagesize = val || 10
      this.getGoodsList()
      console.log(`每页 ${val} 条`)
    },
    // 切换当前页
    changePageNum (val) {
      this.pagenum = val
      this.getGoodsList()
      console.log(`当前页: ${val}`)
    },
    // 模糊搜索用户名
    searchUsers () {
      this.getGoodsList()
    },
    // 点击 添加商品 按钮
    addgoods () {
      this.$router.push('/addgoods')
    },
    // 点击删除按钮
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `goods/${id}`,
          method: 'delete'
        }).then(res => {
          let {
            msg,
            status
          } = res.data.meta
          if (status === 200) {
            this.$message.success(msg)
            this.getGoodsList()
          } else {
            this.$message.error(msg)
          }
        })
      }).catch(() => {
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
    this.changePageSize(JSON.parse(window.localStorage.getItem('goodsListPage')))
    this.getGoodsList()
  }
}
