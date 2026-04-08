<script setup lang="ts">
import { computed } from "vue";
import CardComponent from "./CardComponent.vue";

interface Card {
  background: string;
  cover: string;
}

interface Props {
  cards: Card[];
  spread: boolean;
  cardWidth?: number;
}

const emit = defineEmits<{ opened: [] }>();
const { cards, spread, cardWidth = 160 } = defineProps<Props>();

const gap = 24;

const totalWidth = computed(() => cards.length * (cardWidth + gap) - gap);

const groupOffset = computed(() => (spread ? -totalWidth.value / 2 : -cardWidth / 2));

const getTranslate = (index: number) => {
  const cardPos = spread ? index * (cardWidth + gap) : 0;
  return groupOffset.value + cardPos;
};
</script>

<template>
  <div class="cards-layout">
    <CardComponent
      v-for="(card, index) in cards"
      :key="index"
      :background="card.background"
      :cover="card.cover"
      :style="{ transform: `translateX(${getTranslate(index)}px)` }"
      class="card-item"
      @opened="emit('opened')"
    />
  </div>
</template>

<style scoped>
.cards-layout {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 450px;
  width: 300px;
  transform: translateY(-50%);
}

.card-item {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 400ms ease-out;
}
</style>
