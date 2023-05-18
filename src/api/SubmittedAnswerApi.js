import api from "@/api/api";

const get = () => {
    return api.get('/submitted-answer');
}
const SubmittedAnswer = {get};
export default SubmittedAnswer;