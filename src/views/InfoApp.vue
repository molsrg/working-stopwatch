<template>
    <Navigation />
    <v-sheet max-width="80vw" rounded class="info" theme="dark" >
        <h1>{{ $t("info.title") }}</h1>
        <p>
            {{ $t("info.text") }}
       
        </p>

        <footer class="footer">
            <div class="container">
                <div class="footer__wrapper">
                    <ul class="social">
                        <li class="social__item">
                            <a href="https://vk.com/molsrg" target="_blank"
                                ><img src="@/assets/icon/vk.svg" alt="Link"
                            /></a>
                        </li>
                        <li class="social__item">
                            <a href="https://github.com/molsrg" target="_blank"
                                ><img src="@/assets/icon/gitHub.svg" alt="Link"
                            /></a>
                        </li>
                        <li class="social__item">
                            <a href="mailto:molsrg.35@gmail.com" target="_blank"
                                ><img src="@/assets/icon/gmail.svg" alt="Link"
                            /></a>
                        </li>
                    </ul>
                    <div class="copyright">
                        <p>© Sergey Molokov | 2023</p>
                    </div>
                </div>
            </div>
        </footer>
    </v-sheet>
</template>

<script setup>
import Navigation from "@/components/NavigationApp.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({
    useScope: "global",
});
</script>


<style>
li {
    list-style-type: none;
    /* Убираем маркеры */
}

.info {
    margin: 0 auto;
    margin-top: 10vh;
    display: flex;
    padding: 20px;
    justify-content: center;
    flex-direction: column;
    /* align-items: center; */
    text-align: justify;
    /* background-color: rgb(33,33,33); */
}

/* Footer */

.footer__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
}

.social {
    display: flex;
    column-gap: 30px;
    align-items: center;
}
</style>