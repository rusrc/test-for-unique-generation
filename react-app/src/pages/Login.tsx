import { FormEvent, useState } from "react"
// import axios from "../services/axios";
import useAuth from "../hooks/UserAuth";

const Login: React.FC = () => {

    // setAuth - задает стейт глобально
    const { setAuth } = useAuth();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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

            setAuth({
                userName: 'Username',
                roles: ['user', '18+'],
                password: '123456',
                accessToken: 'e8e9e04d-2ec3-4a10-a8c0-f948a89bf1b7'
            });
            setSuccess(true);
            console.log("success", success);
        } catch (error) {
            // setError
        }
    }

    return (

        <section>
            {
                success ?
                    (<div>Вы зарегистрированны</div>)
                    :
                    (<form onSubmit={onSubmitHandle}>

                        <label htmlFor="userName">User name: </label>
                        <input id="username" type="text" autoComplete="off" required value={userName} onChange={(e) => setUserName(e.target.value)} />

                        <br />
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} />

                        {errMsg ? errMsg : ""}

                        <br />
                        <button type="submit">Войти</button>
                        <div>
                            <a href="register">Регистрация</a>
                        </div>
                    </form>)
            }

        </section>
    )
}

export default Login;
