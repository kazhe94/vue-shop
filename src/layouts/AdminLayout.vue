<template>
  <admin-navbar></admin-navbar>
  <div class="container with-nav">
    <router-view></router-view>
  </div>
</template>

<script>
import AdminNavbar from "@/components/admin/AdminNavbar";
export default {
name: "AdminLayout",
  components: {AdminNavbar}
}
</script>

<style scoped>

</style>