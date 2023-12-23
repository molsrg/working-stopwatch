
<template>
    <v-app-bar class="nav">
        <router-link to="/working-stopwatch/">
            <h2 class="logo">Time To Work</h2>
        </router-link>
        <template v-slot:append>
            <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
            <v-btn icon="mdi-translate" id="menu-activator"></v-btn>

            <v-menu activator="#menu-activator">
                <v-list>
                    <v-list-item
                        v-for="key in Object.keys(language)"
                        :key="key"
                        :value="language[key]"
                        @click="switchLang(language[key])"
                    >
                        <v-list-item-title>{{ key }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

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
import { useI18n } from "vue-i18n";

const { locale } = useI18n({
    useScope: "global",
});

const theme = useTheme();

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
}
const language = {
    Русский: "ru",
    English: "en",
    中文: "cn",
    Deutsch: "de", 
    Français: "fr", 
    한국어: "kr"
};

const switchLang = (value) => {
    locale.value = value;
    localStorage.setItem("language", locale.value);
};
</script>

<style scoped>
.nav {
    display: flex;
    flex-direction: column;
}
.logo {
    margin-left: 30px;
}

@media (max-width: 480px) {
    .logo {
        font-size: 18px;
    }
}

a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
}
</style>