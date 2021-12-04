import { request } from 'network/request'
import { post } from 'network/post'



export function searchLesson(requestBody) {
  console.log(requestBody);
  return post({
    url: '/lesson/list',
    method: 'post',
    data: {
      campusId: requestBody.campusId,
      required: requestBody.required,
      lessonName: requestBody.lessonName,
      teacherName: requestBody.teacherName,
      weekday: requestBody.weekday,
    }
  })
}


export function getLessonList() {
  return post({
    url: '/lesson/list',
    method: 'post',
    contentType: 'application/json',
    data: {
    }
  })
}

