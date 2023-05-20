<script setup>
import SubmittedAnswerStore from "@/store/SubmittedAnswerStore";
import PollStore from "@/store/PollStore";
import {computed} from "vue";

PollStore.fetch()
const questions = computed(()=>{
    return PollStore.polls.value.map((element)=>{
        return element.question;
    })
})
</script>
<template>
    <div class="poll" v-for="(value, index) of questions" :key="index">
        <h2>{{ value }}</h2>
        <div class="buttons">
            <button class="delete btn btn-blue">Usuń</button>
            <button class="edit btn btn-blue">Edytuj</button>
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