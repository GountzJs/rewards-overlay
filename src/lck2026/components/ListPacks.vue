<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useActivePackStore } from "../store/active-pack.store";
import { usePackStore } from "../store/packs.store";
import { useStatusPackStore } from "../store/status-pack.store";
import PreviewPack from "./PreviewPack.vue";

const statusPack = useStatusPackStore();

const { status } = storeToRefs(statusPack);

const storePack = usePackStore();

const storeActivePack = useActivePackStore();

const { packs } = storeToRefs(storePack);

const { pack: activePack } = storeToRefs(storeActivePack);
</script>

<template>
  <div class="list-container" :class="{ hide: !status }">
    <PreviewPack
      v-for="pack in packs"
      :key="pack.id"
      :id="pack.id"
      :username="pack.username"
      :cards="pack.cards"
      :is-disabled="Boolean(activePack)"
    />
  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  gap: 24px;
  right: 0;
  overflow-y: hidden;
  padding-inline: 20px;
}

.hide {
  opacity: 0;
  pointer-events: none;
}
</style>
