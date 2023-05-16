<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const login = () => {
    router.push("/login");
}
</script>

<template>
    <button class="btn btn-blue" @click="login">Zaloguj się</button>
</template>

<style scoped>

</style>
