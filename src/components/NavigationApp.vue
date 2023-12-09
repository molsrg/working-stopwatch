
<template>
    <v-app-bar>
        <h2 class="logo">Time To Work</h2>

        <template v-slot:append>
            <v-btn @click="toggleTheme">toggle theme</v-btn>
            <router-link to="/stats">
              <v-btn icon="mdi-chart-line"></v-btn>
            </router-link>

            <router-link to="/info">
              <v-btn icon="mdi-information"></v-btn>
            </router-link>

        </template>
    </v-app-bar>
</template>


<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
}
</script>

<style scoped>
.logo {
    margin-left: 30px;
}

a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>