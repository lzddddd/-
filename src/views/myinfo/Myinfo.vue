<template>
  <div>

    <show-info></show-info>
  </div>
</template>

<script>
import ShowInfo from './ShowInfo'

export default {
  name: 'Stuinfo',
  components: {
    ShowInfo
  },
  data() {
    return {
      stuInfo: {}
    }
  },
  created() {
    // this.getStuInfo()
    const res = window.sessionStorage.getItem('myInfo')
    res = JSON.parse
    console.log(res)
  },
  methods: {
    // getStuInfo() {
    //   this.stuInfo = this.$store.state.stuInfo
    //   console.log(this.stuInfo)
  }
}
</script>

<style scoped>
</style>