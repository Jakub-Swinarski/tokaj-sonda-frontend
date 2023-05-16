import api from "@/api/api";

const GetUser = () => {
    return api.get("/user")
}

const Register = (Email, Password, Login, RepeatPassword) => {
    return api.post("/register", {
        Email,
        Password,
        Login,
        RepeatPassword
    })
}

const Login = (Email, Password) => {
    return api.post("/login", {
        Email,
        Password
    });
}
const Logout = () => {
    return api.post("/logout");
}
const DeleteUser = ( Password) => {
    return api.delete('/delete-user', {
        data:{
            Password
        }
    });
}

const AuthApi = {GetUser, Register, Logout, Login, DeleteUser};

export default AuthApi;