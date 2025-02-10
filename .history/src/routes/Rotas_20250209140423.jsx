import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Pagina_inicial from '../pages/Pagina_inicial';
import Gestao_dizimistas from '../pages/Gestao_dizimistas';

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/pagina-inicial" element={<Pagina_inicial />}></Route>
                <Route path="/gestaao-dizimistas" element={<Gestao_dizimistas />}></Route>
            </Routes>
        </Router>
    );
};

export default Rotas();