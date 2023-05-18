<script setup>
import {computed, ref, watch} from "vue";
import LoginButton from "@/components/LoginButton.vue";
import UserPanel from "@/components/UserPanel.vue";
import {useRoute} from "vue-router";
import AuthStore from "@/store/AuthStore";

const InputPlaceholder = ref();
const IsVisible = ref();
const route = useRoute();

const setPlaceholder = () => {
    if (route.path === "/options"){
        InputPlaceholder.value = "Wyszukaj opcję";
    }else if(route.path === "/your-answers"){
        InputPlaceholder.value = "Wyszukaj odpowiedz";
    }else{
        InputPlaceholder.value = "Wyszukaj sondę";
    }
    IsVisible.value = !(route.path === "/options" || route.path === "/add-poll" || route.path === "/logout");
}

setPlaceholder();
</script>

<template>
    <div class="main-wrapper">
        <div class="top-wrapper">
            <div class="search-poll-wrapper">
                <input type="text" name="search-poll" id="search-poll" :placeholder="InputPlaceholder" v-if="IsVisible">

            </div>
            <LoginButton v-if="AuthStore.userId.value === undefined"></LoginButton>
            <UserPanel v-else></UserPanel>


        </div>
        <div class="media-wrapper">
            <router-view/>
        </div>
    </div>
</template>


<style scoped>
.main-wrapper {
    display: flex;
    flex-direction: column;

}
.media-wrapper{
    display: flex;
    justify-content: center;
}
.top-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: var(--gray);
}

#search-poll {

    padding: calc(var(--spacing) / 2);
    border-width: 0;
    border-radius: var(--spacing);
}

.search-poll-wrapper {
    background-color: var(--gray);
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
