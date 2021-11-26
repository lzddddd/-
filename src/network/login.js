import { post } from 'network/post'

export function loginPost(loginMsg) {
  console.log(loginMsg);
  return post({
    url: '/login',
    method: 'post',
    data: {
      username: loginMsg.username,
      password: loginMsg.password
    }
  })
}