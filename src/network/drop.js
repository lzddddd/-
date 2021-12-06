import { request } from 'network/request'


// 查询课程
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