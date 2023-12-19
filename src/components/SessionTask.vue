<template>
    <div class="task">
        <v-list lines="one">
            <v-list-item
                v-for="(task, idx) in props.tasks"
                :key="task.totalTime"
                :title="task"
                @click="openTask()"
                min-width="80vw"
                prepend-icon="mdi-circle-small"
            >
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>

const props = defineProps(["tasks"]);



const openTask = () => {
    console.log(1);
};
</script>


<style>
</style>