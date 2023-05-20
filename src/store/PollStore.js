import PollApi from "@/api/PollApi";
import {computed, ref} from "vue";

const polls = ref([]);
const question = computed(()=>{
    if(polls.value !== undefined){
        return polls.value.question;
    }
    else return undefined;
})

const add = async (question, type, answers) => {
    return PollApi.add(question, type, answers);
}

const fetch = async () => {
    return PollApi.get()
        .then(res => polls.value = res.data);
}

const deletePolls = (id) => {
    return PollApi.deletePolls(id);
}

const PollStore = {
    add,
    fetch,
    delete: deletePolls,
    polls,
    question
};

export default PollStore;