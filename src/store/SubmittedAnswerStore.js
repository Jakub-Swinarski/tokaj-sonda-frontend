import SubmittedAnswersApi from "@/api/SubmittedAnswerApi";

const fetch = ()=>{
    return SubmittedAnswersApi.get();
}
const SubmittedAnswerStore ={fetch}
export default SubmittedAnswerStore;