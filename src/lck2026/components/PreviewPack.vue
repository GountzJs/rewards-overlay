<script setup lang="ts">
import type { Lck2026Entity } from "../api/entities/lck2026.entity";
import { useActivePackStore } from "../store/active-pack.store";
import { usePackStore } from "../store/packs.store";

interface Props {
  id: string;
  username: string;
  cards: Lck2026Entity[];
  isDisabled?: boolean;
}

const { id, username, cards, isDisabled = false } = defineProps<Props>();

const { removePack } = usePackStore();

const { setPack } = useActivePackStore();

const handleAction = () => {
  setPack({
    id,
    username,
    cards,
  });
  removePack(id);
};
</script>

<template>
  <button
    type="button"
    class="container"
    :disabled="isDisabled"
    :style="{ background: `url('/imgs/lck-preview.png') center/cover no-repeat` }"
    @click="handleAction"
  >
    <p>@{{ username }}</p>
  </button>
</template>

<style scoped>
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: none;
  margin: 0;
  padding: 0;
  height: 80px;
  width: 200px;
  transition: all 150ms ease;
  &:not(:disabled):hover {
    cursor: pointer;
    height: 100px;
  }
  &:disabled {
    opacity: 0.6;
  }
}

.container > p {
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding: 8px;
  width: 100%;
}
</style>
