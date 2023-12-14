<template>
    <Navigation />        
    <VStartDialog></VStartDialog>
    <VFinishDialog></VFinishDialog>
    <!-- <VBanner class="banner" v-if="store.getSession.length > 0"></VBanner> -->
    <v-main class="container">
        <Counter></Counter>
        <WorkDay></WorkDay>
    </v-main>
</template>

<script setup>
import Navigation from "@/components/NavigationApp.vue";
import Counter from "@/components/CountUp.vue";
import WorkDay from "@/components/WorkDay.vue";
import VFinishDialog from "@/components/FinishDialog.vue";
import VStartDialog from "@/components/StartDialog.vue";
// import VBanner from "@/components/VBanner.vue";

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
.banner{
    position: fixed;
    z-index: 10;
    top: 80px;
    left: 80vw;
}

</style>