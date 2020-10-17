
import { getSetting, chooseAddress, openSetting, openShowModal, openShowToast } from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime"


// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  onShow() {

    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");

    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || []
    console.log(cart);
    //计算全选
    let allChecked = true

    //计算总价格
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      if (item.checked) {
        totalNum += item.num
        totalPrice += item.num * item.goods_price
      } else {
        allChecked = false
      }
    })
    cart.length === 0 ? allChecked = false : ''

    console.log(totalNum);
    console.log(totalPrice);
    this.setData({
      address,
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
  },


  //点击收货地址按钮
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },

  //商品选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id);
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked

    this.setCart(cart)


  },

  //商品全选
  handleAllItemCheck() {
    let { cart, allChecked } = this.data
    cart.forEach(item => {
      allChecked ? item.checked = false : item.checked = true
    })
    allChecked = !allChecked

    this.setCart(cart)
  },

  //重新计算购物车
  setCart(cart) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    cart.forEach(item => {
      if (item.checked) {
        totalNum += item.num
        totalPrice += item.num * item.goods_price
      } else {
        allChecked = false
      }
    })
    cart.length === 0 ? allChecked = false : ''

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart);
  },

  //加1
  handleAdd(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].num++
    this.setCart(cart)
  },

  //减一
  async handleSub(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    if (cart[index].num != 1) {
      cart[index].num--
    } else {
      /* wx.showModal({
        title: '是否要删除该商品',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index,1)
            this.setCart(cart)
          } 
        },
      }); */
      const res = await openShowModal({ content: '您是否要删除该商品' })
      if (res.confirm) {
        cart.splice(index, 1)
      }
    }
    this.setCart(cart)
  },

  //结算功能
  async handlePay() {
    const { address, totalNum } = this.data
    if (!address.userName) {
      await openShowToast({ title: "您还没有选择收货地址" })
      return;
    }
    if (totalNum === 0) {
      await openShowToast({ title: "您还没有选购商品" })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })

  },
})