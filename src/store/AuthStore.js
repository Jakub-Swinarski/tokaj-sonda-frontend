import {ref} from "vue";
import AuthApi from "@/api/AuthApi";

const UserId = ref();
const UserName = ref();

const Token = ref();

if (localStorage.getItem("Token") !== null) {
    Token.value = localStorage.getItem("Token");
}

const Login = (Email, Password) => {
    return AuthApi.Login(Email, Password)
        .then(res => {
            Token.value = res.data.Token;
            localStorage.setItem("Token", res.data.Token);
            UserId.value = res.data.User.IDUser;
            UserName.value = res.data.User.Login;
        });
}

const FetchUser = () => {
    return AuthApi.GetUser()
        .then(res => {
            UserId.value = res.data.IDUser;
            UserName.value = res.data.Login;
        })
}

const Register = (Login, Email, Password, RepeatPassword) => {
    return AuthApi.Register(Email, Password, Login, RepeatPassword)
        .then(res => {
            UserId.value = res.data.IDUser;
            UserName.value = res.data.Login;
        })
}

const Logout = () => {
    return AuthApi.Logout()
        .then(res => {
            UserId.value = res.data.IDUser;
            UserName.value = res.data.Login;
            localStorage.removeItem("Token");
        })
}
const DeleteUser =(Password)=>{
    return AuthApi.DeleteUser(Password.value)
        .then(res=>{
            UserName.value = res.data.Login;
            localStorage.removeItem("Token");
        })
}

const AuthStore = {UserId, UserName, Login, FetchUser, Register, Logout, Token,DeleteUser};

export default AuthStore;