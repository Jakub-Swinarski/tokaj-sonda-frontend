import PollApi from "@/api/PollApi";
import {computed, ref} from "vue";

const polls = ref([]);
const allPolls = ref([]);
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
const fetchAll = async ()=>{
    return PollApi.getAll()
        .then(res => allPolls.value = res.data)
}
const edit = (id, question, strictAnswersData, newStrictAnswers)=>{
    return PollApi.edit(
        id,
        question,
        strictAnswersData,
        newStrictAnswers
    )
}

const deletePolls = (id) => {
    return PollApi.deletePolls(id);
}

const PollStore = {
    add,
    fetch,
    fetchAll,
    edit,
    delete: deletePolls,
    polls,
    question,
    allPolls
};

export default PollStore;