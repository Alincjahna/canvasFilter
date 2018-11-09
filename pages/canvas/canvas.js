// pages/canvas/canvas.js
import regeneratorRuntime from '../../utils/runtime'
import CanvasFilter from '../../utils/canvasFilter'
import WxCaman from '../../utils/test'
console.log('WxCaman', WxCaman)
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 375,
    height: 500,
    imageUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  // 初始化
  async init() {
    // 获取canvas上下文
    const ctx = await this.getCanvasContext()
    this.ctx = ctx
    // this.canvas(ctx)
  },
  // canvas实例
  async getCanvasContext() {
    return await wx.createCanvasContext('canvasId')
  },
  // 绘图
  async canvas(ctx) {
    // 绘制文字
    await this.drawText(ctx, '标题：滤镜', { fontSize: 26 })
    // this.setData({ imageUrl })
    ctx.draw()
  },


  // 绘制文字
  async drawText(ctx, text, { x, y, fontSize, color = '#111', font = 'bold 14px normal', textAlign = 'left', TextBaseline = 'top' } = {}) {
    if (font) ctx.font = font
    ctx.setTextBaseline(TextBaseline)
    ctx.setFillStyle(color)
    ctx.setTextAlign(textAlign)
    ctx.setFontSize(fontSize)
    ctx.fillText(text, x, y, 700)
    console.log('绘制文字完成！', text)
  },

  // canvas绘图
  async drawImage(ctx, path, options) {
    const { dx, dy, width, height } = options
    await ctx.drawImage(path, dx, dy, width, height)
    console.log('绘制图片完成！')
  },
  // 获取像素数据
  async canvasGetImageData({ x = 0, y = 0, width = 100, height = 100 }) {
    return new Promise((resolve, reject) => {
      wx.canvasGetImageData({
        canvasId: 'canvasId',
        x,
        y,
        width,
        height,
        success: resolve,
        fail: reject
      })
    })
  },
  // 写入像素数据
  async canvasPutImageData(data, { x = 0, y = 0, width = 100, height = 100 }) {
    return new Promise((resolve, reject) => {
      wx.canvasPutImageData({
        canvasId: 'canvasId',
        x,
        y,
        width,
        height,
        data,
        success: resolve,
        fail: reject
      })
    })
  },
  // 获取图片信息
  async getImageInfo(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success: resolve,
        fail: reject
      })
    })
  },
  // 选择图片
  async chooseImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => resolve(res.tempFilePaths),
        fail: reject
      })
    })
  },
  // 选择图片
  async selectImage() {
    // 画布宽高处理01
    const { windowWidth } = app.globalData.systemInfo
    let { width, height } = this.data
    // const dpr = windowWidth / width
    width = windowWidth
    // height = dpr * height

    // 选择图片
    const imageList = await this.chooseImage()
    const path = imageList[0]
    // 绘制canvas
    const ctx = this.ctx
    // step1-绘制文字
    // await this.drawText(ctx, '标题：滤镜', { fontSize: 26 })
    // step2-获取图片信息
    const { width: imageWidth, height: imageHeight } = await this.getImageInfo(path)
    // 画布宽高处理02-根据图片高度更新画布高度
    const dp = windowWidth / imageWidth
    height = dp * imageHeight
    this.setData({ width, height })
    // step3-绘制图片
    const diW = this.diW = width
    const diH = this.diH = diW / imageWidth * imageHeight
    await this.drawImage(ctx, path, { dx: 0, dy: 50, width: diW, height: diH })
    // 绘制结束
    ctx.draw(true, async () => {
      this.imageInfo = await this.canvasGetImageData({ x: 0, y: 50, width: this.diW, height: this.diH })
      this.CF = new CanvasFilter({ imageData: this.imageInfo })
      // this.WC = new WxCaman('canvasId', this.diW, this.diH, function() {
      //   console.log('this111111111111', this)
      //   this.brightness(10)
      //   this.contrast(30)
      //   this.sepia(60)
      //   this.saturation(-30)
      //   this.render()
      // })
    })
  },

  // 选择滤镜
  async filter(e) {
    // console.log('this.WxCaman', this.WC)
    // this.WC.brightness(10)
    // this.WC.contrast(30)
    // this.WC.sepia(60)
    // this.WC.saturation(-30)
    // this.WC.render()
    if (!this.CF) return
    const { key } = e.currentTarget.dataset
    if (!this.imageInfo) return
    wx.showLoading()
    const { width, height } = this.imageInfo
    const types = {
      'origin': async () => await this.CF.originEffect(),
      'gray': async () => await this.CF.grayEffect(),
      'blur': async () => await this.CF.blurEffect(),
      'reverse': async () => await this.CF.reverseEffect(),
      'relief': async () => await this.CF.reliefEffect(),
      'mirror': async () => await this.CF.mirrorEffect(),
      'sharpen': async () => await this.CF.sharpenEffect(),
    }
    const nDdata = await types[key]()
    await this.canvasPutImageData(nDdata, { x: 0, y: 50, width, height })
    wx.hideLoading()
  },
})