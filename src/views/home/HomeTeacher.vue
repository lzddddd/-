<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="logo" @click="logoClick">
        <img src="~assets/img/home/Liverpool.jpg" alt="" />
        <span>学生选课系统-教师用户</span>
      </div>
      <el-button @click="logoutClick" type="info" class="logoutBtn">退出</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">
        <!-- 点击折叠侧边栏 -->
        <div @click="toggleCollapse" class="toggle-button">|||</div>

        <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath" background-color="#333744" text-color="#fff" active-text-color="#06b799">
          <el-menu-item index="teacherClass">
            <template slot="title">
              <i class="iconfont icon-timetable icon"></i>
              <span>教师课表</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main :class="{ marginTen: isCollapse }">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // 是否折叠侧边栏
      isCollapse: false,
      activePath: ''
    }
  },
  methods: {
    // 点击跳转
    logoClick() {
      this.$router.push('/HomeTeacher')
    },
    // 退出按钮
    logoutClick() {
      // 清空个人信息
      window.sessionStorage.clear('myInfo')
      // 跳转到登录页
      this.$router.push('/login')
      this.$message.success('退出登录成功')
    },
    // 折叠按钮
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

/* 头部区域 */
.header {
  position: fixed;
  width: 100%;
  z-index: 9;
}
.el-header {
  background-color: #06b799;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* > div {
    display: flex;
    align-items: center;
  } */
}
.el-header div {
  display: flex;
  align-items: center;
}

.el-header .logo {
  cursor: pointer;
}

.el-header span {
  margin-left: 25px;
  color: #fff;
  font-size: 20px;
}

.el-header img {
  width: 50px;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 25px;
}

.title span {
  color: #fff;
}

.logoutBtn {
  background-color: #333744;
}

/* 侧边栏区域 */
.aside {
  position: fixed;
  width: 240px;
  height: 100%;
  z-index: 9;
  margin-top: 60px;
}

.el-aside {
  background-color: #333744;
  transition: all 0.5s;
}

/* 侧边栏--展开按钮 */
.toggle-button {
  background-color: #4a5064;
  line-height: 24px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;
}

.el-menu {
  border-right: none;
}

.side-menu {
  width: 100%;
}

.active {
  color: #06b799;
}

/* 侧边栏--icon */
.icon {
  margin-right: 10px;
}

/* 主体部分 */
.el-main {
  background-color: #eaedf1;
  margin-top: 60px;
  margin-left: 200px;
  transition: 0.5s;
}

.marginTen {
  margin-left: 60px;
}
</style>
