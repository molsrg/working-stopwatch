<template>
    <Navigation />
    <VStartDialog></VStartDialog>
    <VFinishDialog></VFinishDialog>
    <v-main class="container">
        <Counter></Counter>
        <section class="section__tasks"> 
            <h3 v-if="store.getSession.tasks && store.getSession.tasks.length > 0" class="section__task-title">{{$t("sessionTask.title")}}</h3>
            <SessionTask :tasks="store.getSession.tasks"></SessionTask>
        </section>

        <Segments :data="store.getSession"></Segments>
    </v-main>
</template>

<script setup>
import { useCounterStore } from "@/store/index.js";
const store = useCounterStore();
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "global",
});

import Navigation from "@/components/NavigationApp.vue";
import Counter from "@/components/CountUp.vue";
import Segments from "@/components/SegementApp.vue";
import VFinishDialog from "@/components/modal/FinishDialog.vue";
import VStartDialog from "@/components/modal/StartDialog.vue";
import SessionTask from "@/components/SessionTask.vue";
</script>


<style>
.container {
    margin: 0 auto;
    margin-top: 4vh;
    padding: 0px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
}
.banner {
    position: fixed;
    z-index: 10;
    top: 80px;
    left: 80vw;
}
.section__tasks {
    display: flex; 
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
}

.section__task-title {
    font-size: 24px;
}
</style>