import wxRequest from '../utils/wxRequest';

// 用户相关=============================================================================

// 登录
export const loginindex = 'api/car.login/index'



export const getListApi = (params = {}) => wxRequest(`${params.url}`, params);