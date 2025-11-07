import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    //Pega os registros do array que esta no '@primeflix' e joga para o array 'minhalista'
    const minhaLista = localStorage.getItem("@primeflix");
    //Seta os filmes na const, caso estiver vazio ele cria vazio:
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function ExcluirFilme(id) {
    let filtroFilmes = filmes.filter((f) => {
      return f.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes favoritos</h1>

      {filmes.length === 0 && (
        <span>
          Você não possui nenhum filme adiciona a sua lista de favoritos! :(
        </span>
      )}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => ExcluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
