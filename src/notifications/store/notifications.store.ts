import { defineStore } from "pinia";
import { v4 } from "uuid";
import { ref } from "vue";

export type VariantMessage = "error" | "success";

export type Message = {
  id: string;
  content: string;
  variant: VariantMessage;
};

export const useNotificationStore = defineStore("store-notification", () => {
  const stack = ref<Message[]>([]);

  const addMessage = (content: string, variant: VariantMessage) => {
    stack.value = [...stack.value, { id: v4(), content, variant }];
  };

  const removeMessage = (id: string) => {
    stack.value = stack.value.filter((msg) => msg.id !== id);
  };

  return { addMessage, stack, removeMessage };
});
