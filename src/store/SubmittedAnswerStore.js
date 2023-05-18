import SubmittedAnswerApi from "@/api/SubmittedAnswerApi";
import {ref} from "vue";
 const SubmittedAnswers = ref([]);
const fetch = ()=>{
    return SubmittedAnswerApi.get()
        .then(res=>{
            SubmittedAnswers.value = res;

        });
}
const SubmittedAnswerStore ={fetch, SubmittedAnswers}
export default SubmittedAnswerStore;