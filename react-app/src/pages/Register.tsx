import { useRef, useState, useEffect, FormEvent } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {

    // 
    const [name, setUserName] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('');

    const [is18, setIsAdult] = useState(false)

    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(name);
    }, [name]);

    useEffect(() => {
        if (password && password.length <= 3) {
            let msg = "Слишком короткий пароль";
            console.log(msg);
            setPasswordErr(msg)
        } else {
            setPasswordErr("");
        }
    }, [password]);

    useEffect(() => {
        if ((password && passwordConfirm) && password != passwordConfirm) {
            setPasswordConfirmErr("Пароль не совпадает");
        } else {
            setPasswordConfirmErr("");
        }
    }, [password, passwordConfirm]);

    useEffect(() => { console.log(is18); }, [is18]);

    const onSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {
            const response = await axios.post("/Registration", JSON.stringify({ name, password, is18 }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            navigate("/login")
        } catch (error) {
            setErrMsg(error?.response?.data + " | " + error?.message);
        }
    };

    return (
        <section className="container">
            <div className="row justify-content-center">
                <form onSubmit={onSubmitHandle} className="col-sm-6 text-white pt-5">
                    <fieldset>
                        <legend>Форма регистрации</legend>
                        <small><span className="text-danger"> {errMsg ? errMsg : ""}</span></small>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Ваше имя</label>
                            <input className="form-control bg-dark text-white" id="username" type="text" autoComplete="off" required value={name} onChange={(e) => setUserName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Укажите пароль</label>
                            <input className="form-control bg-dark text-white" id="password" type="password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small><span className="text-danger"> {passwordErr ? passwordErr : ""}</span></small>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordConfirm" className="form-label">Повторите пароль</label>
                            <input className="form-control bg-dark text-white" id="passwordConfirm" type="password" autoComplete="off" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                            <small><span className="text-danger"> {passwordConfirmErr ? passwordConfirmErr : ""}</span></small>
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="18" onChange={() => { setIsAdult(!is18) }} />
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

