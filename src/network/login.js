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
