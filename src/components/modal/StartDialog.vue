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
                    v-for="(task, idx) in tasksSession"
                    :key="idx"
                    :title="task"
                    :subtitle="`${$t('startDialog.task')} ${Number(idx + 1)}`"
                    prepend-icon="mdi-circle-small"
                ></v-list-item>
            </v-list>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addTask()">{{ $t("buttons.addTask") }}</v-btn>

                <v-btn @click="startSession()">
                    {{ $t("buttons.startTimer") }}</v-btn
                >

                <v-btn @click="exit()"> {{ $t("buttons.cancel") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { useCounterStore } from "@/store/index.js";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import UpdateTimer from "@/Timer/UpdateTimer.js";

const { t } = useI18n({
    useScope: "global",
});


const store = useCounterStore();
const taskSession = ref("");
const tasksSession = ref([]);

// Добавление задачи в список задач сессии
const addTask = () => {
    if (taskSession.value.length == 0) {
        return;
    }
    
    tasksSession.value.push(taskSession.value)
    taskSession.value = "";
};

// Запускает таймер
const startSession = () => {
    if (taskSession.value.length > 0) {
        addTask();
    }

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
        let currentTime = UpdateTimer(startTime);
        store.updateCurrentTime(currentTime)
    }, 1000);



    store.updateOpenStartDialog();
    store.updateTimerRun();
    store.updateTimerInterval(timerInterval);
    localStorage.setItem("SEGMENT_START", startTime);


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

// Выход из стартового диалога
const exit = () => {
    store.updateOpenStartDialog();
    tasksSession.value = [];
};
</script>

