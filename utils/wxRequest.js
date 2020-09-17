const app = getApp()
export const BASE_URL = 'https://tesla.cqlink.club/';

export default function wxRequest(url,params={}){
    if (app.globalData.openid){
        params.data.openid = app.globalData.openid
    }else if (app.globalData.visitor_openid){
        params.data.openid = app.globalData.visitor_openid
    }
  
    return new Promise((resolve,reject)=>{
        wx.request({
            url:BASE_URL+url,
            method:params.method || 'POST',
            data:params.data,
            success:function(res){
                const {statusCode} = res;
                if(statusCode === 200){
                    resolve(res.data);
                }else{
                    reject(res);
                }
            }
        });
    });
}