import PollApi from "@/api/PollApi";
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";

const PollQuestion = ref([]);
const PollAnswer = ref([]);

const AddPoll = (PollQuestion, IsMultiple, HasOther, Answer) => {
    return PollApi.AddPoll(PollQuestion, IsMultiple, HasOther, AuthStore.UserId.value, Answer)
}

const GetPoll = () => {
    return PollApi.GetPoll()
        .then(res => {
            PollQuestion.value = res.data;
        });
}

const GetAnswer = () => {
    return PollApi.GetAnswer()
        .then(res => {
            PollAnswer.value = res.data;
        })
}

const DeleteAnswer = (id, type)=>{
    return PollApi.DeleteAnswer(id, type)
        .then(() => GetAnswer());
}

const GetAnswerToPoll=(IDPoll)=>{
    return PollApi.GetAnswerToPoll(IDPoll);
}

const PollStore = {AddPoll, GetPoll, PollQuestion, GetAnswer, PollAnswer,DeleteAnswer,GetAnswerToPoll};
export default PollStore;