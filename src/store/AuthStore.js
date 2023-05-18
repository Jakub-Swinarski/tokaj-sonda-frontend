import {ref} from "vue";
import AuthApi from "@/api/AuthApi";

const user = ref();

const userId = computed(() => {
    return (user.value !== undefined) ? user.value.id : undefined;
});

const username = computed(() => {
    return (user.value !== undefined) ? user.value.username : undefined
});

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
            userId.value = res.id;
            username.value = res.username;
        })
}

const register = (username, password, repeatPassword) => {
    return AuthApi.register(username, password, repeatPassword)
        .then(res => {
            userId.value = res.id;
            username.value = res.username;
        })
}

const logout = () => {
    return AuthApi.logout()
        .then(res => {
            userId.value = res.id;
            username.value = res.username;
            localStorage.removeItem("token");
        })
}
const deleteUser = (password) => {
    return AuthApi.deleteUser(password.value)
        .then(res => {
            username.value = res.username;
            localStorage.removeItem("token");
        })
}

const AuthStore = {userId, username, login, fetchUser, register, logout, token: tokenGetter, deleteUser};

export default AuthStore;