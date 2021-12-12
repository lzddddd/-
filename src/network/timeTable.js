import { request } from 'network/request'

export function getPersonTable(stuId) {
  return request({
    url: 'http://112.74.126.4:8080/student/get_lesson',
    params: {
      stuId: stuId
    },
    method: 'get'
  })
}