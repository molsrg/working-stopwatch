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
                v-if="store.isTimerRun && !isOnBreak"
                variant="tonal"
                color="orange"
                @click="startBreak()"
            >
                {{ $t("buttons.breakTime") }}
            </v-btn>

            <v-btn
                v-if="store.isTimerRun && isOnBreak"
                variant="tonal"
                color="green"
                @click="resumeWork()"
            >
                {{ $t("buttons.resumeWork") }}
            </v-btn>

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
import { ref } from "vue";
import { useCounterStore } from "@/store/index.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "global",
});
const store = useCounterStore();

const isOnBreak = ref(false);



const confirmSave = () => {
    localStorage.setItem("BREAK_START", Date.now());
    localStorage.setItem("TOTAL_TIME", JSON.stringify(store.getCurrentTime));
    store.clearIntervalTimer();
};


if (localStorage.getItem("SEGMENT_START")) {

        store.updateTimerRun();
        store.clearIntervalTimer();
        isOnBreak.value = true;
        store.updateCurrentTime(JSON.parse(localStorage.getItem("TOTAL_TIME")));
        window.addEventListener("beforeunload", confirmSave);
}



// Запускает таймер
const startSession = () => {
    store.updateOpenStartDialog();
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

// Начинаем перерыв
const startBreak = () => {
    store.clearIntervalTimer();
    localStorage.setItem("BREAK_START", Date.now());
    isOnBreak.value = true;

    // Вычисляет длину сегмента
    const sessionStart = parseInt(localStorage.getItem("SEGMENT_START"), 10);
    const sessionDuration = Date.now() - sessionStart;

    const dataSegment = {
        totalTime: sessionDuration,
        segmentStart: sessionStart,
        segmentEnd: Date.now(),
        breakTime: 0,
    };

    store.updateSessionSegment(dataSegment);
};

// Отдых после перерыва
const resumeWork = () => {
    isOnBreak.value = false;
    const breakStart = parseInt(localStorage.getItem("BREAK_START"), 10);
    const breakEndTime = Date.now();

    localStorage.setItem("SEGMENT_START", breakEndTime);

    // console.log("Возвращаюсь к работе в ", formatITime(breakEndTime));

    // Вычисляет длительность перерыва до следующего сегмента
    const breakDuration = breakEndTime - breakStart;
    // console.log("Длительность перерыва ", breakDuration, "мс");

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
        updateTimer(newTime);
    }, 1000);

    store.updateTimerInterval(timerInterval);
};

// Открывает диалоговое окно, очищает интервал
const stopTimer = () => {
    startBreak()

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
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
}
</style>
