<template>
  <div class="content">
    <Toast position="top-right" />
    <router-view />
  </div>
</template>

<script>

import Toast from 'primevue/toast';
export default {
  components :{
    Toast
  },
  name: "Content"
}
</script>

<style scoped>
.content{
  min-height: 70vh;
}
</style>