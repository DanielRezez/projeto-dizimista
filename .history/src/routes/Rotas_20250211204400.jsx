import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Pagina_inicial from '../pages/Pagina_inicial';
import Gestao_dizimistas from '../pages/Gestao_dizimistas';
import Perfil from "../pages/Perfil";

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/pagina-inicial" element={<Pagina_inicial />}></Route>
                <Route path="/gestao-dizimistas" element={<Gestao_dizimistas />}></Route>
                <Route path="/perfil" element={<Perfil />}></Route>
            </Routes>
        </Router>
    );
};

export default Rotas;