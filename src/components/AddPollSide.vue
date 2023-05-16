<script setup>
import {ref} from "vue";
import PollStore from "@/store/PollStore";

const items = ref([]);
const IsVisible = ref(true);
const HasOther = ref(false);
const PollQuestion = ref();
const IsMultiple = ref();
const AddAnswer = (type) => {
    if(type === "OTHER"){
        IsVisible.value = false;
        HasOther.value = true;
    }
    items.value.push({
        value: "",
        type
    });

}
AddAnswer("TEXT");

const SendPoll = ()=>{
    PollStore.AddPoll(
        PollQuestion.value,
        IsMultiple.value,
        HasOther.value,
        items.value
            .filter(element => {
                return element.type !== "OTHER";
            })
            .map(element => {
                return element.value;
            })
    );
}

const setIsMultiple = (value) => {
    if (value === "True") {
        IsMultiple.value = true;
    } else {
        IsMultiple.value = false;
    }
}

</script>
<template>
    <div class="main-wrapper">
        <h2 class="poll-name">Podaj nazwę sondy</h2>
        <input type="text" name="poll-name" id="poll-name" v-model="PollQuestion" class="text">
        <div class="radio-wrapper">
            <h2 class="type-of-choosing">Rodzaj wyboru</h2>
            <div>
                <input type="radio" name="choice" id="single-choice" @input="setIsMultiple" value="False">
                <label for="single-choice">Jednokrotny</label>
            </div>
            <div>
                <input type="radio" name="choice" id="multiple-choice" @input="setIsMultiple" value="True">
                <label for="multiple-choice">Wielokrotny</label>
            </div>

        </div>
        <h2>Możliwa odpowiedz</h2>
        <div class="answer" v-for="(item, index) of items" :key="index">
            <span>{{ index + 1 }}. {{item.type === 'TEXT'?'':'Inna odpowiedz'}}</span>
            <input name="answer" type="text" v-if="item.type === 'TEXT'" v-model="items[index].value"/>
        </div>
        <button class="btn btn-blue" @click="AddAnswer('TEXT')">Dodaj odpowiedz</button>
        <button class="btn btn-blue" @click="AddAnswer('OTHER')"  v-if="IsVisible">Dodaj odpowiedz inne</button>
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
