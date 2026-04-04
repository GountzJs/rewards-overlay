importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyC4qWH65ozyvl7YImoloiXaI4PkW1_dKj4',
  authDomain: 'embeejayz-dev.firebaseapp.com',
  projectId: 'embeejayz-dev',
  storageBucket: 'embeejayz-dev.firebasestorage.app',
  messagingSenderId: '882659391510',
  appId: '1:882659391510:web:abe43c21f96f9e4e915d37',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  })
})
    