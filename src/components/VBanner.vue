<template>
    <v-sheet rounded class="v-banner">
        <h4>Время начала - {{ formatTimeFromMilliseconds(store.getSession.startTime) }}</h4>
        <h3 v-if="store.getSession.comments">Комментарий - {{ store.getSession.comments }}</h3>
    </v-sheet>
</template>


<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/store/index.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "global",
});

const store = useCounterStore();


// Преобразование формата времени Date.now() в HH:MM:SS
const formatTimeFromMilliseconds = (milliseconds) => {
    const currentTime = new Date(milliseconds);
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};

</script>

<style>

.v-banner {
    display: flex;
    flex-direction: column;
    padding: 20px;
    text-wrap: nowrap;
}
</style>
