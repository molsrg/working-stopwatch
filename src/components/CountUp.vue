<template>
    <h1 class="timer" id="timer">
        {{ currentTime.hours }}:{{ currentTime.minutes }}:{{
            currentTime.seconds
        }}
    </h1>

    <div class="btn__container">
        <v-btn
            v-if="!isTimeRunning"
            variant="tonal"
            color="blue"
            @click="startTimer()"
        >
            Начать работу
        </v-btn>

        <v-btn
            v-if="isTimeRunning && !isOnBreak"
            variant="tonal"
            color="orange"
            @click="startBreak()"
        >
            Сделать перерыв
        </v-btn>

        <v-btn
            v-if="isOnBreak"
            variant="tonal"
            color="green"
            @click="resumeWork()"
        >
            Вернуться к работе
        </v-btn>

        <v-dialog width="500">
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    text="Завершить работу"
                    v-if="isTimeRunning"
                    variant="tonal"
                    color="red"
                    @click="stopTimer()"
                >
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Dialog">
                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            text="завершить Работу"
                            @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useCounterStore } from "@/store/index.js";

const store = useCounterStore();
store.randomizeCounter()


const isTimeRunning = ref(localStorage.getItem("TIMER_RUN") === "true");
const isOnBreak = ref(false);
let timerInterval = null;

const currentTime = ref({
    hours: "00",
    minutes: "00",
    seconds: "00",
});

// const Session = ref({
//         date: new Date().toLocaleDateString(),
//         startTime: localStorage.getItem('SESSION_START'),
//         totalTime: null,
//         session: [{ time: null, minutes: 0 }],
//         comments: "",
// });

let Session = ref({
    date: new Date().toLocaleDateString(),
    startTime: localStorage.getItem("SESSION_START"),
    totalTime: 0,
    segments: [],
    comments: "",
});

// Запускает таймер
const startTimer = () => {
    isTimeRunning.value = true;
    const startTime = Date.now();
    localStorage.setItem("TIMER_START", startTime);
    localStorage.setItem("SESSION_START", startTime);
    localStorage.setItem("SEGMENT_START", startTime);
    localStorage.setItem("TIMER_RUN", true);
    console.log("Начинаю работу в", formatITime(startTime));

    const timerStart = localStorage.getItem("TIMER_START");
    timerInterval = setInterval(() => {
        if (timerStart) {
            updateTimer(parseInt(timerStart, 10));
        }
    }, 1000);
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

    currentTime.value = {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
    };
};

// Начинаем перерыв
const startBreak = () => {
    console.log("Перерыв начат в ", formatITime(Date.now()));

    localStorage.setItem("BREAK_START", Date.now());
    clearInterval(timerInterval);
    isOnBreak.value = true;

    // Вычисляет длину сегмента
    const sessionStart = parseInt(localStorage.getItem("SEGMENT_START"), 10);
    const sessionDuration = Date.now() - sessionStart;

    Session.value.segments.push({
        totalTime: sessionDuration,
        // breakTime: breakDuration,
        segmentStart: sessionStart,
        segmentEnd: Date.now(),
    });

    // Вычисление общей длительности всех сегментов
    const totalSessionTime = Session.value.segments.reduce((total, segment) => {
        return total + segment.totalTime;
    }, 0);

    // Обновление общей длительности сессии и начала сессии 
    Session.value.totalTime = totalSessionTime;
    Session.value.startTime = localStorage.getItem("SESSION_START");
    console.log(Session.value);


    store.updateSession(Session.value)

    // localStorage.setItem("CURRENT_SESSION", JSON.stringify(Session.value));
};

// отдых после перерыва
const resumeWork = () => {
    isOnBreak.value = false;
    const breakStart = parseInt(localStorage.getItem("BREAK_START"), 10);
    const breakEndTime = Date.now();
    localStorage.setItem("SEGMENT_START", breakEndTime);
    console.log("Возвращаюсь к работе в ", formatITime(breakEndTime));

    // Вычисляет длительность перерыва до следующего сегмента
    const breakDuration = breakEndTime - breakStart;
    console.log("Длительность перерыва ", breakDuration, "мс");

    // Обновляет общий счетчик времени
    const timerStart = parseInt(localStorage.getItem("TIMER_START"), 10);
    const newTime = timerStart + breakDuration;
    localStorage.setItem("TIMER_START", newTime);

    timerInterval = setInterval(() => {
        if (timerStart) {
            updateTimer(parseInt(newTime, 10));
        }
    }, 1000);
};

const stopTimer = () => {
    console.log("Завершаю работу");
    clearInterval(timerInterval);
    localStorage.setItem("TIMER_RUN", false);
    isOnBreak.value = false;
    localStorage.removeItem("BREAK_START");
};

// Приведение формата времени к нужному виду
const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
};

const formatITime = (date) => {
    const currentTime = new Date(date);
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};

onUnmounted(() => {
    console.log("Компонент уничтожен");
    localStorage.setItem("CURRENT_SESSION", JSON.stringify(Session.value));
});
</script>

<style>
.btn__container {
    display: flex;
    column-gap: 10px;
    row-gap: 10px;
}
</style>
