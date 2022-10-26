import { defineStore } from "pinia";

export interface Item {
  id: number;
  color: string;
  amount: number;
  selected: boolean;
}
export type ListStoreType = ReturnType<ReturnType<typeof createListStore>>;

function randColor() {
  const digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  return (
    "#" +
    [1, 2, 3, 4, 5, 6]
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("")
  );
}

function initItems() {
  return new Array<Item>(Math.floor(Math.random() * 6) + 4)
    .fill(null!)
    .map((_, i) => ({
      id: i,
      amount: Math.floor(Math.random() * 10),
      color: randColor(),
      selected: false,
    }));
}

const createListStore = (id: string) =>
  defineStore({
    id,
    state: () => ({
      items: initItems(),
    }),
    getters: {
      shuffled: (state) => {
        const result = state.items
          .filter((item) => item.selected)
          .map((item) => new Array<Item>(item.amount).fill(item))
          .reduce((acc, item) => [...acc, ...item], [])
          .sort(() => (Math.random() >= 0.5 ? 1 : -1));
        return result;
      },
      ordered: (state) => {
        const result = state.items
          .filter((item) => item.selected)
          .map((item) => new Array<Item>(item.amount).fill(item));
        return result;
      },
      checkedStatus: (state) => {
        const zeroChecked = !state.items.some((item) => item.selected);
        if (zeroChecked) return "none";
        const allChecked = !state.items.some((item) => !item.selected);
        if (allChecked) return "all";
        return "indeterminate";
      },
    },
    actions: {
      updateItem(index: number, item: Partial<Item>) {
        this.items[index] = {
          ...this.items[index],
          ...item,
        };
      },
      checkAll() {
        this.items.forEach((item) => (item.selected = true));
      },
      uncheckAll() {
        this.items.forEach((item) => (item.selected = false));
      },
      decrement(index: number) {
        if (this.items[index].amount > 0) this.items[index].amount--;
      },
    },
  });

export const useListStore1 = createListStore("List 1");
export const useListStore2 = createListStore("List 2");
export const useListStore3 = createListStore("List 3");
export const useListStore4 = createListStore("List 4");
export const useListStore5 = createListStore("List 5");

export const useListsStore = defineStore({
  id: "lists",
  state: () => ({
    items: [
      useListStore1(),
      useListStore2(),
      useListStore3(),
      useListStore4(),
      useListStore5(),
    ],
  }),
});
