import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JogoDaMemoria from "../pages/JogoDaMemoria";
import Zoologico from "../pages/Zoologico";
import Tabuada from "../pages/Tabuada";
import Configuracoes from "../pages/Configuracoes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" exact element={<Home />} />
        <Route path="/jogo-da-memoria" element={<JogoDaMemoria />} />
        <Route path="/tabuada" element={<Tabuada />} />
        <Route path="/zoologico" element={<Zoologico />} />
        <Route path="/configuracoes" element={<Configuracoes />} />

      </Routes>
    </BrowserRouter>
  );
}
