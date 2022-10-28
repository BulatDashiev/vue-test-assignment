<script setup lang="ts">
import type { ListStoreType } from "@/stores/list";

defineProps<{
  list: ListStoreType;
}>();
</script>
<script lang="ts">
export default {
  name: "ListComponent",
};
</script>

<template>
  <ul>
    <li v-for="item in list.items" :key="item.id">
      <label>
        <input type="checkbox" :value="item.id" v-model="item.selected" />
        <span>Item {{ item.id + 1 }}</span>
        <input type="number" min="0" v-model="item.amount" />
        <input type="color" v-model="item.color" />
      </label>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 4px;
}

label {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

span {
  margin-inline: 10px;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

input[type="number"] {
  margin-inline-start: auto;
  width: 40px;
  border: none;
  text-align: center;
}

input[type="color"] {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
}
</style>
