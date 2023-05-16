<template>
    <div class="main-container">
        <div class="gray-panel">
            <h1 class="heading">Rejestracja</h1>
            <div class="alert">{{ alertMessage }}</div>
            <p class="login">NAZWA UŻYTKOWNIKA</p>
            <input type="text" v-model="login" name="login" id="login">
            <p class="login">EMAIL</p>
            <input type="text" v-model="email" name="email" id="email">
            <p class="password">HASŁO</p>
            <input type="password" v-model="password" name="password" id="password">
            <p class="repeat-password">POWTÓRZ HASŁO</p>
            <input type="password" v-model="repeatPassword" name="repeat-password" id="repeat-password">
            <div>
                <button @click="register" class="btn btn-blue">ZAREJESTRUJ SIĘ</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from "vue";
import AuthStore from "@/store/AuthStore";
import {useRouter} from "vue-router";

const router = useRouter();

const login = ref();
const email = ref();
const password = ref();
const repeatPassword = ref();
const alertMessage = ref();

const register = (IdLogin) => {
    AuthStore.Register(login.value, email.value, password.value, repeatPassword.value)
        .then(() => {
            const id = IdLogin.id;
            router.push("/");
        }).catch((error) => {
            alertMessage.value = error.response.data.message;
        }
    )
}

</script>

<style scoped>
* {
    background-color: var(--gray);
    border-radius: var(--spacing);

}

.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
}

.gray-panel {
    display: flex;
    flex-direction: column;
    background-color: var(--gray);
    max-width: 768px;
    width: 100%;
    gap: var(--spacing);
    padding: var(--spacing);
    margin: var(--spacing);
}


input {
    background-color: var(--white);
    padding: calc(var(--spacing) / 2);
    border-width: 0;
}
</style>