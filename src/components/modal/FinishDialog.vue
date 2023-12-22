<template>
    <v-dialog v-model="store.openDialog" width="600">
        <v-card :title="store.getSession.date">
            <v-card-text>
                {{ $t("finishDialog.title") }}
                <v-text-field
                    v-model="commentsSession"
                    :label="$t('finishDialog.inputTitleSession')"
                    clearable
                    required
                    hide-details
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="stopTimer()"> {{ $t("buttons.stopTimer") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import { ref } from "vue";

const store = useCounterStore();
const commentsSession = ref("");
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "global",
});


const stopTimer = () => {
    store.updateSessionComments(commentsSession.value);
    commentsSession.value = ""
    store.updateTimerRun()
    store.updateSessions();
    store.updateOpenDialog()

    localStorage.setItem("SESSIONS", JSON.stringify(store.getSessions));

    localStorage.removeItem("BREAK_START");
    localStorage.removeItem("TIMER_START");
    localStorage.removeItem("SEGMENT_START");
    localStorage.removeItem("TOTAL_TIME");
};



</script>


<style>
</style>