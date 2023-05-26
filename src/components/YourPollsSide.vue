<script setup>
import SubmittedAnswerStore from "@/store/SubmittedAnswerStore";
import PollStore from "@/store/PollStore";
import {computed, ref} from "vue";
import AnswerStore from "@/store/AnswerStore";

const deleteBtn = ref();
const editBtn = ref();
const editedValues = ref({});
const answers = ref([]);
const isOther = ref();
const strictAnswersData = ref();
const newStrictAnswers = ref();
isOther.value = 1;
const Delete = (id) => {
    PollStore.delete(id);
}
PollStore.fetch()

const questions = computed(() => {
    return PollStore.polls.value.map((element) => {
        return {
            'question': element.question,
            'id': element.id
        };
    })
})
const edit = async (question, index, pollId) => {
    answers.value = await AnswerStore.fetchPossible(pollId);
    editBtn.value = `${question}-${index}-edit`
    editedValues.value.question = question;
}
const addAnswer = (type) => {
    if (type === 'STRICT') {
        answers.value.push({
            value: '',
            type
        });
    } else {
        answers.value.push(
            type
        );
    }

}
const editPoll = (pollId, question, answersData) => {
    strictAnswersData.value = answersData.map((element) => {
        if (element.id !== undefined) {
            return {
                value: element.value,
                id: element.id,
            }
        }
    });
    newStrictAnswers.value = answersData.map((element)=>{
        if (element.id === undefined) {
            return {
                value: element.value,
                type: element.type,
            }
        }
    });
    console.log(strictAnswersData.value,newStrictAnswers.value)
    PollStore.edit(pollId,question,strictAnswersData.value,newStrictAnswers.value)

}

</script>
<template>
    <div class="poll" v-for="(value, index) of questions" :key="index">
        <h2>{{ value.question }}</h2>
        <div class="buttons">
            <button class="delete btn btn-blue" @click="deleteBtn = `${value.question}-${index}-delete`">Usuń</button>
            <button class="edit btn btn-blue" @click="edit(value.question,index,value.id)">Edytuj</button>
        </div>
        <div class="delete-poll" v-if="deleteBtn === `${value.question}-${index}-delete`">
            <p>Czy chcesz usunąć sondę "{{ value.question }}"</p>
            <button @click="Delete(value.id)">Tak</button>
            <button @click="deleteBtn = 0">Anuluj</button>
        </div>
        <div class="edit-poll" v-if="editBtn === `${value.question}-${index}-edit`">
            <p>Edytujesz sondę "{{ value.question }}"</p>
            <label for="name">Nazwa:</label>
            <input type="text" name="name" id="name" v-model="editedValues.question">
            <p>Możliwe odpowiedzi:</p>
            <div class="radio-answers"  v-for="(valueOfAnswers,indexOfAnswers) of answers">
                <label :for="indexOfAnswers">{{ indexOfAnswers + 1 }}. </label>
                <input type="text" :name="indexOfAnswers" v-model="valueOfAnswers.value"
                       v-if="valueOfAnswers.value !== null">
                <label v-if="valueOfAnswers.value === null">Odpowiedź inna {{ isOther = 0 }}</label>
            </div>
            <div>
                <button @click="addAnswer('STRICT')">Dodaj odpowiedź</button>
                <button v-if="isOther" @click="addAnswer('OTHER')">Dodaj odpowiedź inne</button>
                <button @click="editPoll(value.id,editedValues.question,answers)">Aktualizuj sondę</button>
                <button @click="editBtn=0">Anuluj</button>
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

</style>