<template>
  <div>
    <div class="top-img">
      <img src="~assets/img/login/avatar.svg" alt="">
    </div>
    <h2 class="welcome">欢迎</h2>
    <div class="input-form">
      <form action=""></form>

    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Entry",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.top-img {
  margin-top: 12%;
}

.top-img img {
  width: 100px;
  height: 100px;
}

.welcome {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
}
</style>