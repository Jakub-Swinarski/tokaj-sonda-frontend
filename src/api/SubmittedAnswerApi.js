import api from "@/api/api";

const get = () => {
    return api.get('/submitted-answer')
        .then(res =>res.data);
}
const add =(answers)=>{
    return api.post('/submitted-answer',{
        answers
    })
        .then(res =>res.data);
}
const SubmittedAnswer = {get ,add};
export default SubmittedAnswer;