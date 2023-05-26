import api from "@/api/api";

const add = (question, type, answers) => {
    return api.post("/polls", {
        question,
        type,
        answers
    });
}
const get = () => {
    return api.get('/polls');
}
const getAll = () => {
    return api.get('/polls/polls');
}
const edit = (id, question, strictAnswersData, newStrictAnswers) => {
    return api.put('/polls', {
        id,
        question,
        'strict-answers-data': strictAnswersData,
        'new-strict-answers': newStrictAnswers
    });
}
const deletePolls = (id) => {
    return api.delete('/polls', {
        params: {
            id
        }
    });
}

const PollApi = {add, get, edit, deletePolls, getAll}

export default PollApi;