// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");

    //获取缓存中的购物车数据
    const allCart = wx.getStorageSync("cart")

    const cart = []
    allCart.forEach(item => {
      if (item.checked) {
        cart.push(item)
      }
    })

    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      totalNum += item.num
      totalPrice += item.num * item.goods_price
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  

})