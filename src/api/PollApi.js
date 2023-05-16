import api from "@/api/api";

const AddPoll = (PollQuestion, IsMultiple, HasOther, Creator, Answer) => {
    return api.post("/add-poll", {
        PollName: PollQuestion,
        IsMultiple,
        HasOther,
        Creator,
        Answer
    });
}
const GetPoll = () => {
    return api.get('/get-polls');
}
const GetAnswer = () => {
    return api.get('/get-answers');
}
const DeleteAnswer = (id, type) => {
    if (type === 'normal') {
        return api.delete('/delete-answer', {
            data: {
                IDAnswer: id
            }
        });
    } else {
        return api.delete('/delete-answer-other', {
            data: {
                IDAnswer: id
            }
        });
    }
}
const GetAnswerToPoll = (IDPoll) => {
    return api.get('/get-answers-to-poll',{
        params:{
            IDPoll
        }
    })
}
const PollApi = {AddPoll, GetPoll, GetAnswer, DeleteAnswer,GetAnswerToPoll}

export default PollApi;