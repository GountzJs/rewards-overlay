import { defineStore } from "pinia";
import { ref } from "vue";
import type { Lck2026Entity } from "../api/entities/lck2026.entity";

interface LckPack {
  id: string;
  username: string;
  cards: Lck2026Entity[];
}

export const useActivePackStore = defineStore("store-active-pack", () => {
  const pack = ref<LckPack | null>(null);

  const setPack = (newPack: LckPack) => {
    pack.value = newPack;
  };

  const removePack = () => {
    pack.value = null;
  };

  return { pack, setPack, removePack };
});
