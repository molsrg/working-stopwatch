<template>
    <v-list lines="two">
        <v-list-item
            v-for="(segment, idx) in props.data.segments"
            :key="idx"
            :title="`${$t('segments.title')} ${Number(idx + 1)}`"
            :subtitle="`${$t('segments.totalTime')} ${formatMilliseconds(
                segment.totalTime
            )}, ${$t('segments.breakTime')} ${formatMilliseconds(
                segment.breakTime
            )}`"
            class="segments"
            style="width: 80vw"
        >
            <div>
                <v-combobox
                    class="comments"
                    :label="$t('segments.comments')"
                    :items="props.data.tasks"
                    @update:model-value="updateModel(idx, $event)"
                    append-icon="mdi-send"
                    @click:append="sendMessage(idx, props.data)"
                    v-if="segment.comments.length == 0"
                ></v-combobox>
                <div v-else>
                    {{ $t("segments.comments") }} - {{ segment.comments }}
                </div>

                <!-- Time Start - {{ formatTimeFromMilliseconds(segment.segmentStart) }},
                Time End - {{ formatTimeFromMilliseconds(segment.segmentEnd) }} -->
            </div>
        </v-list-item>
    </v-list>
</template>
  
<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/store/index.js";

const store = useCounterStore();

const props = defineProps(["data"]);

const models = ref([]); // Массив для уникальных моделей

// Обновление моделей комментариев
function updateModel(index, value) {
    models.value[index] = value; // Обновляем соответствующую модель при изменении
}

// Отправка комментария в отрезок
const sendMessage = (segmentIndex, session) => {
    const data = {
        index: segmentIndex,
        comments: models.value[segmentIndex], 
        session: session.startTime
    };
    store.updateSegmentComments(data);
    models.value[segmentIndex] = "";
};

// Преобразование формата времени к нужному
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
</script>

<style>
</style>