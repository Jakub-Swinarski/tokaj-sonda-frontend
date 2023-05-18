import api from "@/api/api";

const get = () => {
    return api.get('/submitted-answer')
        .then(res =>res.data);
}
const SubmittedAnswer = {get};
export default SubmittedAnswer;