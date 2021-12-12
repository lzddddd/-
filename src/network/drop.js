import { request } from 'network/request'

// 退课
export function dropLesson(stuId, lessonId) {

  return request({
    url: 'student/drop_lesson',
    method: 'post',
    params: {
      stuId: stuId,
      lessonId: lessonId
    }
  })
}