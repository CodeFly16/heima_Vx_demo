import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    cataList: [],
    //楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图数据
    //原生请求
    /* wx.request({
      url: '/home/swiperdata',
      success: (result) => {
        console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      },
      fail: () => { },
      complete: () => { }
    }); */
    //封装的请求
    this.getSwiperList()
    this.getCataList()
    this.getFloorList()
  },

  /* 获取轮播图数据 */
  async getSwiperList() {
    let res = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: res
    })
  },

  /* 获取导航栏数据 */
  async getCataList() {
    let res = await request({ url: '/home/catitems' })
    this.setData({
      cataList: res
    })
  },

  /* 获取楼层数据 */
  async getFloorList() {
    let res = await request({ url: '/home/floordata' })
    this.setData({
      floorList: res
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})