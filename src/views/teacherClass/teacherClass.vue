<template>
  <div class="container">

    <div class="infoContent">

      <el-card>
        <el-descriptions title="用户信息" :column="2" border>
          <el-descriptions-item label="用户">{{
            userInfo.teacherDO.name
            }}</el-descriptions-item>
          <el-descriptions-item label="教工号">{{
            userInfo.teacherDO.tid
            }}</el-descriptions-item>
          <el-descriptions-item label="帐号">{{
            userInfo.userDO.account
            }}</el-descriptions-item>
          <el-descriptions-item label="电子邮箱">{{
            userInfo.userDO.email
            }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{
            userInfo.userDO.phone
            }}</el-descriptions-item>
          <el-descriptions-item label="入职年份">{{
            userInfo.userDO.year
            }}</el-descriptions-item>

        </el-descriptions>
      </el-card>
      <!-- <div class="info">姓名: {{ userInfo.teacherDO.name }}</div>
      <div class="info">教师ID: {{ userInfo.teacherDO.tid }}</div> -->
    </div>
    <div class="table">
      <el-table border :data="classList">
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column prop="lid" label="课程Id" align="center" />
        <el-table-column prop="name" label="课程名字" align="center" />
        <el-table-column prop="weekday" label="时间" align="center" />
        <el-table-column prop="classes" label="节次" align="center" />
        <el-table-column prop="campusId" label="校区" align="center" />

        <el-table-column label="剩余可选" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remainPeople}} / {{scope.row.totalPeople}}</span>
          </template>
        </el-table-column>

        <el-table-column label="学生名单" align="center">
          <template slot-scope="scope">

            <span @click="toStuList(scope.row.lid)" class="stu-list">学生名单</span>
          </template>
        </el-table-column>

        <el-table-column prop="totalPeople" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="close(scope.row.lid)">手动关班</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { getTeacherClass, closeClass } from 'network/teacher'
export default {
  name: '',
  data() {
    return {
      userInfo: {},
      teacherId: '',
      classList: [],
      classListtest: [
        {
          lid: '1511',
          name: 'java',
          weekday: '3'
        }
      ]
    }
  },
  created() {
    this.getMyInfo()
    this.getClassData(this.teacherId)
  },
  methods: {
    // 手动关班
    async close(lid) {
      // 弹框提示用户
      const confirmResult = await this.$confirm('确定关班?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 如果确认，则返回字符串 “confirm”
      // 如果取消，则返回字符串 cancel
      console.log(confirmResult)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消操作')
      }
      this.closeClassByhand(lid, this.teacherId)
    },

    // 获取个人信息
    getMyInfo() {
      this.userInfo = JSON.parse(sessionStorage.getItem('myInfo'))
      this.teacherId = this.userInfo.teacherDO.tid
    },

    // 获取老师课表
    getClassData(teacherId) {
      getTeacherClass(teacherId).then(res => {
        console.log('getClassData', res)
        this.classList = res.data
        console.log('Class', this.classList)
        this.classList.map(item => {
          if (item.weekday === 1) {
            item.weekday = '周一'
          } else if (item.weekday === 2) {
            item.weekday = '周二'
          } else if (item.weekday === 3) {
            item.weekday = '周三'
          } else if (item.weekday === 4) {
            item.weekday = '周四'
          } else if (item.weekday === 5) {
            item.weekday = '周五'
          }
          if (item.classes === 1) {
            item.classes = '第一节'
          } else if (item.classes === 2) {
            item.classes = '第二节'
          } else if (item.classes === 3) {
            item.classes = '第三节'
          } else if (item.classes === 4) {
            item.classes = '第四节'
          } else if (item.classes === 5) {
            item.classes = '第五节'
          } else if (item.classes === 6) {
            item.classes = '第六节'
          } else if (item.classes === 7) {
            item.classes = '第七节'
          } else if (item.classes === 8) {
            item.classes = '第八节'
          }
          if (item.campusId === 1) {
            item.campusId = '三水校区'
          } else {
            item.campusId = '广州校区'
          }
        })
      })
    },

    // 手动关班
    closeClassByhand(lessonId, teacherId) {
      closeClass(lessonId, teacherId).then(res => {
        console.log('关班回调', res)
        if (res.data === 'SUCCESS') {
          this.$message.success('手动关班成功！')
        }
        this.$router.go(0)
      })
    },

    // 跳转学生名单
    toStuList(lid) {
      this.$router.push({
        path: 'stulist',
        query: {
          lId: lid
        }
      })
    }

    //
  }
}
</script>

<style scoped>
.infoContent {
  display: flex;
}
.info {
  margin: 50px 50px 50px 50px;
}
.table {
  margin: 50px;
}

/* 学生名单 */
.stu-list {
  color: #409aff;
  cursor: pointer;
}
</style>
