<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onUnmounted, ref, watch } from "vue";
import { useActivePackStore } from "../store/active-pack.store";
import CardComponent from "./CardComponent.vue";

const count = ref(0);
const storePack = useActivePackStore();
const { pack } = storeToRefs(storePack);
let removePackTimeout: ReturnType<typeof setTimeout> | null = null;
const spread = ref(false);

const addCount = () => {
  count.value = count.value + 1;
};

const onDropInEnd = () => {
  spread.value = true;
};

watch(pack, () => {
  count.value = 0;
  spread.value = false;
  if (removePackTimeout) {
    clearTimeout(removePackTimeout);
    removePackTimeout = null;
  }
});

watch(count, (val) => {
  if (val >= 3) {
    removePackTimeout = setTimeout(() => {
      storePack.removePack();
    }, 2000);
  }
});

onUnmounted(() => {
  if (removePackTimeout) clearTimeout(removePackTimeout);
});
</script>

<template>
  <div class="animation-container" :class="{ active: Boolean(pack) }">
    <div v-if="pack" class="list-container" :class="{ spread }" @animationend="onDropInEnd">
      <CardComponent
        v-for="(card, index) in pack.cards"
        :key="index"
        :background="card.background"
        :cover="card.cover"
        :style="{ '--i': index }"
        class="card-item"
        @opened="addCount"
      />
    </div>
  </div>
</template>

<style scoped>
.animation-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  pointer-events: all;
}

.list-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: drop-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: gap 0.6s ease-out;
  gap: 0px;
}

.list-container.spread {
  gap: 24px;
}

@keyframes drop-in {
  from {
    transform: translateY(-120vh);
  }
  to {
    transform: translateY(0);
  }
}

.card-item {
  position: absolute;
  transition: position 0.6s ease-out;
}

.spread .card-item {
  position: relative;
}

.card-item:nth-child(2) {
  z-index: 2;
}
</style>
