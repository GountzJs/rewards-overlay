import { usePackService } from "@/lck2026/services/pack-user.service";
import { useStatusPackStore } from "@/lck2026/store/status-pack.store";
import {
  useNotificationStore,
  type VariantMessage,
} from "@/notifications/store/notifications.store";

export const useHandlerCommand = () => {
  const store = useNotificationStore();
  const statusPack = useStatusPackStore();
  const { getPack } = usePackService();

  const { addMessage } = store;
  const { show, hide } = statusPack;

  const onCommand = (message: string) => {
    const [command, ...rest] = message.split(" ");
    const args = rest.join(" ");

    if (command === "message") {
      const info = args?.split("-") || [];
      const variant = info[0] as VariantMessage;
      const content = info[1] as string;
      addMessage(content, variant);
      return;
    }

    if (command === "show-pack") {
      show();
      return;
    }

    if (command === "hide-pack") {
      hide();
      return;
    }

    if (command === "notification") {
      const info = args?.split("-") || [];
      if (info[0] === "lck2026") {
        const username = info[2] as string;
        getPack(username);
      }

      if (info[0] === "ticket") {
        const username = info[3] as string;
        addMessage(`@${username}: Haz canjeado el ticket del enfrentamiento!`, "success");
      }
    }
  };

  return { onCommand };
};
