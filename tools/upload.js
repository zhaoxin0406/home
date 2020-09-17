export default {
    // 视频上传
    chooseImage: function ({sizeType = ['compressed'], sourceType = ['album', 'camera'], count = 9}) {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: count, // 默认9
                sizeType: sizeType, // 可以指定是原图还是压缩图，默认压缩图
                sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    resolve(res.tempFilePaths);
                },
                fail: function (error) {
                    reject(error)
                }
            })
        });
    },
    /**
     * @param {arr}     files         图片url集合
     * @param {String}  url           图片上传接口地址
     * @param {String}  dir           上传目录地址
     * @param {String}  name          文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     * @param {Object}  header        HTTP 请求 Header, header 中不能设置 Referer
     * @param {Object}  formData      HTTP 请求中其他额外的 form data
     */
    uploadImage: function ({files = [],token}) {
        console.log(token)
        return new Promise((resolve, reject) => {
            if (files && files instanceof Array && files.length > 0) {
                var promiseList = [];
                for (var i = 0; i < files.length; i++) {
                    promiseList[i] = new Promise((resolve, reject) => {
                        wx.showLoading({
                            title: '上传中...',
                        })
                        wx.uploadFile({
                            url: 'https://tesla.cqlink.club/api/car.system/upload',
                            filePath: files[i],
                            name: 'file',
                            header: {"Content-Type": "multipart/form-data"},
                            formData: {
                                'token': token,
                               
                                
                              },
                            success: function (res) {
                                wx.hideLoading();

                                resolve(JSON.parse(res.data));
                            },
                            fail: function (error) {
                                wx.hideLoading();

                                reject(error);
                            }
                        })
                    });
                }
                Promise.all(promiseList)
                    .then(function (result) {
                        resolve(result);
                    })
                    .then(function (error) {
                        reject(error);
                    })
            } else {
                reject('传参有误，请传数组格式');
            }
        })
    },

    // 视频上传
    uploadVideo(fun) {
        return new Promise((resolve, reject) => {

            let that = this;

            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: 'back',
                success(res) {
                    console.log(res.tempFilePath)
                    let size = res.size;
                    if (size <= 10485760) {
                        wx.showLoading({
                            title: '上传中...',
                        })
                        wx.uploadFile({
                            url: 'http://daoqian.cqlink.club/api/index/imgUpload',
                            filePath: res.tempFilePath,
                            name: 'file',
                            header: {"Content-Type": "multipart/form-data"},
                            success: function (res) {
                                wx.hideLoading();
                                resolve(JSON.parse(res.data));
                            },
                            fail: function (error) {
                                wx.hideLoading();
                                reject(error);
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '视频大小超过10M,请重新选择',
                            icon: "none",
                            duration: 1000
                        })
                    }

                }
            })
        })
    },
    /**
     * @param {String}  _this         使用页面的this
     * @param {String}  http          http拼接前缀
     * @param {String}  url           图片下载地址
     * @param {String}  img_data      使用页面 data 下 存预览图片的数据 (this.data.img_data)
     */
    // 下载 预览
    downloadFile(_this,http,url,img_data) {
        app.tips.showLoading('下载中')
        wx.downloadFile({
            url: http+url,
            success (res) {
                wx.hideLoading()
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    const tempFilePath = res.tempFilePath
                    if (tempFilePath.includes('.jpg')||tempFilePath.includes('.png')){
                        img_data.push(tempFilePath)
                        wx.previewImage({
                            current: tempFilePath, // 当前显示图片的http链接
                            urls:  _this.data.img_data // 需要预览的图片http链接列表
                        })
                    }else {
                        wx.openDocument({
                            filePath: tempFilePath,
                            success: function (res) {
                                console.log('打开文档成功')
                            }
                        })
                    }
                }else {
                    wx.hideLoading()
                }
            }
        })

    },
}