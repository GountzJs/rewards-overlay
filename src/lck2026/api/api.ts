import { apiUrl } from "@/core/settings";
import type { AccountEntity } from "./entities/account.entity";
import type { Lck2026Entity } from "./entities/lck2026.entity";

export const getLastCards = async (id: string): Promise<Lck2026Entity[]> => {
  const response = await fetch(`${apiUrl}/v1/lck2026/${id}/last`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to fetch cards");

  return data.cards;
};

export const getAccountByUsername = async (username: string): Promise<AccountEntity> => {
  const response = await fetch(`${apiUrl}/v1/accounts/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to fetch account");

  return data;
};

export const getLckPack = async (username: string): Promise<Lck2026Entity[]> => {
  const { id } = await getAccountByUsername(username);
  const data = await getLastCards(id);
  return data;
};
