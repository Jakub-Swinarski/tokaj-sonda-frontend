import AnswerApi from "@/api/AnswerApi";
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";

const answers = ref([]);

const fetch = (pollId) => {
    return AnswerApi.get(pollId)
        .then(res => answers.value = res);
}

const edit = (pollId, answers) => {
    return AnswerApi.edit(AuthStore.userId.value, pollId, answers);
}

const deleteAnswer = (id) => {
    return AnswerApi.deleteAnswer(id);
}

const AnswerStore = {
    fetch,
    edit,
    delete: deleteAnswer
}

export default AnswerStore;