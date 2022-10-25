<script setup lang="ts">
import Assignment from "@/components/Assignment.vue";
</script>

<template>
  <main>
    <Assignment />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

@media screen and (width <=768px) {
  main {
    grid-template-columns: 1fr;
  }
}
</style>
