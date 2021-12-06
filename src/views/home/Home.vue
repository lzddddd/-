<template>
  <el-container class="home-container">

    <!-- 头部 -->
    <el-header class="header">
      <div class="logo" @click="logoClick">
        <img src="~assets/img/home/Liverpool.jpg" alt="">
        <span>学生选课系统</span>
      </div>
      <el-button @click="logoutClick" type="info" class="logoutBtn">退出选课</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">

        <!-- 点击折叠侧边栏 -->
        <div @click="toggleCollapse" class="toggle-button">|||</div>

        <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath" background-color="#333744" text-color="#fff" active-text-color="#06b799">
          <!-- 学生选课一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom icon"></i>
              <span>学生选课</span>
            </template>

            <!--选课  -->
            <el-menu-item index="selection" @click="subItemClick(path='selection')">
              <template slot="title">
                <i class="el-icon-s-custom icon"></i>
                <span>学生选课</span>
              </template>
            </el-menu-item>

            <!-- 查看已选 -->
            <el-menu-item index="drop" @click="subItemClick(path='drop')">
              <template slot="title">
                <i class="el-icon-s-custom icon"></i>
                <span>已选课程</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-date icon"></i>
              <span>个人信息</span>
            </template>

            <!-- 查看个人课表 -->
            <el-menu-item index="timetable">
              <template slot="title">
                <i class="el-icon-date icon"></i>
                <span>个人课表</span>
              </template>
            </el-menu-item>

            <!-- 查看个人信息 -->
            <el-menu-item index="myinfo">
              <template slot="title">
                <i class="el-icon-date icon"></i>
                <span>个人信息</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>

      <!-- 主体 -->
      <el-main :class="{marginTen: isCollapse }">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </el-main>

    </el-container>

  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 是否折叠侧边栏
      isCollapse: false,
      // 激活的侧边栏链接
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 点击跳转
    logoClick() {
      this.$router.push('/home')
      this.selectionClick()
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
    },

    // 左侧菜单点击事件
    // 保存激活的菜单路径
    subItemClick(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }

    // // 侧边栏--学生选课
    // selectionClick() {
    //   // console.log('11')
    //   this.$router.push('selection')
    //   this.currentIndex = 1
    // },

    // // 侧边栏--个人课表
    // timetableClick() {
    //   // console.log('22')
    //   this.$router.push('timetable')
    //   this.currentIndex = 2
    // }
  }
}
</script>

<style lang="less" scoped>
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
  > div {
    display: flex;
    align-items: center;
  }
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

// 展开按钮
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
