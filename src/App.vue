<script setup lang="ts">
import { Client } from "tmi.js";
import { onMounted, onUnmounted, ref } from "vue";
import { useHandlerCommand } from "./app/hooks/handle-command";
import ListNotifications from "./notifications/components/ListNotifications.vue";

const { onCommand } = useHandlerCommand();

const client = new Client({
  channels: ["gountzbot"],
});

const isConnected = ref(false);

onMounted(async () => {
  if (!isConnected.value) {
    await client.connect();
    isConnected.value = true;
    client.on("message", (_, tags, message) => {
      const isBot = tags["display-name"] === "gountzjs";
      if (!isBot) return;
      if (message.startsWith("!")) onCommand(message.slice(1));
    });
  }
});

onUnmounted(async () => {
  if (isConnected.value) {
    client.removeAllListeners();
    await client.disconnect();
  }
  isConnected.value = false;
});
</script>

<template>
  <main>
    <ListNotifications />
  </main>
</template>

<style scoped>
main {
  position: relative;
  min-height: 100dvh;
  height: 100%;
  width: 100%;
}

main > h1 {
  margin: 0;
}
</style>
