import { message } from 'antd';

export const codeMessage = {
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',

  410: '登录信息错误',
  411: '请重新登录',
  412: '无法获取用户信息',
  413: '验证码错误',
  414: '请进行验证码登录',
  415: '滑块验证错误',

  420: 'Data format error',
  421: '缺少参数',
  423: '用户填写数据错误',
  430: 'InvalidOperation failed',

  460: '非法操作',
  463: '请求频繁',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
export function showTips(code: string) {
  if (code == '200' || !code) {
    message.success('success!');
  } else {
    message.error(codeMessage[code] ?? 'error');
  }
}
export function isOk(code: string | number) {
  console.log(code);
  return code == '200' || !code;
}
