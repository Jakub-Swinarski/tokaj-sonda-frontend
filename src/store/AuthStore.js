import {computed, ref, watch} from "vue";
import AuthApi from "@/api/AuthApi";

const user = ref();

const userId = ref();
const username = ref();

watch(user, (val) => {
    console.log(val);
    if (val !== undefined) {
        userId.value = val.id;
        username.value = val.username;
    }   
}, { deep: true });

const token = ref();

const tokenGetter = computed(() => token.value);

if (localStorage.getItem("token") !== null) {
    token.value = localStorage.getItem("token");
}

const login = (username, password) => {
    return AuthApi.login(username, password)
        .then(res => {
            token.value = res.token;
            localStorage.setItem("token", res.token);
            user.value = res.user;
        });
}

const fetchUser = () => {
    return AuthApi.get()
        .then(res => {
            user.value = res;
        })
}

const register = (username, password, repeatPassword) => {
    return AuthApi.register(username, password, repeatPassword)
        .then(res => {
            user.value = res;
        })
}

const logout = () => {
    return AuthApi.logout()
        .then(res => {
            user.value = res.user;
            localStorage.removeItem("token");
        })
}
const deleteUser = (password) => {
    return AuthApi.deleteUser(password.value)
        .then(res => {
            user.value = res.user;
            localStorage.removeItem("token");
        })
}

const AuthStore = {userId, username, login, fetchUser, register, logout, token: tokenGetter, deleteUser};

export default AuthStore;