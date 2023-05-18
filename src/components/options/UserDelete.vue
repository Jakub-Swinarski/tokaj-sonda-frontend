<script setup>
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";

const Delete = ref(0);
const password = ref()
const errorMessage =ref()

const DeleteUser =()=>{

        AuthStore.deleteUser(password)
            .then(()=>{
                Delete.value=0;
            }).catch((error) => {
                errorMessage.value = error.response.data.message;
            });



}
</script>
<template>
    <div class="user-wrapper">
        <h2 class="confirm-name"> Czy napewno chcesz usunąć konto</h2>
        <div><button class="delete btn btn-blue" @click="Delete = 1">Usuń</button></div>
    </div>
    <div class="delete-wrapper" v-if="Delete === 1">
        <p class="text">Aby usunąć konto podaj hasło.</p>
        <p>{{errorMessage}}</p>
        <input type="password" name="password" v-model="password" id="password" placeholder="Hasło">
        <div class="button-wrapper">
            <button class="confirm btn btn-blue" @click="DeleteUser">Potwierdzam</button>
            <button class="cancel btn btn-blue" @click="Delete = 0">Anuluj</button>
        </div>
    </div>
</template>

<style scoped>

.user-wrapper{
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
}
.delete-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--gray);
    padding: var(--spacing);
    border-radius: var(--spacing);
}
.button-wrapper{
    display: flex;
    flex-direction: row;
    background-color: var(--gray);
    gap: var(--spacing);
}

p {
    background-color: var(--gray);
}

#password {
    padding: calc(var(--spacing) / 2);
    border-radius: var(--spacing);
    border-width: 0;
}

</style>
