/* eslint-disable camelcase */
import mybeard from '../../../mybeard.vue'
export default {
  data () {
    return {
      // 当前页
      pageNum: 1,
      // 页容量
      pageSize: 5,
      // 分页数据源
      pageList: [],
      // 数据总条数
      total: 0,
      // 静态页面数据源
      tableData: [],
      // 添加分类中级联框数据
      typeTwoGoodList: [],
      // 添加分类的模态框
      addGoodClass: false,
      // 添加分类的名字
      addGoodClassName: '',
      // 选中的数据
      selectValue: [],
      cat_id: [],
      formLabelWidth: '80px',
      // 数据得到响应前加载
      loading: true
    }
  },
  methods: {
    // 获取所有商品分类
    getGoodList () {
      console.log(1)
      this.$http({
        url: 'categories'
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status === 200) {
          this.tableData = data
          this.getPageList()
          this.total = this.tableData.length
          this.loading = false
        } else {
          this.$message.error('所有商品分类' + meta.msg)
        }
      })
    },
    // 设置分页
    getPageList () {
      // 得到开始的下标
      let begin = this.pageSize * (this.pageNum - 1)
      // 结束的下标
      let end = this.pageSize * this.pageNum
      // 根据下标去数组中取得数据
      this.pageList = this.tableData.slice(begin, end)
    },
    // 当前页发生改变
    handleCurrentChange (currentPage) {
      this.pageNum = currentPage
      this.getPageList()
    },
    // 点击 添加分类 按钮
    addClass () {
      this.$http({
        url: 'categories?type=2'
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status === 200) {
          this.typeTwoGoodList = data
        } else {
          this.$message.error(meta.msg)
        }
        this.addGoodClass = true
      })
    },
    // 提交 添加分类
    postNewClass (arr) {
      let cat_pid = arr.length === 0 ? 0 : arr.length === 1 ? arr[0] : arr[1]
      let cat_level = arr.length
      let cat_name = this.addGoodClassName
      this.$http({
        url: 'categories',
        method: 'post',
        data: {
          cat_pid,
          cat_level,
          cat_name
        }
      }).then(res => {
        let { msg, status } = res.data.meta
        if (status === 201) {
          this.$message.success(msg)
          this.addGoodClass = false
          this.getGoodList()
        } else {
          this.$message.error(msg)
        }
      })
    }
  },
  components: {
    mybeard
  },
  mounted () {
    this.getGoodList()
    console.log(3)
  }
}
