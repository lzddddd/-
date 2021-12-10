<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'teacherClass' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'stulist' }">学生名单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-table stripe border :data="stuList">
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="stuId" label="学号" align="center" />
        <el-table-column label="班级" align="center">18软件工程2班</el-table-column>

        <!-- <el-table-column prop="totalPeople" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="close(scope.row.lid)">手动删除</el-button>
        </template>
      </el-table-column> -->

      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getStuList } from 'network/teacher'

export default {
  name: 'StuList',
  data() {
    return {
      stuList: [
        // {
        //   sname: 'Mo.Salah',
        //   sid: '11',
        //   college: '信息学院',
        //   class: '18软件工程2班'
        // },
        // {
        //   sname: '子竹',
        //   sid: '58',
        //   college: '信息学院',
        //   class: '18软件工程5班'
        // }
      ]
    }
  },

  created() {
    this.getStuList()
  },

  methods: {
    async getStuList() {
      const lid = this.$route.query.lId
      const { data: res } = await getStuList(lid)
      console.log('getStuList', res)

      this.stuList = res
    }
  }
}
</script>

<style scoped>
el-table {
  width: 60%;
}
</style>