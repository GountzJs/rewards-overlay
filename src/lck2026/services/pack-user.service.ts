import { v4 } from "uuid";
import { getLckPack } from "../api/api";
import { usePackStore } from "../store/packs.store";

export const usePackService = () => {
  const store = usePackStore();

  const { addPack } = store;

  const getPack = async (username: string) => {
    const cards = await getLckPack(username);
    addPack({
      cards,
      id: v4(),
      username,
    });
  };

  return { getPack };
};
