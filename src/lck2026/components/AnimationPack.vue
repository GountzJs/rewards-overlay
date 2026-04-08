<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useActivePackStore } from "../store/active-pack.store";
import { useTimeout } from "../utils/timeout";
import AnimationSobre from "./AnimationSobre.vue";
import PreviewCards from "./PreviewCards.vue";

const count = ref(0);
const spread = ref(false);
const moveSobre = ref(false);

const storePack = useActivePackStore();
const { pack } = storeToRefs(storePack);

const { start: startSpread } = useTimeout(() => {
  spread.value = true;
}, 200);

const { start: startRemovePack, stop: stopRemovePack } = useTimeout(() => {
  moveSobre.value = false;
  storePack.removePack();
}, 2000);

const addCount = () => {
  count.value = count.value + 1;
};

const handleOpened = () => {
  moveSobre.value = true;
  startSpread();
};

watch(pack, () => {
  count.value = 0;
  spread.value = false;
  stopRemovePack();
});

watch(count, (val) => {
  if (val >= 3) startRemovePack();
});
</script>

<template>
  <div class="animation-container" :class="{ active: Boolean(pack) }">
    <div v-if="pack" class="container">
      <PreviewCards :cards="pack.cards" :spread="spread" :card-width="300" @opened="addCount" />
      <AnimationSobre class="sobre" :class="{ move: moveSobre }" @opened="handleOpened" />
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

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: drop-in 1s ease-in forwards;
}

.sobre {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes drop-in {
  from {
    top: -120vh;
  }
  to {
    top: 50%;
  }
}
</style>
