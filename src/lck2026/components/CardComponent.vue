<script lang="ts" setup>
import { cdnUrl } from "@/core/settings";
import FlippedElement from "./FlippedElement.vue";

interface Props {
  background: string;
  cover: string;
}

const { cover, background } = defineProps<Props>();

const emit = defineEmits<{
  opened: [];
}>();
</script>

<template>
  <FlippedElement width="300px" height="450px" perspective="800px" @flipped="emit('opened')">
    <template v-slot:front>
      <div
        :style="{
          background: `url('${cdnUrl}${background}') center/cover no-repeat`,
          width: '100%',
          height: '100%',
        }"
      ></div>
    </template>
    <template v-slot:back>
      <div
        class="back-container"
        :style="{ background: `url('${cdnUrl}${cover}')`, width: '100%', height: '100%' }"
      ></div>
    </template>
  </FlippedElement>
</template>

<style scoped>
.back-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 18px;
}
</style>
