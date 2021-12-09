import { request } from 'network/request'

// 查询课程
export function getLessonList(requestBody) {

  return request({
    url: '/lesson/list',
    method: 'post',
    data: {
      filter: requestBody.filter,
      majorId: requestBody.majorId,
      pageIndex: requestBody.pageIndex,
      pageSize: requestBody.pageSize,
      campusId: requestBody.campusId,
      required: requestBody.required,
      lessonName: requestBody.lessonName,
      teacherName: requestBody.teacherName,
      weekday: requestBody.weekday,
    }
  })
}

// 选课
export function selectLesson(sid, lid) {
  return request({
    url: '/student/select_lesson',
    method: 'post',
    ContentType: 'application/json',
    params: {
      stuId: sid,
      lessonId: lid
    }
  })
}


// 获取课程总数
export function getLessonCount() {
  return request({
    url: '/lesson/count',
    method: 'get',
    ContentType: 'application/json',

  })
}

// 获取已选课程
export function getLessonSelected(stuId) {
  return request({
    url: 'student/get_lesson',
    method: 'get',
    ContentType: 'application/json',
    params: {
      stuId: stuId
    }
  })
}

