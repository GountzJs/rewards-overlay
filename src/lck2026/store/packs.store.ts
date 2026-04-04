import { defineStore } from "pinia";
import { ref } from "vue";
import type { Lck2026Entity } from "../api/entities/lck2026.entity";

interface LckPack {
  id: string;
  username: string;
  cards: Lck2026Entity[];
}

export const usePackStore = defineStore("store-list-pack", () => {
  const packs = ref<LckPack[]>([]);

  const addPack = (pack: LckPack) => {
    packs.value = [...packs.value, pack];
  };

  const removePack = (id: string) => {
    packs.value = packs.value.filter((pack) => pack.id !== id);
  };

  return { packs, addPack, removePack };
});
