<template>
    <v-list lines="two">

        <v-list-item
            v-for="(segment, idx) in props.data.segments"
            :key="idx"
            :title="'Segment ' + Number(idx + 1)"
            :subtitle="`Total Time: ${formatMilliseconds(
                segment.totalTime
            )}, Break Time: ${formatMilliseconds(segment.breakTime)}`"
            width="80vw"
            
            class="segments"
        >
            <v-combobox
                label="Combobox"
                :items="props.data.tasks"
                v-model="model"
                append-icon="mdi-send"
                @click:append="sendMessage(idx)"
                v-if="segment.comments.length == 0"
            ></v-combobox>

            Time Start - {{ formatTimeFromMilliseconds(segment.segmentStart) }},
            Time End - {{ formatTimeFromMilliseconds(segment.segmentEnd) }}
        </v-list-item>
    </v-list>
</template>
  
<script setup>
import { ref } from "vue";

const props = defineProps(["data"]);
import { useCounterStore } from "@/store/index.js";
const model = ref("");
const store = useCounterStore();


const sendMessage = (segment) => {
    console.log(model.value, segment);

    const data = {
        index: segment, 
        comments: model.value
    }
    store.updateSegmentComments(data)
    model.value = ""
};

function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

</style>