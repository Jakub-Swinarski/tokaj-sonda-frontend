<script setup>
import {useRouter} from "vue-router";
import AuthStore from "@/store/AuthStore";


const router = new useRouter();

let IsVisible = 0;

function click() {
    if (IsVisible === 0) {
        document.querySelector(".menu-wrapper").style.display = "flex";
        IsVisible = 1;
    } else {
        document.querySelector(".menu-wrapper").style.display = "none";
        IsVisible = 0;
    }
}
const logout =(IdLogin)=>{
    AuthStore.Logout()
        .then(()=>{
                router.push("/");
                const id = IdLogin.id;
            }
        )
}


</script>

<template>
    <div class="main-wrapper">
        <div class="user-wrapper">
            <h2 class="user-name" id="user">{{AuthStore.UserName.value}}</h2>
            <img src="@/assets/arrow-down.svg" alt="aaa" @click="click()">
        </div>
        <div class="menu-wrapper">
            <div class="mobile-user-name"><h2 id="user">{{AuthStore.UserName.value}}</h2></div>
            <button class="btn btn-gray" @click="router.push('/options')">Opcje użytkownika</button>
            <button class="btn btn-gray" @click="router.push('/your-polls');">Twoje sondy</button>
            <button class="btn btn-gray" @click="router.push('/your-answers');">Twoje odpowiedzi</button>
            <button class="btn btn-gray" @click="router.push('/add-poll');">Dodaj sondę</button>
            <button class="btn btn-gray" @click="logout">Wyloguj się</button>
        </div>

    </div>
</template>

<style scoped>
* {
    background-color: var(--gray);
}

.main-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
}

.user-wrapper {
    display: flex;
    gap: var(--spacing);
    padding: var(--spacing);
    flex-direction: row;
}

.menu-wrapper {
    right: 0;
    max-width: 200px;
    width: 200px;
    top: 69px;
    position: absolute;
    display: none;
    flex-direction: column;

}


.mobile-user-name {
    display: none;
}


@media (max-width: 425px) {
    .mobile-user-name {
        display: flex;
        justify-content: center;
        padding: var(--spacing);

    }

    .user-name {
        display: none;
    }

    .menu-wrapper {
        top: 59px;
    }

}
</style>

