<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotificationStore } from "../store/notifications.store";
import NotificationComponent from "./NotificationComponent.vue";

const store = useNotificationStore();
const { stack } = storeToRefs(store);
</script>

<template>
  <div class="list-container">
    <NotificationComponent
      v-for="msg in stack"
      :key="msg.id"
      :id="msg.id"
      :content="msg.content"
      :variant="msg.variant"
    />
  </div>
</template>

<style scoped>
.list-container {
  align-items: flex-end;
  justify-content: flex-end;
  padding: 20px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  overflow-y: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  pointer-events: none;
}
</style>
