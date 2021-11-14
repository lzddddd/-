<template>
  <div class="main">
    <!-- 登录背景 -->
    <img src="~assets/img/login/wave.png" alt="" class="wave">

    <div class="bg">
      <div class="main-bg">
        <img src="~assets/img/login/login-bg.svg" alt=""> 
      </div>
    </div>
  
    <!-- 登录输入界面 -->
    <div class="login-box">
      <entry/>
    </div>

  </div>
</template>

<script>
import Entry from "./childComp/Entry";

export default {
  name: "Login",
  components: {
    Entry
  }
};
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
}

.bg {
  float: left;
  width: 40%;
  padding: 0 2rem;
}

.main-bg {
  margin-top: 30%;
  text-align: center;
}

.wave {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: -1;
}

.bg img {
  width: 500px;
}

.login-box {
  float: right;
  width: 60%;
  text-align: center;
}
</style>
