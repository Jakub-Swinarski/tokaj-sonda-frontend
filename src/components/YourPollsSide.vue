<script setup>
import PollStore from "@/store/PollStore";

PollStore.GetPoll()
</script>
<template>
    <div class="poll" v-for="(value, index) of PollStore.PollQuestion.value" :key="index">
        <h2>{{ value }}</h2>
        <div class="buttons">
            <button class="delete btn btn-blue" >Usuń</button>
            <button class="edit btn btn-blue" >Edytuj</button>
        </div>
    </div>
</template>


<style scoped>
.poll {
    gap: var(--spacing);
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    width: 100%;
}

.buttons {
    gap: var(--spacing);
    display: flex;
    flex-direction: row;
}

</style>