import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import RequiredAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* Projected */}
        <Route element={<RequiredAuth />}>
          {/* Default home path if not loging */}
          <Route path="/" element={<Home />} />
        </Route>

        {/* Default */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
