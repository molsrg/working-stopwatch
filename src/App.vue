<template>
  <v-app>
    <router-view />
  </v-app>

</template>

<script setup>

import { useCounterStore } from "@/store/index.js";
const store = useCounterStore();

const sessionsInLocalStorage = localStorage.getItem("SESSIONS")
if(sessionsInLocalStorage) {
  store.downoloadSessions(JSON.parse(sessionsInLocalStorage))
}


</script>
