export default {
    showToast(_msg, _icon='none', _duration, cb) {
        wx.showToast({
            title: _msg,
            icon: _icon,
            duration: _duration || 1000,
            mask: true,
            success: function (res) {
                return typeof _cb === 'function' && _cb(res);
            },
            fail: function (err) {
                return typeof _cb === 'function' && _cb(false);
            }
        })
    },
    showLoading(title){
        wx.showLoading({
            title: title,
        })
    }

}