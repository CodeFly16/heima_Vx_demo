// pages/goods_list/index.js
import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 1,
        value: "价格",
        isActive: false,
      }
    ],
    goodsList: []
  },

  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  /* 
    滚动条触底事件
  */
  async onReachBottom() {

    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '无下一页数据',
      });
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }

  },

  /* 
    下拉刷新事件
  */
  onPullDownRefresh() {
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()

    wx.stopPullDownRefresh();
  },

  //获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams })

    //获取总条数
    const total = res.total;

    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    console.log(this.totalPages);

    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    console.log(res);
  },

  //标题点击事件
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

})