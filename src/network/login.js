import { post } from 'network/post'
import { post2 } from 'network/post'


export function loginPost(account, password) {
  return post({
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
  return post({
    url: 'login',
    method: 'post',
    data: {
      username: loginMsg.username,
      password: loginMsg.password
    }
  })
}