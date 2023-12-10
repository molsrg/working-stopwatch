<template>
    <Navigation />
    <v-main class="container">
        <Counter></Counter>
        <WorkDay></WorkDay>
        <VDialog></VDialog>
        <VStartDialog></VStartDialog>
    </v-main>
</template>

<script setup>
import Navigation from "@/components/NavigationApp.vue";
import Counter from "@/components/CountUp.vue";
import WorkDay from "@/components/WorkDay.vue";
import VDialog from "@/components/DialogApp.vue";
import VStartDialog from "@/components/StartDialog.vue";
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