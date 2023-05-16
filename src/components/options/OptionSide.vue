<script setup>
import {ref} from "vue";
import UserDelete from "@/components/options/UserDelete.vue";

const option = ref(0);
</script>

<template>
    <div class="main-wrapper">
        <div class="menu-wrapper">
            <button class="delete-user btn btn-gray" @click="option = 1">Usuń konto</button>
        </div>
        <div class="options-wrapper">
            <UserDelete v-if="option === 1"/>
        </div>
    </div>
</template>

<style scoped>
.main-wrapper {
    display: flex;
    flex-direction: row;
    max-width: 1024px;
    width: 100%;
    gap: var(--spacing);
    margin: var(--spacing);
    justify-content: center;
}

.menu-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 256px;
    width: calc(100% / 3);
}

.options-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 768px;
    width: calc((100% / 3) * 2);
}
</style>
