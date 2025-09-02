import { useEffect, useState } from "react";
import "./App.css";

type Cargo = {
  cdCargo: number;
  salario: number;
  nmCargo: string;
  dtCriacao: string;
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
  nmEmpresa: string;
  nmContrato: number;
};

type Funcionario = {
  nre: number;
  nome: string;
  cpf: string;
  dtAdmissao: string;
  cargo: Cargo;
  salario: number;
  email: string;
  endereco: Endereco;
  terceirizacao: Terceirizacao;
};

type Ferias = {
  id: number;
  funcionario: Funcionario;
  dtInicio: string;
  dtFim: string;
  aprovado: boolean;
};

export default function RelatorioFerias() {
  const [ferias, setFerias] = useState<Ferias[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFerias() {
      try {
        const res = await fetch("http://localhost:8080/api/ferias/futuras");
        if (res.ok) {
          const data: Ferias[] = await res.json();
          setFerias(data);
        } else {
          console.error("Erro ao buscar relatório de férias");
        }
      } catch (err) {
        console.error("Erro na requisição", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFerias();
  }, []);

  if (loading) {
    return <p>Carregando relatório de férias...</p>;
  }

  return (
    <div className="relatorio-ferias">
      <h2>Relatório de Férias</h2>
      <table>
        <thead>
          <tr>
            <th>Funcionário</th>
            <th>Cargo</th>
            <th>Período</th>
            <th>Aprovado</th>
          </tr>
        </thead>
        <tbody>
          {ferias.map((f) => (
            <tr key={f.id}>
              <td>{f.funcionario.nome}</td>
              <td>{f.funcionario.cargo.nmCargo}</td>
              <td>
                {new Date(f.dtInicio).toLocaleDateString()} -{" "}
                {new Date(f.dtFim).toLocaleDateString()}
              </td>
              <td>
                <span
                  className={`status ${
                    f.aprovado ? "status-aprovado" : "status-reprovado"
                  }`}
                >
                  {f.aprovado ? "Aprovado" : "Não Aprovado"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
