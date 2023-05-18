<script setup>
import {ref} from "vue";
import PollStore from "@/store/PollStore";

const items = ref([]);
const isVisible = ref(true);
const hasOther = ref(false);
const question = ref();
const type = ref();

const AddAnswer = (type) => {
    if(type === "OTHER"){
        isVisible.value = false;
        hasOther.value = true;
    }
    items.value.push({
        value: "",
        type
    });

}
AddAnswer("STRICT");

const SendPoll = ()=>{
    PollStore.add(
        question.value,
        type.value,
        items.value
    );
}



</script>
<template>
    <div class="main-wrapper">
        <h2 class="poll-name">Podaj nazwę sondy</h2>
        <input type="text" name="poll-name" id="poll-name" v-model="question" class="text">
        <div class="radio-wrapper">
            <h2 class="type-of-choosing">Rodzaj wyboru</h2>
            <div>
                <input type="radio" name="choice" id="single-choice" @input="type" value="SINGLE_CHOOSE">
                <label for="single-choice">Jednokrotny</label>
            </div>
            <div>
                <input type="radio" name="choice" id="multiple-choice" @input="type" value="MULTI_CHOOSE">
                <label for="multiple-choice">Wielokrotny</label>
            </div>

        </div>
        <h2>Możliwa odpowiedz</h2>
        <div class="answer" v-for="(item, index) of items" :key="index">
            <span>{{ index + 1 }}. {{item.type === 'STRICT'?'':'Inna odpowiedz'}}</span>
            <input name="answer" type="text" v-if="item.type === 'STRICT'" v-model="items[index].value"/>
        </div>
        <button class="btn btn-blue" @click="AddAnswer('STRICT')">Dodaj odpowiedz</button>
        <button class="btn btn-blue" @click="AddAnswer('OTHER')"  v-if="isVisible">Dodaj odpowiedz inne</button>
        <button class="btn btn-blue" @click="SendPoll">Dodaj sondę</button>
    </div>
</template>


<style scoped>
.main-wrapper {
    margin: var(--spacing);
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
}

.radio-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
}



.answer {
    display: flex;
    flex-direction: row;
}
</style>
