import { Outlet, useNavigate } from "react-router-dom"

const Layout: React.FC = () => {

    const navigate = useNavigate();
    
    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use href="#bootstrap"></use></svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="nav-link px-2 text-white">Главная</a></li>
                            <li><a href="for-other" className="nav-link px-2 text-white">Для всех</a></li>
                            <li><a href="for-limited" className="nav-link px-2 text-white">18+</a></li>
                        </ul>

                        <div className="text-end">
                            <a href="login" type="button" className="btn btn-outline-light me-2">Войти</a>
                            <a href="register" type="button" className="btn btn-warning">Регистрация</a>
                            <a href="register" type="button" className="link-light ps-3" onClick={(e) => { e.preventDefault(); localStorage.clear(); navigate("/login"); }}>Выход</a>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout