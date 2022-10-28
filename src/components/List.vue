<script setup lang="ts">
import type { Item, ListStoreType } from "@/stores/list";

const props = defineProps<{
  list: ListStoreType;
}>();
const onSelect = (event: Event, item: Item) => {
  const selected = (event.target as HTMLInputElement).checked;
  props.list.updateItem(item.id, { selected });
};
const onAmountChange = (event: Event, item: Item) => {
  const amount = parseInt((event.target as HTMLInputElement).value);
  props.list.updateItem(item.id, { amount });
};
const onColorChange = (event: Event, item: Item) => {
  const color = (event.target as HTMLInputElement).value;
  props.list.updateItem(item.id, { color });
};
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
        <input
          type="checkbox"
          :value="item.id"
          :checked="item.selected"
          @change="onSelect($event, item)"
        />
        <span>Item {{ item.id + 1 }}</span>
        <input
          type="number"
          min="0"
          :value="item.amount"
          @change="onAmountChange($event, item)"
        />
        <input
          type="color"
          :value="item.color"
          @change="onColorChange($event, item)"
        />
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
