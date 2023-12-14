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
                    <v-list lines="two">
                        <v-list-item
                            v-for="(segment, idx) in item.segments"
                            :key="idx"
                            :title="'Segment ' + Number(idx + 1)"
                            :subtitle="`Total Time: ${formatMilliseconds(segment.totalTime)}, Break Time: ${formatMilliseconds(segment.breakTime)}`"
                        ></v-list-item>
                    </v-list>
                </td>
            </tr>
        </template>
    </v-data-table-virtual>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
import { useI18n } from "vue-i18n";

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


function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}



</script>

<style>
.stats {
    margin-top: 10vh;
}
</style>