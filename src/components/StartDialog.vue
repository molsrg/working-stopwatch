<template>
    <v-dialog v-model="store.openStartDialog" width="600">
        <v-card :title="$t('startDialog.title')">
            <v-card-text>
                <v-text-field
                    v-model="taskSession"
                    :label="$t('startDialog.inputTitleSession')"
                    clearable
                ></v-text-field>
            </v-card-text>

            <v-list lines="one">
                <v-list-item
                    v-for="(n, idx) in tasksSession"
                    :key="idx"
                    :title="'Task ' + Number(idx + 1)"
                    :subtitle="n"
                    prepend-icon="mdi-circle-small"
                ></v-list-item>
            </v-list>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addTask()"> Добавить задачу</v-btn>

                <v-btn @click="startSession()">
                    {{ $t("buttons.startTimer") }}</v-btn
                >

                <v-btn @click="exit()">
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
const taskSession = ref("");
const tasksSession = ref([]);


const addTask = () => {
    if(taskSession.value.length == 0){
        return 
    }

    tasksSession.value.push(taskSession.value);
    taskSession.value = "";
};

// Запускает таймер
const startSession = () => {
    if (taskSession.value.length > 0) {
        addTask();
    }

    store.updateOpenStartDialog();
    store.updateTimerRun();
    const startTime = Date.now();
    localStorage.setItem("SEGMENT_START", startTime);

    const timerInterval = setInterval(() => {
        updateTimer(startTime);
    }, 1000);

    store.updateTimerInterval(timerInterval);

    let data = ref({
        tasks: tasksSession.value,
        date: new Date().toLocaleDateString(),
        startTime: startTime,
        totalTime: 0,
        segments: [],
        comments: "",
    });

    store.createSession(data);
    tasksSession.value = [];
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

// Выход из стартового диалога 
const exit = () => {
    store.updateOpenStartDialog()
    tasksSession.value = []
}
</script>


<style>
</style>