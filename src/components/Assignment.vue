<script setup lang="ts">
import List from "@/components/List.vue";
import View from "@/components/View.vue";
import DropdownIcon from "@/components/icons/DropdownIcon.vue";
import { useListsStore, type ListStoreType } from "@/stores/list";

const lists = useListsStore();

const onSelect = (list: ListStoreType) => {
  if (list.checkedStatus === "all") {
    list.uncheckAll();
  } else {
    list.checkAll();
  }
}
</script>

<template>
  <div class="list">
    <details v-for="list in lists.items">
      <summary>
        <DropdownIcon />
        <input type="checkbox" :indeterminate="list.checkedStatus === 'indeterminate'"
          :checked="list.checkedStatus === 'all'" @change="() => onSelect(list)">
        <span>{{ list.$id }}</span>
      </summary>
      <List :list="list" />
    </details>
  </div>
  <div class="view">
    <View v-for="list in lists.items" :list="list" :title="list.$id" />
  </div>
</template>

<style scoped>
.list,
.view {
  display: grid;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
}

summary {
  cursor: pointer;
  display: flex;
  align-items: center;
}

summary span {
  margin-inline: 10px;
}

summary::marker {
  content: '';
}

summary :deep(svg) {
  width: 12px;
  height: 12px;
  transition: rotate 0.1s ease;
}

details[open] summary :deep(svg) {
  rotate: 90deg;
}

details :deep(ul) {
  padding-inline-start: 40px;
  padding-block-start: 10px;
}

input[type="checkbox"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-inline-start: 10px;
}
</style>