<template>
    <v-dialog v-model="store.openDialog" width="600">
        <v-card :title="store.getSession.date">
            <v-card-text>
                Молодец, сегодня ты хорошо поработал!
                <!-- {{ store.getSession }} -->
                Оставь небольшой комментарий
                <v-text-field
                    v-model="commentsSession"
                    label="Comments"
                    clearable
                    required
                    hide-details
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Завершить работу" @click="stopTimer()"></v-btn>
                <!-- <v-btn text="Отмена" @click="store.updateOpenDialog"></v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import { ref } from "vue";

const store = useCounterStore();
const commentsSession = ref("");

const stopTimer = () => {
    store.updateSessionComments(commentsSession.value);
    commentsSession.value = ""
    store.updateTimerRun()
    store.updateSessions();
    store.updateOpenDialog()

    localStorage.setItem("SESSIONS", JSON.stringify(store.getSessions));

    console.log("Завершаю работу");

    localStorage.removeItem("BREAK_START");
    localStorage.removeItem("TIMER_START");
    localStorage.removeItem("SEGMENT_START");
};



</script>


<style>
</style>