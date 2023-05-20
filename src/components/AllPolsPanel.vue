<script setup>
import PollStore from "@/store/PollStore";
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";
import {useRouter} from "vue-router";
import AnswerStore from "@/store/AnswerStore";

const option = ref();
const router = useRouter();
const answers = ref([]);
const pollId = ref();
const isLogged =(id)=>{
    if(AuthStore.userId.value !== undefined){
        option.value = id+'-logged';
        pollId.value = id;
        AnswerStore.fetchPossible(pollId.value)
            .then((res)=>{
                answers.value = res;
            });
    }else {
        option.value = id+'-notLogged';
    }
};
const login =()=>{
    router.push('/login');
}
const register = () =>{
    router.push('/register');
}
PollStore.fetchAll();

</script>

<template>
<div class="main" v-for="(value,index) of PollStore.allPolls.value" :key="index">
    <h2>{{value.question}}</h2>
    <button class="zagłosuj" @click="isLogged(value.id)">Zagłosuj</button>
    <div class="notLogged" v-if="option === `${value.id}-notLogged`">
        <h2>Aby odpowiedzieć na sondę proszę się zalogować lub zarejestrować w naszym serwisie</h2>
        <div class="buttons">
            <button class="login" @click="login">Zaloguj się</button>
            <button class="register" @click="register">Zarejestruj się</button>
        </div>
    </div>
    <div class="logged" v-if="option === `${value.id}-logged`">
        <p>Głosujesz w sondzie: {{value.question}}</p>
        <p>możliwe odpowiedzi:</p>
        <div class="possibleAnswers" v-for="(answer,index2) of answers">
            <input type="checkbox" name="answers" id="{{index2}}" v-if="value.type === 'MULTI_CHOOSE'">
            <input type="radio" name="answer" id="{{index2}}" v-if="value.type === 'SINGLE_CHOOSE'">
        </div>
    </div>
</div>
</template>


<style scoped>

</style>