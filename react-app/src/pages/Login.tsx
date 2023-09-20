import { FormEvent, useState } from "react"
// import axios from "../services/axios";
import useAuth from "../hooks/UserAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    // setAuth - задает стейт глобально
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // Общие ошибки
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // TODO 
    // 1. Отправить POST запрос на /login 
    // 2. Получить ответ {roles: [], token: string}
    // 3. Сохранить полученные данные в глобальном стейте auth, через setAuth({roles:[], accessToken:string}, ...)

    const onSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO POST If good set success
        try {
            console.log("success", success);
            // const response = await axios.post("/register", JSON.stringify({ userName, password }),
            //     {
            //         headers: { 'Content-Type': 'application/json' }
            //     });
            // response.data;
            const user1 = {
                userName: 'test1',
                roles: ['other', '18+'],
                password: '123456',
                accessToken: 'e8e9e04d-2ec3-4a10-a8c0-f948a89bf1b7'
            };
            const user2 = {
                userName: 'test2',
                roles: ['other'],
                password: '123456',
                accessToken: 'e8e9e04d-2ec3-4a10-a8c0-f948a89bf1b8'
            };

            if (userName == "test1")
                localStorage.setItem("user", JSON.stringify(user1));

            if (userName == "test2")
                localStorage.setItem("user", JSON.stringify(user2));

            // Если всё окей переводим по адресу во from
            // setAuth()
            console.log("success", success);
            navigate(from, { replace: true });
        } catch (error) {
            // setError
        }
    }

    return (
        <section className="container">
            <div className="row justify-content-center">
                <form onSubmit={onSubmitHandle} className="col-sm-6 text-white pt-5">
                    <fieldset>
                        <legend>Форма авторизация</legend>
                        <small><span className="text-danger"> {errMsg ? errMsg : ""}</span></small>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Ваше имя</label>
                            <input className="form-control bg-dark text-white" id="username" type="text" autoComplete="off" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Укажите пароль</label>
                            <input className="form-control bg-dark text-white" id="password" type="password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Войти</button>
                        <div className="my-3">
                            <a href="register">Регистрация</a>
                        </div>
                        
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default Login;
