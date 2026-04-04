<script lang="ts" setup>
import { ref } from "vue";
const isFlipped = ref(false);

interface Props {
  perspective: string;
  height: string;
  width: string;
  isDisabled?: boolean;
}

const { width, height, perspective, isDisabled = false } = defineProps<Props>();

const emit = defineEmits<{
  flipped: [];
}>();

const changeFlipped = () => {
  if (isFlipped.value) return;
  isFlipped.value = true;
  emit("flipped");
};
</script>

<template>
  <div class="container" :class="{ flipped: isFlipped }" :style="{ width, height, perspective }">
    <button type="button" class="action" :disabled="isDisabled" @click="changeFlipped">
      <div class="face front">
        <slot name="front"></slot>
      </div>
      <div class="face back">
        <slot name="back"></slot>
      </div>
    </button>
  </div>
</template>

<style setup>
.container.flipped .action {
  transform: rotateY(180deg);
}

.action {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  width: 100%;
}

.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>
