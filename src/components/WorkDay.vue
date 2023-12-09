<template>
    {{ store.getSession.date }}
    {{ store.getSession.totalTime }}
    {{ store.getSession.startTime }}

    <v-list lines="two" v-if="store.getSession">
        <v-list-item
            v-for="(segment, idx) in store.getSession.segments"
            :key="idx"
            :title="'Промежуток ' + Number(idx + 1)"
            :subtitle="`Total Time: ${segment.totalTime} ms, Break Time: ${segment.breakTime} ms`"
        >
            {{ segment }}
        </v-list-item>
    </v-list>
</template>
  
  <script setup>
import { useCounterStore } from "@/store/index.js";

// Вызываем функцию useCounterStore для получения реактивного состояния
const store = useCounterStore();
</script>
  