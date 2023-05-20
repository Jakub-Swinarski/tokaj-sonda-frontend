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
const edit = (id, question, type) => {
    return api.put('/polls', {
        id,
        question,
        type
    });
}
const allPolls = () =>{
    return api.get('/polls/all')
}
const deletePolls = (id) => {
    return api.delete('/polls', {
        data: {
            id
        }
    });
}

const PollApi = {add, get, edit, deletePolls, allPolls}

export default PollApi;