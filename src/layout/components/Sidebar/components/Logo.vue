<template>
  <div class="logo-container flex">
      <img :class="!isCollapse && 'mr-8'" class="logo-img" src="@/assets/icons/logo.png" alt="">
      <div v-if="!isCollapse" :style="{color: themeColor}" class="logo-text">Vue Elk Admin</div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    themeColor:{ 
      type: String,
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mr-8 {
  margin-right: 8px;
}
.logo-container {
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0,0,0,.04);
      .logo-img {
        width: 30px;
        height: 30px;
      }
      .logo-text {
        font-size: 20px;
        font-weight: 700;
      }

}
</style>