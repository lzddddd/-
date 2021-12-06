<template>
  <div>
    <div class="userInfo">用户:{{ userInfo.userDO.account }}</div>
    <el-button type="primary" @click="getUserInfo()">测试按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Timetable',
  data() {
    return {
      userInfo: {},
    }
  },
  created() {},
  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(sessionStorage.getItem('myInfo'))
    },
  },
}
</script>

<style scoped>
</style>