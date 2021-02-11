<template>
  <router-view></router-view>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import StockTable from "@/components/admin/StockTable";

export default {
  name: "Stock",
  components: {
    AppPage,
    StockTable
  },

}
</script>

<style scoped>

</style>