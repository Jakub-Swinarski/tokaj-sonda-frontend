<script setup>
import PollStore from "@/store/PollStore";
import {computed, ref} from "vue";
import AnswerStore from "@/store/AnswerStore";

const PollAnswer = computed(() => {
    return PollStore.PollAnswer.value.map(Obj => {
        const result = [];

        if (Obj.Answer !== undefined) {
            result.push({
                ID: Obj.IDPossibleAnswer,
                Value: Obj.Answer,
                Type: "normal",
                Poll: Obj.Poll,
                IDPoll: Obj.IDPoll
            })
        }
        if (Obj.AnswerText !== undefined) {
            result.push({
                ID: Obj.IDAnswer,
                Value: Obj.AnswerText,
                Type: "other",
                Poll: Obj.Poll,
                IDPoll: Obj.IDPoll
            });
        }
        return result;
    });
})

const FetchAnswers = () => AnswerStore.fetch();

const Delete = ref();
const ErrorMessage = ref();
const DeleteAnswer = (id, type) => {
    AnswerStore.delete(id, type)
        .then(() => {
            Delete.value = 0;
            FetchAnswers();
        })
        .catch((error) => {
            ErrorMessage.value = error.response.data.message;
        })
}

const NowEditing = ref();
const NowEditingAnswers = ref();
const NowEditingValue = ref(); // sztywna albo 'other'
const NowEditingOtherValue = ref(); // wartość opcji inne

const EditAnswer = (answer) => {
    NowEditing.value = ``;
    PollStore.GetAnswerToPoll(answer.IDPoll)
        .then(res => {
            NowEditingAnswers.value = res.data;

            if (answer.Type === "other") {
                NowEditingValue.value = "other";
                NowEditingOtherValue.value = answer.Value;
            } else {
                NowEditingValue.value = answer.Value;
                NowEditingOtherValue.value = undefined;
            }

            NowEditing.value = answer.ID + '-' + answer.Type;
        });
}




FetchAnswers();
</script>
<template>
    <div class="poll" v-for="(value, index) of PollAnswer" :key="index">
        <div class="poll" v-for="answer of value">
            <h1>{{ answer.Poll }}</h1>
            <h2>{{ answer.Value }}</h2>
            <div class="buttons">
                <button class="btn btn-blue" @click="Delete = `${answer.ID}-${answer.Type}`">Usuń</button>
                <button class="btn btn-blue" @click="EditAnswer(answer)">Edytuj
                </button>
            </div>
            <div class="delete" v-if="Delete === `${answer.ID}-${answer.Type}`">
                <p class="text">Czy na pewno chcesz usunąć odpowiedź {{ answer.Value }}</p>
                <p>{{ ErrorMessage }}</p>
                <div class="button-wrapper">
                    <button class="confirm btn btn-blue" @click="DeleteAnswer(answer.ID, answer.Type)">Tak</button>
                    <button class="cancel btn btn-blue" @click="Delete = 0">Nie</button>
                </div>
            </div>
            <div class="edit" v-if="NowEditing === `${answer.ID}-${answer.Type}` && NowEditingAnswers !== undefined">
                <p>Edytujesz odpowiedź {{ answer.Value }}</p>
                <div v-for="(value, index) of NowEditingAnswers" :key="index">
                    <input type="radio" :value="value.Answer" name="possibleAnswer" :id="`possibleAnswer-index-${index}`" v-model="NowEditingValue">
                    <label :for="`possibleAnswer-index-${index}`" >{{ value.Answer }}</label>
                </div>
                <input type="radio" name="possibleAnswer" id="possibleAnswer" :value="answer.Type" v-model="NowEditingValue">
                <label for="possibleAnswer">
                    <input type="text" name="possibleAnswer" placeholder="inna odpowiedź" v-model="NowEditingOtherValue" />
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
