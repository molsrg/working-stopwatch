<template>
    <v-main class="container">
        <h1 class="timer" id="timer">
            {{ currentTime.hours }}:{{ currentTime.minutes }}:{{
                currentTime.seconds
            }}
        </h1>

        <div>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
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
        <WorkDay></WorkDay>
    </v-main>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import WorkDay from "@/components/WorkDay.vue";

const isTimeRunning = ref(localStorage.getItem("TIMER_RUN") === "true");
const isOnBreak = ref(false);
let timerInterval = null;

const currentTime = ref({
    hours: "00",
    minutes: "00",
    seconds: "00",
});

const Session = ref({
    date: new Date().toLocaleDateString(),
    startTime: null, 
    totalTime: null, 
    session: [
        {time: null, minutes: 0}
    ], 
    comments: ''      
    
    
})

// Запускает таймер
const startTimer = () => {
    isTimeRunning.value = true;
    const startTime = Date.now();
    localStorage.setItem("TIMER_START", startTime);
    localStorage.setItem("TIMER_RUN", true);
    console.log("Начинаю работу в", formatITime(startTime));
    Session.value.startTime = formatITime(startTime)

    const timerStart = localStorage.getItem("TIMER_START");
    timerInterval = setInterval(() => {
        if (timerStart) {
            updateTimer(parseInt(timerStart, 10));
        }
    }, 1000);
};

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
};

// отдых после перерыва
const resumeWork = () => {
    isOnBreak.value = false;
    
    const breakStart = parseInt(localStorage.getItem("BREAK_START"), 10);
    const breakEndTime = Date.now();
    console.log("Возвращаюсь к работе в ", formatITime(breakEndTime));

    const breakDuration = breakEndTime -  breakStart;
    console.log("Длительность перерыва ", breakDuration / 1000, "сек");

    const timerStart = parseInt(localStorage.getItem("TIMER_START"), 10);

    const newTime = timerStart + breakDuration

    console.log(timerStart, formatITime(timerStart))


    console.log(newTime, formatITime(newTime))
    localStorage.setItem("TIMER_START", newTime)

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
.container {
    margin: 0 auto;
    margin-top: 10vh;
    padding: 0px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
}
</style>
