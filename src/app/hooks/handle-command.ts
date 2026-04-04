import {
  useNotificationStore,
  type VariantMessage,
} from "@/notifications/store/notifications.store";

export const useHandlerCommand = () => {
  const store = useNotificationStore();

  const { addMessage } = store;

  const onCommand = (message: string) => {
    const [command, ...rest] = message.split(" ");
    const args = rest.join(" ");

    if (command === "message") {
      const info = args?.split("-") || [];
      const variant = info[0] as VariantMessage;
      const content = info[1] as string;
      addMessage(content, variant);
    }
  };

  return { onCommand };
};
