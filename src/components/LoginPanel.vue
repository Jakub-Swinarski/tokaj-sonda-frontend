<template>
    <div class="main-container">
        <div class="gray-panel">
            <h1 class="heading">LOGOWANIE</h1>
            <div class="alert">{{ alertMessage }}</div>
            <p class="login">Username</p>
            <input type="text" v-model="username" name="login" id="login">
            <p class="password">HASŁO</p>
            <input type="password" v-model="password" name="password" id="password">
            <div>
                <button @click="logged" class="btn btn-blue">ZALOGUJ</button>
                <button @click="register" class="btn btn-blue">ZAREJESTRUJ SIĘ</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";

const username = ref();
const password = ref();
const alertMessage = ref();

const router = useRouter();
const logged = () => {
    AuthStore.login(username.value, password.value)
        .then(() => {
            router.push("/");
        }).catch((error) => {
            alertMessage.value = error.response.data.message;
        }
    )
}
const register = () => {
    router.push("/register");
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