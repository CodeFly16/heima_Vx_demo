import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex: 0
  },
  //接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 缓存数据 */
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      //设定过期时间
      if (Date.now() - Cates.time > 1000 * 60 * 10) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  //获取分类数据
  async getCates() {
    
    this.Cates = await request({ url: '/categories' })

    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    //构造右侧的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单的点击时间
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    /*   request({ url: '/categories' }).then(res => {
        this.Cates = res.data.message
        //构造右侧的商品数据
        let rightContent = this.Cates[index].children;
        this.setData({
          rightContent
        })
      }) */
    this.setData({
      currentIndex: index,
      rightContent: wx.getStorageSync("cates").data[index].children
    })
  }

})