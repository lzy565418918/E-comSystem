/* eslint-disable no-lone-blocks */
/* eslint-disable indent */
import mybeard from '../../../../mybeard.vue'
export default {
  data() {
    // 商品名称不能为空
    var checkout = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品名称'))
      }
      callback()
    }
    // 商品价格不能为空
    var checkout2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品价格'))
      }
      callback()
    }
    // 商品重量不能为空
    var checkout3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品重量'))
      }
      callback()
    }
    // 商品数量不能为空
    var checkout4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品数量'))
      }
      callback()
    }
    // 商品分类不能为空
    var checkout5 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品分类'))
      }
      callback()
    }
    return {
      active: 0,
      // 添加商品的参数
      addGoodsOption: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        attrs: [],
        pics: []
      },
      rules: {
        goodName: [{
          required: true,
          validator: checkout,
          trigger: 'blur'
        }],
        goodPrice: [{
          required: true,
          validator: checkout2,
          trigger: 'blur'
        }],
        goodWeight: [{
          required: true,
          validator: checkout3,
          trigger: 'blur'
        }],
        goodSum: [{
          required: true,
          validator: checkout4,
          trigger: 'blur'
        }],
        goodKind: [{
          required: true,
          validator: checkout5,
          trigger: 'blur'
        }]
      },
      // 商品分类
      goodKind: [],
      props: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      // 级联框
      value: [],
      // sel = many 商品参数
      goodsParams: [],
      // sel = only 商品属性
      goodsAttr: [],
      content: '在这里输入商品介绍',
      check: true,
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 切换标签栏
    changeTabs(tab) {
      this.active = +tab.index
      console.log(+tab.index)
      if (+tab.index === 1) {
        if (this.value.length === 0) {
          this.$message.error('请选择商品分类')
          tab.index = '0'
        } else {
          this.getGoodsSel('many')
        }
      } else if (+tab.index === 2) {
        this.getGoodsSel('only')
      }
    },
    // 级联框选中选项
    getGoodKind() {
      this.$http({
        url: 'categories'
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status === 200) {
          this.goodKind = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 获取商品参数&商品属性
    getGoodsSel(sel) {
      this.$http({
        url: `categories/${this.value[this.value.length - 1]}/attributes?sel=${sel}`
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status === 200) {
          if (sel === 'many') {
            this.goodsParams = data
          } else if (sel === 'only') {
            this.goodsAttr = data
          }
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    handlePreview() {
      console.log('handlePreview');
    }
  },
  components: {
    mybeard
  },
  mounted() {
    this.getGoodKind()
  }
}
