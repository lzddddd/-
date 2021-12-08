import { request } from 'network/request'
export function getTeacherClass(teacherId) {
  return request({
    url: 'http://112.74.126.4:8080/teacher/get_lesson',
    params: {
      teacherId: teacherId
    },
    method: 'post'
  })
}
export function closeClass(lessonId,teacherId) {
  return request({
    url: 'http://112.74.126.4:8080/teacher/close_lesson',
    params: {
      lessonId: lessonId,
      teacherId: teacherId
    },
    method: 'post'
  })
}