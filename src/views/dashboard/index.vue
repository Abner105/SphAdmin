<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <HomeHeader />
    </div>
    <div class="dashboard-content"></div>
    <div class="dashboard-floor"></div>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader"
export default {
  name: "Dashboard",
  components:{
    HomeHeader
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
