<template>
    <section class="section__timer">
        <h1 class="timer" id="timer">
            {{ store.getCurrentTime.hours }}:{{
                store.getCurrentTime.minutes
            }}:{{ store.getCurrentTime.seconds }}
        </h1>
        <div class="btn__container">
            <v-btn
                v-if="!store.isTimerRun"
                variant="tonal"
                color="blue"
                @click="startSession()"
            >
                {{ $t("buttons.startTimer") }}
            </v-btn>

            <v-btn
                v-if="store.isTimerRun && !store.isOnBreak"
                variant="tonal"
                color="orange"
                @click="startBreak()"
            >
                {{ $t("buttons.breakTime") }}
            </v-btn>

            <v-btn
                v-if="store.isTimerRun && store.isOnBreak"
                variant="tonal"
                color="green"
                @click="resumeWork()"
            >
                {{ $t("buttons.resumeWork") }}
            </v-btn>
            <v-btn v-if="store.isTimerRun" @click="store.updateAddTaskOpenDialog" variant="tonal">{{$t("sessionTask.addTask")}}</v-btn>
            <v-btn
                v-if="store.isTimerRun"
                variant="tonal"
                color="red"
                @click="stopTimer()"
            >
                {{ $t("buttons.stopTimer") }}
            </v-btn>


        </div>
    </section>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import UpdateTimer from "@/Timer/UpdateTimer.js";

const store = useCounterStore();



// Доделать логику 
const confirmSave = () => {
    localStorage.removeItem("BREAK_START");
    localStorage.removeItem("TIMER_START");
    localStorage.removeItem("SEGMENT_START");
    localStorage.removeItem("TOTAL_TIME");
    localStorage.removeItem("SESSION");
};
window.addEventListener("beforeunload", confirmSave);




// Открываем стартовый диалог 
const startSession = () => {
    store.updateOpenStartDialog();
};

// Начинаем перерыв
const startBreak = () => {
    store.clearIntervalTimer();
    localStorage.setItem("BREAK_START", Date.now());
    store.updateOnBreak()

    // Вычисляет длину сегмента
    const sessionStart = parseInt(localStorage.getItem("SEGMENT_START"), 10);
    const sessionDuration = Date.now() - sessionStart;

    const dataSegment = {
        totalTime: sessionDuration,
        segmentStart: sessionStart,
        segmentEnd: Date.now(),
        breakTime: 0,
        comments: '',
    };

    store.addSessionSegment(dataSegment);
};

// Отдых после перерыва
const resumeWork = () => {
    store.updateOnBreak()

    // Вычисляет длительность перерыва до следующего сегмента
    const breakStart = parseInt(localStorage.getItem("BREAK_START"), 10);
    const breakEndTime = Date.now();
    const breakDuration = breakEndTime - breakStart;

    localStorage.setItem("SEGMENT_START", Date.now());


    const dataBreak = {
        count: store.getSession.segments.length - 1,
        breakTime: breakDuration,
    };
    store.updateSessionTimeBreak(dataBreak);

    const totalBreak = store.session.segments.reduce((total, segment) => {
        return total + segment.breakTime;
    }, 0);

    // Обновляет общий счетчик времени
    const newTime = store.getSession.startTime + totalBreak;

    
    const timerInterval = setInterval(() => {
        let currentTime = UpdateTimer(newTime);
        store.updateCurrentTime(currentTime)
    }, 1000);

    store.updateTimerInterval(timerInterval);
};

// Открывает диалоговое окно, очищает интервал
const stopTimer = () => {
    if(store.onBreak == false){
        startBreak()
    }

    store.updateOpenDialog();
    store.clearIntervalTimer();
};

</script>

<style>
.section__timer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn__container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
</style>
