import api from "@/api/api";

const get = (pollId) => {
    return api.get('/answers', {
        data: {
            pollId
        }
    }).then(res => res.data);
}
const edit = (userId, pollId, answers) => {
    return api.put('/answers', {
        userId,
        pollId,
        answers
    }).then(res => res.data);
}
const deleteAnswer = (id) => {
    return api.delete('/answers', {
        data: {
            id
        }
    }).then(res => res.data);
}
const AnswerApi = {get, edit, deleteAnswer};
export default AnswerApi;