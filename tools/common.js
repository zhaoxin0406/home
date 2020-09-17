//获取应用实例
export default {
    // 预览图片
    previewImage(imgList,img_api,scrollsrc) {
        //imgList 图片列表   img_api 图片地址前缀    scrollsrc  当前需要显示的图片
        let mainData = []
        // 不是数组的转为数组
        if (imgList instanceof Array == false ){
            imgList = [{url:imgList}]
        }

        //添加地址
        for (let i = 0; i < imgList.length; i++) {
            //正式版
            mainData.push( img_api + imgList[i].url)
            //测试时使用
            // mainData.push(imgList[i].url)
        }
        wx.previewImage({
            current: img_api + scrollsrc, // 当前显示图片的http链接    正式版
           // current: scrollsrc, // 当前显示图片的http链接    测试时使用
            urls: mainData,
        })
    },
    // 删除图片
    deleteImg(_this,imgIndex) {
        //   页面this   图片索引
        //   photoList 为图片数组  需要在使用页面的data中定义
        wx.showModal({
            title: '提示',
            content: '是否删除该图片',
            success(res) {
                if (res.confirm) {
                    _this.data.photoList.splice(imgIndex, 1)
                    _this.setData({
                        photoList: _this.data.photoList
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
}