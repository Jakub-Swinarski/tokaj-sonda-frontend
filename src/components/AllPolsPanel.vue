<script setup>
import PollStore from "@/store/PollStore";
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";
import {useRouter} from "vue-router";
import AnswerStore from "@/store/AnswerStore";
import SubmittedAnswerStore from "@/store/SubmittedAnswerStore";

const option = ref();
const router = useRouter();
const answers = ref([]);

const newAnswerIds = ref([]);
const otherAnswerValue = ref();

const isLogged = (id) => {
    if (AuthStore.userId.value !== undefined) {
        option.value = id + '-logged';
        AnswerStore.fetchPossible(id)
            .then((res) => {
                answers.value = res;
            });
    } else {
        option.value = id + '-notLogged';
    }
};

const input = (poll, answer) => {
    if (poll.type === "MULTI_CHOOSE") {
        const answerIndex = newAnswerIds.value.findIndex(newAnswer => newAnswer === answer.id);

        if (answerIndex !== -1) {
            newAnswerIds.value.splice(answerIndex, 1);
        } else {
            newAnswerIds.value.push(answer.id);
        }
    } else {
        newAnswerIds.value = [answer.id];
    }
}

const answer = () => {
    const otherAnswer = answers.value.find(answer => answer.type === "OTHER");

    SubmittedAnswerStore.add(newAnswerIds.value.map(newAnswer => {
        if (otherAnswer !== undefined) {
            if (otherAnswer.id === newAnswer) {
                return { id: newAnswer, value: otherAnswerValue.value }
            }
        }

        return { id: newAnswer };
    }));
}

PollStore.fetchAll();
</script>

<template>
    <div class="main" v-for="(poll,pollIndex) of PollStore.allPolls.value" :key="pollIndex">
        <h2>{{ poll.question }}</h2>
        <button class="zagłosuj" @click="isLogged(poll.id)">Zagłosuj</button>
        <div class="notLogged" v-if="option === `${poll.id}-notLogged`">
            <h2>Aby odpowiedzieć na sondę proszę się zalogować lub zarejestrować w naszym serwisie</h2>
            <div class="buttons">
                <button class="login" @click="router.push('/login')">Zaloguj się</button>
                <button class="register" @click="router.push('/register')">Zarejestruj się</button>
            </div>
        </div>
        <div class="logged" v-if="option === `${poll.id}-logged`">
            <p>Głosujesz w sondzie: {{ poll.question }}</p>
            <p>możliwe odpowiedzi:</p>
            <div class="possibleAnswers" v-for="(answer,answerIndex) of answers">
                <input type="checkbox"
                       name="answers"
                       :id="`${answerIndex}-answer`"
                       v-if="poll.type === 'MULTI_CHOOSE'"
                       @input="input(poll, answer)"
                />
                <label for="answers" v-if="poll.type === 'MULTI_CHOOSE'">{{ answer.value }}</label>

                <input type="radio"
                       name="answer"
                       :id="`${answerIndex}-answer`"
                       v-if="poll.type === 'SINGLE_CHOOSE'"
                       :value="answer.id"
                       @input="input(poll, answer)"
                />
                <label for="answer" v-if="poll.type === 'SINGLE_CHOOSE'">{{ answer.value }}</label>

                <input type="text" name="answer" :id="`${answerIndex}-answer`" v-if="answer.type === 'OTHER'" v-model="otherAnswerValue">
            </div>
            <button class="odpowiedz" @click="answer">Odpowiedz</button>
        </div>
    </div>
</template>

<style scoped>

</style>