import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusPackStore = defineStore("store-status", () => {
  const status = ref<boolean>(true);

  const show = () => {
    status.value = true;
  };

  const hide = () => {
    status.value = false;
  };

  return { show, hide, status };
});
