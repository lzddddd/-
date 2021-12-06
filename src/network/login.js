import { request } from 'network/request'



export function loginPost(account, password) {
  return request({
    url: '/system/login',
    method: 'post',
    params: {
      account: account,
      password: password
    }
  })
}


export function loginPost2(loginMsg) {
  console.log(loginMsg);
  return request({
    url: 'login',
    method: 'post',
    data: {
      username: loginMsg.username,
      password: loginMsg.password
    }
  })
}