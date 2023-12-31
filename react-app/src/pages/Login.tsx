import { FormEvent, useState } from "react"
import axios from "../services/axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const onSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post("/Authorize", JSON.stringify({ name, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            localStorage.setItem("user", JSON.stringify(response.data));

            navigate(from, { replace: true });
        } catch (error) {
            setErrMsg(error?.response?.data + " | " + error?.message);
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
                            <input className="form-control bg-dark text-white" id="username" type="text" autoComplete="off" required value={name} onChange={(e) => setUserName(e.target.value)} />
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
