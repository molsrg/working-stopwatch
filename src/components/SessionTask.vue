<template>

    <div class="task">
        <v-list lines="one">
            <v-list-item
                v-for="(task,idx) in props.tasks"
                :key="idx"
                :title="task"
                min-width="80vw"
                prepend-icon="mdi-circle-small"
            >
            </v-list-item>

        </v-list>
    </div>
</template>

<script setup>
const props = defineProps(["tasks"]);

</script>
