import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import RequiredAuth from './pages/RequireAuth';
import Layout from './pages/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForOther from './pages/ForOther';
import ForLimited from './pages/ForLimited';
import Unauthorized from './pages/Unauthorized';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* Protected */}
        <Route element={<RequiredAuth allowedRoles={["other"]} />}>
          <Route path="/for-other" element={<ForOther />} />
        </Route>
        <Route element={<RequiredAuth allowedRoles={["18+"]} />}>
          <Route path="/for-limited" element={<ForLimited />} />
        </Route>

        {/* Default */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
