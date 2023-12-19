<template>
    <v-data-table-virtual
        :headers="headers"
        :items="sessions"
        class="stats"
        item-value="title"
        
        show-expand
    >
        <template v-slot:expanded-row="{ columns, item }">
            <tr>
                <td :colspan="columns.length">
                    <SessionTask :tasks="item.tasks"></SessionTask>
                    <Segments :data="item"></Segments>
                </td>
            </tr>
        </template>
    </v-data-table-virtual>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import { useI18n } from "vue-i18n";
import Segments from '@/components/SegementApp.vue'
import SessionTask from '@/components/SessionTask.vue'

const { t } = useI18n({
    useScope: "global",
});
const store = useCounterStore();
const sessions = store.getSessions

const headers = [
    { title: `${t("stats.headers.date")}`, align: "center", key: "date" },
    { title: `${t("stats.headers.totalCount")}`, align: "center", key: "totalTime" },
    { title: `${t("stats.headers.comments")}`, align:"center", key: "comments" },
    { title: `${t("stats.headers.segments")}`, align:"center", key: "segments.length" },
];

</script>

<style>
.stats {
    margin-top: 10vh;
}
</style>