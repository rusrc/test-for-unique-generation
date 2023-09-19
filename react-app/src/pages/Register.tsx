import { useRef, useState, useEffect, FormEvent } from "react";
import axios from "../services/axios";

const Register: React.FC = () => {

    // 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdult, setIsAdult] = useState(false)

    // Ошибки
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Хуки на изменение состояния
    useEffect(() => {
        console.log(userName);
    }, [userName]);

    useEffect(() => {
        if (password && password.length <= 3) {
            let msg = "Слишком короткий пароль";
            console.log(msg);
            setErrMsg(msg)
        } else {
            setErrMsg("");
        }
    }, [password]);

    useEffect(() => { console.log(isAdult); }, [isAdult]);

    const onSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO POST If good set success
        try {
            const response = await axios.post("/register", JSON.stringify({ userName, password, isAdult }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            // TODO check data
            response.data;



            setSuccess(true);
        } catch (error) {
            // setError
        }

    };

    return (
        <section className="container">
            <div className="row justify-content-center">
                <form onSubmit={onSubmitHandle} className="col-sm-6 text-white pt-5">
                    <fieldset>
                        <legend>Форма регистрации</legend>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Ваше имя</label>
                            <input className="form-control bg-dark text-white" id="username" type="text" autoComplete="off" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Укажите пароль</label>
                            <input className="form-control bg-dark text-white" id="password" type="password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small><span className="text-danger"> {errMsg ? errMsg : ""}</span></small>
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="18" onChange={() => { setIsAdult(!isAdult) }} />
                            <label className="form-check-label" htmlFor="18">Мне 18+ лет</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>

                    </fieldset>
                </form>
            </div>

        </section>
    );
}

export default Register;

