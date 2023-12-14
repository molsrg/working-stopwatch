<template>
    <v-dialog v-model="store.openStartDialog" width="600">
        <v-card :title="$t('startDialog.title')">
            <v-card-text>
                <v-text-field
                    v-model="titleSession"
                    :label="$t('startDialog.inputTitleSession')"
                    clearable
                    required
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="startSession()">
                    {{ $t("buttons.startTimer") }}</v-btn
                >
                <v-btn @click="store.updateOpenStartDialog">
                    {{ $t("buttons.cancel") }}</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "global",
});

const store = useCounterStore();
const titleSession = ref("");

// Запускает таймер
const startSession = () => {
    store.updateOpenStartDialog();
    store.updateTimerRun();
    const startTime = Date.now();
    localStorage.setItem("SEGMENT_START", startTime);

    const timerInterval = setInterval(() => {
        updateTimer(startTime);
    }, 1000);

    store.updateTimerInterval(timerInterval);

    let data = ref({
        title: titleSession.value,
        date: new Date().toLocaleDateString(),
        startTime: startTime,
        totalTime: 0,
        segments: [],
        comments: "",
    });

    store.createSession(data);
    titleSession.value = "";
};

// Обновление таймера
const updateTimer = (time) => {
    const now = Date.now();
    const timeHasPassed = now - time;

    const hours = Math.floor(timeHasPassed / (1000 * 60 * 60));
    const minutes = Math.floor(
        (timeHasPassed % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeHasPassed % (1000 * 60)) / 1000);

    const currentTime = {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
    };

    store.updateCurrentTime(currentTime);
};

// Приведение формата времени к нужному виду
const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
};
</script>


<style>
</style>