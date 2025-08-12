// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CadastroFuncionario from "./CadastroFuncionario";

// Telas de exemplo
function TelaInicial() {
  return <h2>Tela Inicial</h2>;
}

function CadastroCargo() {
  return (
    <div className="form-container">
      <h2>Cadastro de Cargo</h2>
      {/* Adicione o componente de cargo aqui futuramente */}
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
