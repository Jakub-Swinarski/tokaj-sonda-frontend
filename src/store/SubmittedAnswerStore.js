import SubmittedAnswerApi from "@/api/SubmittedAnswerApi";
import {ref} from "vue";
 const SubmittedAnswers = ref([]);
const fetch = ()=>{
    return SubmittedAnswerApi.get()
        .then(res=>{
            SubmittedAnswers.value = res;
        });
}
const add =(answers)=>{
    return SubmittedAnswerApi.add(answers);
}
const SubmittedAnswerStore ={add,fetch, SubmittedAnswers}
export default SubmittedAnswerStore;