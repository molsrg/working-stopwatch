<template>
    <v-dialog v-model="store.openAddTaskDialog" width="600">
        <v-card :title="$t('addTask.title')">
            <v-card-text>
                <v-text-field
                    v-model="taskSession"
                    :label="$t('addTask.label')"
                    clearable
                    @keydown.enter="addTask()"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addTask()">{{ $t("addTask.addTask") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { useCounterStore } from "@/store/index.js";
import { ref } from "vue";

const store = useCounterStore();
const taskSession = ref("");

// Добавление задачи в список задач сессии
const addTask = () => {
    if (taskSession.value.length == 0) {
        return;
    }
    
    store.updateTaskSession(taskSession.value)
    
    store.updateAddTaskOpenDialog()
    taskSession.value = "";
};

</script>

