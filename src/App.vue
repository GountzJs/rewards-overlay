<script setup lang="ts">
import { Client } from "tmi.js";
import { onMounted } from "vue";

const client = new Client({
  channels: ["gountzbot"],
});

await client.connect();

client.on("message", (_, tags, message) => {
  const isBot = tags["display-name"] === "gountzjs";
  if (!isBot) return;
  console.log(`${tags["display-name"]}: ${message}`);
});

onMounted(() => {
  client.disconnect();
});
</script>

<template>
  <main>
    <h1>contenido</h1>
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
