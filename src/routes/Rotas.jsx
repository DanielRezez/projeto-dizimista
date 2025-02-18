import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Pagina_inicial from '../pages/Pagina_inicial';
import Gestao_dizimistas from '../pages/Gestao_dizimistas';
import PrivateRoute from "./PrivateRoute";
import Perfil from "../pages/Perfil";

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/pagina-inicial" element={<Pagina_inicial />}></Route>
                    <Route path="/gestao-dizimistas" element={<Gestao_dizimistas />}></Route>
                    <Route path="/perfil" element={<Perfil />}></Route>
                </Route>
            </Routes>
        </Router> 
    );
};

export default Rotas;