<template>
  <div class="dashboard-container">
    <HomeHeader />
    <sale />
    <Observe />
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader";
import Sale from './Sale/Sale.vue';
import Observe from "./Observe"
export default {
  name: "Dashboard",
  components: {
    HomeHeader,
    Sale,
    Observe
  },
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
