<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // isRouterAlive
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    // 刷新方法
    reload() {
      console.log('reload')
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  created() {
    this.$store.commit('setMyInfo')
  }
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/el-global.css';
@import '//at.alicdn.com/t/font_2992793_mo77rlmn4wk.css';
</style>
