<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  created() {
    this.$store.commit('setMyInfo')
  }
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/el-global.css';
</style>
