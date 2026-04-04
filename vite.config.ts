import vue from "@vitejs/plugin-vue";
import { writeFileSync } from "fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  writeFileSync(
    "public/firebase-messaging-sw.js",
    `importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: '${env.VITE_FIREBASE_API_KEY}',
  authDomain: '${env.VITE_FIREBASE_AUTH_DOMAIN}',
  projectId: '${env.VITE_FIREBASE_PROJECT_ID}',
  storageBucket: '${env.VITE_FIREBASE_STORAGE_BUCKET}',
  messagingSenderId: '${env.VITE_FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${env.VITE_FIREBASE_APP_ID}',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  })
})
    `,
  );

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
  };
});
