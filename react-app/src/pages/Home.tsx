import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../providers/AuthProvider";


const Home: React.FC = () => {

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="display-1 text-center text-white">Главная</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home