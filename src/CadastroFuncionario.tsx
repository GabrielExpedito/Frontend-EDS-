//import "./CadastroFuncionario.tsx";
import { useEffect, useState } from "react";
import "./App.css";

type Cargo = {
  cdCargo: number;
  nmCargo: string;
  dtCriacao: Date;
  salario: number;
};

type Funcionario = {
  nome: string;
  cpf: string;
  dtAdmissao: string;
  email: string;
  cargo: Cargo;
};

export default function CadastroFuncionario() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dtAdmissao: "",
    email: "",
    cdCargo: "",
  });

  console.log("Cargos no estado:", cargos);

  useEffect(() => {
    async function fetchCargos() {
      try {
        const res = await fetch("http://localhost:8080/api/Cargo");
        if (!res.ok) throw new Error("Erro ao buscar cargos");
        const data = await res.json();
        console.log("CARGOS CARREGADOS:", data); // <--- VERIFICAÇÃO
        setCargos(data);
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
      }
    }

    fetchCargos();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cargoSelecionado = cargos.find(
      (c) => c.cdCargo === parseInt(formData.cdCargo)
    );

    if (!cargoSelecionado) {
      alert("Cargo inválido!");
      return;
    }

    const funcionario: Funcionario = {
      nome: formData.nome,
      cpf: formData.cpf,
      dtAdmissao: formData.dtAdmissao,
      email: formData.email,
      cargo: cargoSelecionado,
    };

    try {
      const res = await fetch("http://localhost:8080/funcionarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario),
      });

      if (res.ok) {
        alert("Funcionário cadastrado com sucesso!");
        setFormData({
          nome: "",
          cpf: "",
          dtAdmissao: "",
          email: "",
          cdCargo: "",
        });
      } else {
        alert("Erro ao cadastrar funcionário.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na requisição.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Funcionário</h2>

      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <label>CPF:</label>
      <input
        type="text"
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        required
      />

      <label>Data de Admissão:</label>
      <input
        type="date"
        name="dtAdmissao"
        value={formData.dtAdmissao}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Cargo:</label>
      <select
        name="cdCargo"
        value={formData.cdCargo}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um cargo</option>
        {cargos.map((cargo) => (
          <option key={cargo.cdCargo} value={cargo.cdCargo}>
            {cargo.nmCargo}
          </option>
        ))}
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
