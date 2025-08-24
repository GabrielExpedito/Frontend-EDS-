import { useState } from "react";
import "./App.css";

export default function CadastroCargo() {
  const [formData, setFormData] = useState({
    nmCargo: "",
    salario: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Monta objeto no formato que o backend espera
    const cargo = {
      nmCargo: formData.nmCargo,
      salario: parseFloat(formData.salario),
      dtCriacao: new Date().toISOString(), // ISO 8601 → compatível com @Temporal no backend
    };

    try {
      const res = await fetch("http://localhost:8080/api/Cargo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cargo),
      });

      if (res.ok) {
        alert("Cargo cadastrado com sucesso!");
        setFormData({ nmCargo: "", salario: "" });
      } else {
        const errorText = await res.text();
        alert("Erro ao cadastrar cargo: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Erro na requisição.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-cargo">
      <h2>Cadastro de Cargo</h2>

      <label>Nome do Cargo:</label>
      <input
        type="text"
        name="nmCargo"
        value={formData.nmCargo}
        onChange={handleChange}
        required
      />

      <label>Salário:</label>
      <input
        type="number"
        name="salario"
        step="0.01"
        value={formData.salario}
        onChange={handleChange}
        required
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
