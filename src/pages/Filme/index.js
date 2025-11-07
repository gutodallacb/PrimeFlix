import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import "./filme-info.css";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "ee22d5245f9a2a4d3332d3c0422c55b1",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [navigate, id]);

  function SalvarFilme() {
    const listaFilmes = localStorage.getItem("@primeflix");

    //Tentar buscar a lista de filmes, caso não exista nenhum atribui vazio
    let filmesSalvos = JSON.parse(listaFilmes) || [];

    //"some" -> Retorna True ou False caso existir o item que é testado via função anônima
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warning("Esse filme já está na lista!");
      return;
    } else {
      filmesSalvos.push(filme); //"push" -> Adicionar ao array
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
    }
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      ></img>

      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>

      <div className="area-buttons">
        <button onClick={SalvarFilme}>Salvar</button>
        <a
          target="blank"
          rel="external"
          href={`https://youtube.com/results?search_query=${filme.title} trailer`}
        >
          <button>Trailer</button>
        </a>
      </div>
    </div>
  );
}

export default Filme;
