<template>

  <div class="login-box">

    <!-- 头像 -->
    <img src="~assets/img/login/avatar.svg" alt="" class="avatar" />
    <!-- 标题 -->
    <h2 class="title">学生选课系统</h2>
    <!--切换用户-->
    <div class="typeButton">
      <el-button autofocus class="btnType" @click="isStudent = true" plain>学生用户</el-button>
      <el-button class="btnType" @click="isStudent = false" plain>教师用户</el-button>
    </div>

    <!-- 输入区域 -->
    <!--学生登录-->
    <el-form v-if="isStudent" ref="loginFormRef" :model="loginFormStudent" :rules="StuloginFormRules" label-width="0px" class="loginForm">
      <el-form-item prop="account" class="input-group">
        <div class="icon">
          <img src="~assets/img/login/user.svg" alt="" />
        </div>

        <!-- <h5>用户名/学号</h5> -->
        <el-input clearable v-model="loginFormStudent.account" placeholder="用户名/学号" type="text" class="input" style="border: 0"></el-input>
      </el-form-item>

      <el-form-item prop="password" class="input-group" prefix>
        <div class="icon">
          <img src="~assets/img/login/pwd.svg" alt="" />
        </div>

        <!-- <h5>密码</h5> -->
        <el-input clearable :type="pwdType" v-model="loginFormStudent.password" id="input" placeholder="密码"></el-input>

        <!-- 密码可见/不可见--眼睛icon -->
        <div class="eye" @click="eyeClick">
          <img src="~assets/img/login/visible.svg" alt="" v-if="eye" />
          <img src="~assets/img/login/invisible.svg" alt="" v-else />

        </div>

      </el-form-item>
      <!-- 登录按钮 -->
      <div @click="handleLoginInStudent" class="btn">登录</div>

    </el-form>

    <!--教师用户-->
    <el-form v-else ref="loginFormRef" :model="loginFormTeacher" :rules="TealoginFormRules" label-width="0px" class="loginForm">

      <el-form-item prop="account" class="input-group">
        <div class="icon"><img src="~assets/img/login/user.svg" /></div>
        <!-- <h5>用户名/教工号</h5> -->
        <el-input clearable v-model="loginFormTeacher.account" placeholder="用户名/教工号" type="text" class="input" style="border: 0"></el-input>
      </el-form-item>

      <!-- <h5>密码</h5> -->
      <el-form-item prop="password" class="input-group" prefix>
        <div class="icon">
          <img src="~assets/img/login/pwd.svg" alt="" />
        </div>
        <el-input @keyup.enter.native="enter" clearable :type="pwdType" v-model="loginFormTeacher.password" id="input" placeholder="密码"></el-input>

        <!-- 密码可见/不可见--眼睛icon -->
        <div class="eye" @click="eyeClick">
          <img src="~assets/img/login/visible.svg" alt="" v-if="eye" />
          <img src="~assets/img/login/invisible.svg" alt="" v-else />
        </div>
      </el-form-item>

      <!-- 登录按钮 -->
      <div @click="handleLoginInTeacher" class="btn">登录</div>
    </el-form>

  </div>

</template>

<script>
import { loginPost } from 'network/login'

import { mapMutations } from 'vuex'

export default {
  name: 'Entry',
  components: {},
  data() {
    return {
      eye: false,
      // 密码输入框，默认是password，密码以原点显示
      pwdType: 'password',
      // 表单对象
      loginFormStudent: {
        account: 'lizhendong',
        password: 'lizhendong'
      },
      loginFormTeacher: {
        account: 'teachera',
        password: 'teachera'
      },
      // 学生表单验证规则
      StuloginFormRules: {
        account: [
          { required: true, message: '请输入（学生）用户名', trigger: 'change' }
          // { min: 11, max: 11, message: "请输入正确的学号", trigger: "blur" }
        ],
        password: [
          { required: true, message: '请（学生）输入密码', trigger: 'change' }
        ]
      },
      // 教师表单验证规则

      TealoginFormRules: {
        account: [
          { required: true, message: '请输入（教师）用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入（教师）密码', trigger: 'change' }
        ]
      },
      // 个人信息
      myInfo: {},
      // 切换学生教师表单
      isStudent: true
    }
  },
  mounted() {
    //绑定事件
    window.addEventListener('keydown', this.keyDown)
  },
  methods: {
    ...mapMutations(['setMyInfo']),

    // 设置密码是否可见
    eyeClick() {
      this.eye = !this.eye
      if (this.eye) {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },

    // 教师用户提交登录
    handleLoginInTeacher() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请输出入正确的（教师）用户名/密码')
        }

        const res = await loginPost(
          this.loginFormTeacher.account,
          this.loginFormTeacher.password
        )
        console.log('登录结果', res)

        // 登陆失败
        if (res.status !== 200) {
          return this.$message.error(res.data.message)
        }

        // 成功
        // 保存个人信息
        window.sessionStorage.setItem('myInfo', JSON.stringify(res.data))
        this.$store.commit('setMyInfo')

        this.$message.success('登录成功，欢迎！')
        this.$router.push('/HomeTeacher')
      })
    },

    // 学生--提交登录
    handleLoginInStudent() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请输出入正确的（学生）用户名/密码')
        }

        const res = await loginPost(
          this.loginFormStudent.account,
          this.loginFormStudent.password
        )
        console.log('登录结果', res)

        if (res.status !== 200) {
          return this.$message.error(res.data.message)
        }

        // 保存个人信息
        window.sessionStorage.setItem('myInfo', JSON.stringify(res.data))
        this.$store.commit('setMyInfo')

        this.$message.success('登录成功，欢迎！')
        this.$router.push('/home')
      })
    },

    //监听回车按下 enter

    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        if (this.isStudent) {
          return this.handleLoginInStudent()
        }
        this.handleLoginInTeacher()
      }
    }

    //
  }
}
</script>

<style scoped>
/* 切换用户按钮 */

.login-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
}

.loginForm {
  width: 360px;
}

/* 头像 */
.avatar {
  margin-left: 130px;
  width: 100px;
  height: 100px;
}

.title {
  font-size: 2.9rem;
  margin: 35px 0;
  margin-left: 42px;
  color: #999;
}

.input-group {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 0 10px;
}

.input-group:nth-child(1) {
  margin-bottom: 4px;
}

/* 用户名/密码 图标 */
.icon {
  position: absolute;
  top: 7px;
  left: -35px;
  z-index: 10;
}

.icon img {
  width: 25px;
  height: 25px;
}

.input-group > div {
  position: relative;
  height: 45px;
}

input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 15px;
  border: 0;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 3.2rem;
  color: #555;
  font-family: 'Roboto', sans-serif;
}

/* 密码--眼睛可见/不可见 */

.eye {
  position: absolute;
  top: 10px;
  right: 30px;
  cursor: pointer;
}

.eye img {
  width: 25px;
  height: 25px;
}

/* 忘记密码 */
a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
a:hover {
  color: #38d39f;
}

/* 登录按钮 */
.btn {
  width: 70%;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  margin: 1rem auto;
  margin-top: 38px;
  font-size: 1.2rem;
  background-size: 200%;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  cursor: pointer;
  color: #fff;
  transition: 0.5s;
}
.typeButton {
  display: flex;
  margin-left: 80px;
}
.btn:hover {
  background-position: right;
}
</style>