import { useEffect, useState } from "react";
import "./App.css";

type Cargo = {
  cdCargo: number;
  nmCargo: string;
};

type Endereco = {
  id: number;
  rua: string;
  cep: string;
  bairro: string;
  nr: number;
};

type Terceirizacao = {
  cdTerceirizacao: number;
  nmTerceirizacao: string;
};

export default function CadastroFuncionario() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [terceirizacoes, setTerceirizacoes] = useState<Terceirizacao[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dtAdmissao: "",
    email: "",
    cdCargo: "",
    idEndereco: "",
    cdTerceirizacao: "",
  });

  // Buscar dados iniciais
  useEffect(() => {
    async function fetchData() {
      try {
        const [cargosRes, enderecosRes, terceirizacoesRes] = await Promise.all([
          fetch("http://localhost:8080/api/Cargo"),
          fetch("http://localhost:8080/api/Endereco"),
          fetch("http://localhost:8080/api/Terceirizacao"),
        ]);

        if (!cargosRes.ok || !enderecosRes.ok || !terceirizacoesRes.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const [cargosData, enderecosData, terceirizacoesData] =
          await Promise.all([
            cargosRes.json(),
            enderecosRes.json(),
            terceirizacoesRes.json(),
          ]);

        setCargos(cargosData);
        setEnderecos(enderecosData);
        setTerceirizacoes(terceirizacoesData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    fetchData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const funcionario = {
      nome: formData.nome,
      cpf: formData.cpf,
      dtAdmissao: formData.dtAdmissao,
      email: formData.email,
      cargo: { cdCargo: parseInt(formData.cdCargo) },
      endereco: { id: parseInt(formData.idEndereco) },
      terceirizacao: { cdTerceirizacao: parseInt(formData.cdTerceirizacao) },
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
          idEndereco: "",
          cdTerceirizacao: "",
        });
      } else {
        const errorText = await res.text();
        alert("Erro ao cadastrar funcionário: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Erro na requisição.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-funcionario">
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

      <label>Endereço:</label>
      <select
        name="idEndereco"
        value={formData.idEndereco}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um endereço</option>
        {enderecos.map((end) => (
          <option key={end.id} value={end.id}>
            {end.rua}, {end.nr} - {end.bairro}
          </option>
        ))}
      </select>

      <label>Terceirização:</label>
      <select
        name="cdTerceirizacao"
        value={formData.cdTerceirizacao}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma terceirização</option>
        {terceirizacoes.map((t) => (
          <option key={t.cdTerceirizacao} value={t.cdTerceirizacao}>
            {t.nmTerceirizacao}
          </option>
        ))}
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
