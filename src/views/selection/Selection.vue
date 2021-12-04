<template>
  <div class="selection-contain">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row type="flex" class="row-bg" justify="start">

        <el-col :span="6">
          校&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：
          <el-select v-model="searchRequestBody.campusId" placeholder="请选择校区">
            <el-option label="全部" value=""></el-option>
            <el-option label="广州校区" value="1"></el-option>
            <el-option label="佛山校区" value="2"></el-option>
          </el-select>
        </el-col>

        <!-- 选修必修 -->
        <el-col :span="6">
          必修/选修：
          <el-select v-model="searchRequestBody.required" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="必修" value="1"></el-option>
            <el-option label="选修" value="0"></el-option>
          </el-select>
        </el-col>

        <!-- 星期 -->
        <el-col :span="6">
          星期：
          <el-select v-model="searchRequestBody.weekday" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="星期一" value="1"></el-option>
            <el-option label="星期二" value="2"></el-option>
            <el-option label="星期三" value="3"></el-option>
            <el-option label="星期四" value="4"></el-option>
            <el-option label="星期五" value="5"></el-option>
          </el-select>
        </el-col>

      </el-row>

      <el-row type="flex" justify="start">

        <!-- 课程名称 -->
        <el-col :span="6">
          课程名称：
          <el-input v-model="searchRequestBody.lessonName" placeholder="请输入内容"></el-input>
        </el-col>
        <!-- 老师名称 -->
        <el-col :span="6">
          教师姓名：
          <el-input v-model="searchRequestBody.teacherName" placeholder="请输入内容"></el-input>
        </el-col>

        <!-- 过滤已满 -->
        <el-col :span="6">
          <div class="switch">
            过滤已满：
            <el-switch @change="filterFull" v-model="isFull" :width="50" active-color="#06b799"></el-switch>
          </div>
        </el-col>

        <!-- 查询按钮 -->
        <el-col :span="6">
          <el-button @click="searchClick" type="primary" size="medium">查询</el-button>
        </el-col>
      </el-row>

      <!-- 课程数据 -->
      <el-table :data="lessonData" stripe>
        <el-table-column label="#" type="index" align="center"></el-table-column>

        <!-- 课程ID -->
        <el-table-column prop="lid" label="课程ID" align="center"></el-table-column>

        <!-- 课程名称 -->
        <el-table-column prop="name" label="课程名称" align="center"></el-table-column>

        <!-- 校区 -->
        <el-table-column label="校区" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.campusId===1?'广州校区':'佛山校区'}}</span>
          </template>
        </el-table-column>

        <!-- 学分 -->
        <el-table-column prop="credit" label="学分" align="center" width="50"></el-table-column>

        <el-table-column prop="teacherName" label="教师名称" align="center"></el-table-column>

        <el-table-column label="上课时间" align="center">
          <template slot-scope="scope">
            <span>{{formatWeekday(scope.row.weekday,scope.row.classes)}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="classes" label="教室" align="center"></el-table-column> -->

        <el-table-column label="必修/选修" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.required?'必修':'选修'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remainshow" label="选课人数" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remainPeople}} / {{scope.row.totalPeople}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="selectClick" type="primary" size="small">选课</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

  </div>
</template>

<script>
import { searchLesson, getLessonList } from 'network/selection'

export default {
  name: 'Selection',
  data() {
    return {
      // 是否过滤已满
      isFull: false,
      // 课程数据
      lessonData: [
        // 测试数据
        {
          name: 'java',
          weekday: 1,
          classes: 1,
          collegeId: 101,
          majorId: 1011,
          teacherName: '老师A',
          period: 1,
          credit: 2,
          remainPeople: 0,
          totalPeople: 30,
          required: 1,
          lid: 140001
        },
        {
          name: '计算机网络',
          weekday: 6,
          classes: 2,
          collegeId: 101,
          majorId: 1011,
          teacherName: '老师D',
          period: 1,
          credit: 4,
          remainPeople: 5,
          totalPeople: 15,
          required: 0,
          lid: 140002
        }
      ],

      searchRequestBody: {
        campusId: '',
        required: '',
        weekday: '',
        lessonName: '',
        teacherName: ''
      }
    }
  },

  // 计算属性
  computed: {},
  created() {
    // 获取课程列表信息
    this.getLessonList()
  },
  mounted() {},
  methods: {
    // 查询课程
    async searchClick() {
      console.log(this.searchRequestBody)
      const { data: res } = await searchLesson(this.searchRequestBody)
      console.log(res)
      this.lessonData = res
    },

    // 获取课程列表信息
    async getLessonList() {
      const { data: res } = await getLessonList()
      console.log(res)
      this.lessonData = res
      console.log(this.lessonData)
    },

    // 过滤已满课程
    filterFull(isFull) {
      if (isFull) {
        this.lessonData = this.lessonData.filter(value => {
          return value.remainPeople !== 0
        })
        console.log(this.lessonData)
      } else {
        this.searchClick()
      }
    },

    // 格式数据
    // formatLessonData() {
    //   this.lessonData.forEach(lesson => {
    //     lesson.campusName = lesson.campusId ? '广州校区' : '佛山校区'
    //     lesson.remainshow = lesson.remainPeople + '/' + lesson.totalPeople
    //     lesson.weekday = '星期 ' + lesson.weekday
    //     lesson.required = lesson.required ? '必修' : '选修'
    //   })
    // },

    // 传入星期几，第几节
    formatWeekday(weekday, classes) {
      switch (weekday) {
        case 1:
          return '星期一，' + '第' + classes + '节'
          break
        case 2:
          return '星期二，' + '第' + classes + '节'
          break
        case 3:
          return '星期三，' + '第' + classes + '节'
          break
        case 4:
          return '星期四，' + '第' + classes + '节'
          break
        case 5:
          return '星期五，' + '第' + classes + '节'
          break
        case 6:
          return '星期六，' + '第' + classes + '节'
          break
        case 7:
          return '星期天，' + '第' + classes + '节'
          break
        default:
          break
      }
    },

    // 选课按钮
    selectClick() {}

    //
  }
}
</script>

<style scoped>
.selection-contain {
  overflow: hidden;
  width: 100%;
}

/* 下拉长度 */
.el-select {
  width: 120px;
  font-size: 13px;
}

/* 输入框长度 */
.el-input {
  width: 180px;
}

.el-row {
  margin-bottom: 20px;
}

/* 按钮样式 */
.el-button {
  background-color: #06b799;
}

.el-table-column {
  text-align: center;
}

.switch {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>