<script setup lang="ts">
import { ref } from "vue";

interface Props {
  isDisabled?: boolean;
}

const isOpen = ref(false);
const isExiting = ref(false);

const { isDisabled = false } = defineProps<Props>();

const changeToOpen = () => (isOpen.value = true);

const emit = defineEmits<{
  opened: [];
}>();

const onTopTransitionEnd = (e: TransitionEvent) => {
  if (e.propertyName !== "transform") return;

  if (isOpen.value && !isExiting.value) {
    isExiting.value = true;
  } else if (isExiting.value) {
    emit("opened");
  }
};
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="btn-sobre"
    :class="{ exit: isExiting }"
    @click="changeToOpen"
  >
    <img
      class="sobre-bottom"
      :class="{ exit: isExiting }"
      src="/imgs/sobre-bottom.png"
      width="320"
      height="443"
      alt="Sobre Bottom"
    />
    <img
      class="sobre-top"
      :class="{ active: isOpen, exit: isExiting }"
      src="/imgs/sobre-top.png"
      width="319"
      height="115"
      alt="Sobre Bottom"
      @transitionend="onTopTransitionEnd"
    />
  </button>
</template>

<style scoped>
.btn-sobre {
  background: none;
  border: none;
  position: relative;
  margin: 0;
  padding: 0;
  height: 510px;
  width: 320px;
  &:not(:disabled):hover {
    cursor: pointer;
  }
}

.btn-sobre.exit {
  pointer-events: none;
}

.sobre-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 300ms ease-in;
}

.sobre-bottom.exit {
  transform: translateY(120dvh);
}

.sobre-top {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left bottom;
  transition: transform 200ms ease-in;
}

.sobre-top.active {
  transform: rotate(-20deg);
}

.sobre-top.exit {
  transform: translateY(-120dvh) rotate(-20deg);
  transition: transform 600ms ease-in;
}
</style>
