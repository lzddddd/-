<template>
  <div class="selection-contain">

    <!-- 搜索框 -->

    <!-- 课程数据视图区域 -->
    <el-card class="lessons-card">

      <el-descriptions title="已选课程" :column="2" border :labelStyle="{width:'200px'}">

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            已选课程数
          </template>
          {{lessonTotal}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            已选学分
          </template>
          {{creditTotal}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            必修课学分
          </template>
          {{reqLesCredit}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            选修课学分
          </template>
          {{ElectiveLesCredit}}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

    <el-card class="lessons-card">

      <!-- 课程数据 -->
      <el-table :data="lessonShow" stripe>
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
            <el-button @click="dropClick(scope.row.lid)" type="primary" size="small">退课</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页区域 -->

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[3, 5, 10]" :page-size="pageSize" :current-page="pageIndex+1" :total="lessonTotal" layout="total, sizes, prev, pager, next, jumper" background>
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
import { getLessonSelected } from 'network/selection'
import { dropLesson } from 'network/drop'

export default {
  name: 'Drop',
  data() {
    return {
      // 课程数据
      lessonSelected: [],
      // 展示的课程数据
      lessonShow: [],
      // 学生Id
      stuId: '',
      // pageSize一页数据数量
      pageSize: 3,
      // 当前页码
      pageIndex: 0,
      searchRequestBody: {
        // 当前页码
        pageIndex: 1,
        // 每页数据量
        pageSize: 10,
        // 是否过滤已满
        filter: 0,
        campusId: '',
        required: '',
        weekday: '',
        lessonName: '',
        teacherName: ''
      },

      // 课程总数
      lessonTotal: 0
    }
  },

  // 计算属性
  computed: {
    // 计算总学分
    creditTotal() {
      return this.lessonSelected.reduce((prev, cur) => {
        return cur.credit + prev
      }, 0)
    },

    // 计算必修学分
    reqLesCredit() {
      return this.lessonSelected
        .filter(item => {
          return item.required === 1
        })
        .reduce((prev, cur) => {
          return cur.credit + prev
        }, 0)
    },

    // 计算选修学分
    ElectiveLesCredit() {
      return this.lessonSelected
        .filter(item => {
          return item.required === 0
        })
        .reduce((prev, cur) => {
          return cur.credit + prev
        }, 0)
    }
  },
  created() {
    // 获取已选课程列表信息
    this.getLessonSelected()
    // 获取课程总数
  },
  methods: {
    // 获取当前学生已选课程
    async getLessonSelected() {
      // 获取学生id
      this.stuId = this.$store.state.myInfo.studentDO.stuId
      const { data: res } = await getLessonSelected(this.stuId)
      this.lessonSelected = res
      console.log('学生已选课程', res)
      this.lessonTotal = this.lessonSelected.length

      // 实现分页
      this.paging()
    },

    // 退课按钮
    async dropClick(lid) {
      console.log('lid', lid)
      const res = await dropLesson(this.stuId, lid)
      console.log('退课结果', res)

      if (res.status === 500) {
        this.$message.error(res.data.message)
      } else if (res.status === 200) {
        this.$message.success('退课成功')
      }

      // 重新获取一下最新的 课程列表
      this.getLessonSelected()
    },

    // 实现分页显示
    paging() {
      let start = this.pageSize * this.pageIndex
      let end = this.pageSize * (this.pageIndex + 1)
      // console.log('s&e', start, end)
      this.lessonShow = this.lessonSelected.slice(start, end)
      console.log('展示的课程', this.lessonShow)
    },

    // 查询课程
    async searchClick() {
      const { data: res } = await searchLesson(this.searchRequestBody)
      this.lessonData = res.data
    },

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
        default:
          break
      }
    },

    // 监听一页显示数的改变
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.paging()
    },

    // 监听一页显示数的改变
    handleCurrentChange(newPage) {
      this.pageIndex = newPage - 1
      this.paging()
    }
  }
}
</script>

<style scoped>
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
  background-color: #b73806;
}

.el-table-column {
  text-align: center;
}

.switch {
  display: flex;
  align-items: center;
  height: 40px;
}

.el-descriptions {
  width: 60%;
}
</style>