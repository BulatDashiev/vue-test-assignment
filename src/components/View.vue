<script setup lang="ts">
import type { ListStoreType } from "@/stores/list";
import { ref } from "vue";

defineProps<{
  list: ListStoreType;
  title: string;
}>();
const ordered = ref(true);
</script>
<script lang="ts">
export default {
  name: "ViewComponent",
};
</script>

<template>
  <div class="view">
    <div class="header">
      <span>{{ title }}</span>
      <button @click="ordered = !ordered" v-if="list.ordered.length > 0">
        {{ ordered ? "Перемешать" : "Отсортировать" }}
      </button>
    </div>
    <div class="content" v-if="list.ordered.length > 0">
      <template v-if="ordered">
        <div class="row" v-for="(items, i) in list.ordered" :key="i">
          <div
            class="box"
            v-for="item in items"
            :key="item.id"
            :style="{ backgroundColor: item.color }"
            @click="list.decrement(item.id)"
          ></div>
        </div>
      </template>
      <div class="row" v-else>
        <div
          class="box"
          v-for="item, i in list.shuffled"
          :key="i"
          :style="{ backgroundColor: item.color }"
          @click="list.decrement(item.id)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view {
  display: grid;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.content {
  display: grid;
  gap: 4px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 16px;
}

.box {
  width: 16px;
  height: 16px;
}
</style>
