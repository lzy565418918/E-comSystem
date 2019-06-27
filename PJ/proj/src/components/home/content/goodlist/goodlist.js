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
            this.getUsersList()
          }
        }
      })
    },
    // 切换页容量
    changePageSize (val) {
      window.localStorage.setItem('page', val)
      this.pagesize = val
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
    }
  },
  components: {
    mybeard
  },
  mounted () {
    this.getGoodsList()
  },
  // 过滤器
  filters: {
    timefilter: function (value) {
      return value + ',你好呀'
    }
  }
}
