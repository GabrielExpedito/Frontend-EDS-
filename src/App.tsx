// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CadastroFuncionario from "./CadastroFuncionario";
import CadastroCargo from "./CadastroCargo";
import logoEDS from "./assets/logo.png";

// Tela inicial de exemplo
function TelaInicial() {
  return (
    <div className="home-container">
      <img src={logoEDS} alt="Logo EDS" className="logo" />
      <h2>Bem-vindo à EDS</h2>
      <p>Software de controle de processos internos</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h3>Menu</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/cadastro-funcionario">Funcionário</Link></li>
            <li><Link to="/cadastro-cargo">Cargo</Link></li>
          </ul>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TelaInicial />} />
            <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
            <Route path="/cadastro-cargo" element={<CadastroCargo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
