import PollApi from "@/api/PollApi";
import {ref} from "vue";

const polls = ref([]);

const add = async (question, type, answers) => {
    return PollApi.add(question, type, answers);
}

const fetch = async () => {
    return PollApi.get()
        .then(res => polls.value = res);
}

const deletePolls = (id) => {
    return PollApi.deletePolls(id);
}

const PollStore = {
    add,
    fetch,
    delete: deletePolls,
    polls
};

export default PollStore;