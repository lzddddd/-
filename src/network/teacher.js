import { request } from 'network/request'

export function getTeacherClass(teacherId) {
  return request({
    url: '/teacher/get_lesson',
    params: {
      teacherId: teacherId
    },
    method: 'post'
  })
}


export function closeClass(lessonId, teacherId) {
  return request({
    url: '/teacher/close_lesson',
    params: {
      lessonId: lessonId,
      teacherId: teacherId
    },
    method: 'post'
  })
}


// 获取课程学生名单
export function getStuList(lessonId) {
  return request({
    url: '/lesson/get_student',
    method: 'get',
    params: {
      lessonId: lessonId
    }
  })
}