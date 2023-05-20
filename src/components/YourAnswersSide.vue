<script setup>

import {computed, ref} from "vue";
import AnswerStore from "@/store/AnswerStore";


const PollAnswer = ref([]);

AnswerStore.fetch()
    .then((res) => res.map((element) => {
        if (element.strict !== null) {
            element.answer = element.strict;
        } else element.answer = element.other;
        return element;
    }))
    .then(res => PollAnswer.value = res)

const FetchAnswers = () => AnswerStore.fetch();

const Delete = ref();
Delete.value = 0;
const ErrorMessage = ref();
const DeleteAnswer = (id) => {
    AnswerStore.delete(id)
        .then(() => {
            Delete.value = 0;
            FetchAnswers();
        })
        .catch((error) => {
            ErrorMessage.value = error.response.data.message;
        })
}

const NowEditing = ref();
const NowEditingAnswers = ref([]);
const NowEditingValue = ref(); // sztywna albo 'other'
const NowEditingOtherValue = ref(); // wartość opcji inne

const EditAnswer = (answer) => {
    NowEditing.value = ``;
    console.log(answer.pollId);
    AnswerStore.fetchPossible(answer.pollId)
        .then(res => {
            NowEditingAnswers.value = res;

            if (answer.Type === "OTHER") {
                NowEditingValue.value = "OTHER";
                NowEditingOtherValue.value = answer.value;
            } else {
                NowEditingValue.value = answer.value;
                NowEditingOtherValue.value = undefined;
            }

            NowEditing.value = answer.pollId + '-' + answer.answer;
        });
}


FetchAnswers();
</script>
<template>
    <div class="poll">
        <div class="poll" v-for="(value, index) of PollAnswer" :key="index">
            <h1>{{ value.question }}</h1>
            <h2>{{ value.answer }}</h2>
            <div class="buttons">
                <button class="btn btn-blue" @click="Delete = `${value.pollId}-${value.answer}`">Usuń</button>
                <button class="btn btn-blue" @click="EditAnswer(value)">Edytuj</button>
            </div>
            <div class="delete" v-if="Delete === `${value.pollId}-${value.answer}`">
                <p class="text">Czy na pewno chcesz usunąć odpowiedź {{ value.answer }}</p>
                <p>{{ ErrorMessage }}</p>
                <div class="button-wrapper">
                    <button class="confirm btn btn-blue" @click="DeleteAnswer(value.pollId)">Tak</button>
                    <button class="cancel btn btn-blue" @click="Delete = 0">Nie</button>
                </div>
            </div>
            <div class="edit" v-if="NowEditing === `${value.pollId}-${value.answer}` && NowEditingAnswers !== undefined">
                <p>Edytujesz odpowiedź {{ value.question }}</p>
                <div v-for="(value, index) of NowEditingAnswers" :key="index">
                    <input type="radio" :value="value.Answer" name="possibleAnswer"
                           :id="`possibleAnswer-index-${index}`" v-model="NowEditingValue">
                    <label :for="`possibleAnswer-index-${index}`">{{ value.Answer }}</label>
                </div>
                <input type="radio" name="possibleAnswer" id="possibleAnswer" :value="answer.Type"
                       v-model="NowEditingValue">
                <label for="possibleAnswer">
                    <input type="text" name="possibleAnswer" placeholder="inna odpowiedź"
                           v-model="NowEditingOtherValue"/>
                </label>
                <div class="button-wrapper">
                    <button class="confirm btn btn-blue" @click="AcceptAnswer(value.IDPossibleAnswer)">Tak</button>
                    <button class="cancel btn btn-blue" @click="NowEditing === 0">Nie</button>
                </div>
            </div>
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

.delete {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) / 2);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--gray);
    padding: var(--spacing);
    border-radius: var(--spacing);
}

.delete p {
    background-color: var(--gray);
}

.delete .button-wrapper {
    display: flex;
    background-color: var(--gray);
    gap: var(--spacing);
}

</style>
