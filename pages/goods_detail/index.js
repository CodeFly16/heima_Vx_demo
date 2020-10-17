// pages/goods_detail/index.js
// pages/goods_list/index.js
import {
	request
} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsObj: {}
	},
	//商品对象
	GoodsInfo: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.getGoodsDetail(options.goods_id)
	},

	/* 
	 获取商品详情数据
	 */
	async getGoodsDetail(goods_id) {
		const goodsObj = await request({ url: '/goods/detail', data: { goods_id } })
		console.log(goodsObj);
		this.GoodsInfo = goodsObj;
		this.setData({
			goodsObj: {
				goods_name: goodsObj.goods_name,
				goods_price: goodsObj.goods_price,
				goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
				pics: goodsObj.pics
			}
		})
		console.log(goodsObj);
	},

	//点击轮播图放大功能
	handlePreviewImage(e) {
		const urls = this.GoodsInfo.pics.map(v => v.pics_big)
		const current = e.currentTarget.dataset.url;
		wx.previewImage({
			current,
			urls,
			success: (result) => {

			},
			fail: () => { },
			complete: () => { }
		});
	},

	//点击加入购物车
	handleCartAdd() {
		//获取缓存中的购物车数组
		let cart = wx.getStorageSync("cart") || [];
		//判断
		let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
		if (index === -1) {
			this.GoodsInfo.num = 1;
			this.GoodsInfo.checked = true;
			cart.push(this.GoodsInfo);
		} else {
			cart[index].num++;
		}
		console.log(this.GoodsInfo);
		wx.setStorageSync("cart", cart);
		wx.showToast({
			title: '加入成功',
			icon: 'success',
			mask: true,
		});
	},
})