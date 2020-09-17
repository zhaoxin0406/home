export default {
    /**
     * 1.function
     *@param {string} url 目标页面的路由
     *@param {Object} param 传递给目标页面的参数
     * 目标页面通过JSON.parse(options.param)接收
     */
    navigateTo(url, param = {}) {
        if (param) {
            url += `?param=${JSON.stringify(param)}`
        }
        wx.navigateTo({
            url: url,
            fail(err) {
                console.log('navigateTo跳转出错', err)
            },
        })
    },

    /**
     * 2.function
     *  @param {string} url 目标页面的路由
     * @param {Object} param 传递给目标页面的参数，只有页面栈无目标页面调用navigateTo时，参数才会生效，单单返回不能设置参数
     *  判断目标页面是否在页面栈中，如果在，则通过目标页的位置，返回到目标页面，否则调用navigateTo方法跳转到目标页
     */
    navigateBack(url, param = {}) {
        const pagesList = getCurrentPages()
        let index = pagesList.findIndex(e => {
            return url.indexOf(e.route) >= 0
        })
        if (index == -1) { // 没有在页面栈中，可以调用navigateTo方法
            this.navigateTo(url, param)
        } else {
            wx.navigateBack({
                delta: pagesList.length - 1 - index,
                fail(err) {
                    console.log('navigateBack返回出错', err)
                }
            })
        }
    },

    // 3.封装switchTab，switchTab不能有参数
    switchTab(url) {
        wx.switchTab({
            url: url
        })
    },
    // 4.封装redirectTo，和navigateTo没啥区别
    redirectTo(url, param = {}) {
        if (param) {
            url += `?param=${JSON.stringify(param)}`
        }
        wx.redirectTo({
            url: url,
            fail(err) {
                console.log('redirectTo跳转出错', err)
            },
        })
    },
    // 5.封装reLaunch，和navigateTo没啥区别
    reLaunch(url, param = {}) {
        if (param) {
            url += `?param=${JSON.stringify(param)}`
        }
        wx.reLaunch({
            url: url,
            fail(err) {
                console.log('reLaunch跳转出错', err)
            },
        })
    },
    /**
     * 6.function 打开另一个小程序,仅供小程序
     * @param {String} appId 目标小程序ID
     * @param {String} path 目标小程序的页面路径
     * @param {Object}  extraData 传给目标小程序的数据
     * @param {String}  envVersion 目标小程序版本号
     */
    //appId 如果为空则打开首页(path 中 ? 后面的数据可以再小程序的 App.onLaunch、App.onShow 和 Page.onLoad 的回调函数当中获取到,
    // extraData(object) 需要传递给目标小程序的数据(目标小程序可在 App.onLaunch，App.onShow 中获取到传过来的数据),
    // envVersion 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
    navigateToMiniProgram(appId, path, extraData, envVersion) {
        wx.navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: extraData,
            envVersion: envVersion,
            fail(err) {
                console.log('打开另外小程序失败', err)
            }
        })
    },
    // 7.返回打开的上个小程序
    //extraData(object) 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow 中获取到这份数据。
    navigateBackMiniProgram(extraData) {
        wx.navigateBackMiniProgram({
            extraData: extraData,
            fail(err) {
                console.log('返回上个小程序失败', err)
            }
        })
    }
}

