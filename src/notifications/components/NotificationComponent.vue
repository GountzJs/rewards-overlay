<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useNotificationStore, type VariantMessage } from "../store/notifications.store";

interface Props {
  id: string;
  content: string;
  variant: VariantMessage;
}

const { id, content } = defineProps<Props>();
const { removeMessage } = useNotificationStore();

const timer = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  timer.value = setTimeout(() => {
    removeMessage(id);
  }, 5000);
});

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>

<template>
  <div class="container">
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
.container {
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  outline: 6px solid #711420;
  padding: 4px 8px;
  width: 100%;
  max-width: 450px;
}

.container > p {
  font-family: var(--font-nunito);
  font-size: 18px;
  text-align: center;
}
</style>
