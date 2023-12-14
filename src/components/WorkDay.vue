<template>
    <v-list lines="two" v-if="store.getSession">
        <v-list-item
            v-for="(segment, idx) in store.getSession.segments"
            :key="idx"
            :title="'Segment ' + Number(idx + 1)"
            :subtitle="`Total Time: ${formatMilliseconds(segment.totalTime)}, Break Time: ${formatMilliseconds(segment.breakTime)}`"
            min-width="80vw"
            density="comfortable"
            min-height="100"
            class="segments"
        >
            Time Start - {{ formatTimeFromMilliseconds(segment.segmentStart) }}, 
            Time End - {{ formatTimeFromMilliseconds(segment.segmentEnd) }} 
        </v-list-item>
    </v-list>
</template>
  
  <script setup>
import { useCounterStore } from "@/store/index.js";
import { onMounted } from "vue";
const store = useCounterStore();
if(localStorage.getItem("SESSION")) {
    onMounted(() => {
        store.updateSession(JSON.parse(localStorage.getItem("SESSION")))
});
}


function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}

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
.segments{
    display: flex;
    flex-direction: column;

}
</style>