import { onUnmounted, ref } from "vue";

export const useTimeout = (fn: () => void, delay: number) => {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    stop();
    timeout.value = setTimeout(fn, delay);
  };

  const stop = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
  };

  onUnmounted(stop);

  return { start, stop };
};
