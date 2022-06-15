import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useHistory } from "react-router-dom";


function useLoginProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [idAdm, setIdAdm, removeIdAdm] = useLocalStorage("idAdm", "");
  const [nameAdm, setnameAdm, removenameAdm] = useLocalStorage("nameAdm", "");

  const [idLogado, setIdLogado] = useState("");
  const [nomeLogado, setNomeLogado] = useState();

  // async function update() {
  //   const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}`);
  //   const data = await response.json();
  // }

  const history = useHistory();


  function handleLogout(e) {
    e.preventDefault();
    removeToken("token", "");
    removeIdAdm("idAdm", "")
    removenameAdm("nameAdm", "")
    document.location.reload(true);
    history.push("/login");
  }

  function getDadosToken(token) {
    var payload = token.split(".")[1]; 
    return JSON.parse(window.atob(payload)); 
  }

  function setDadosLogado(token) {
    const dadosToken = getDadosToken(token);
    const { sub } = dadosToken;
    setNomeLogado(sub.split("@")[0]);
    setIdLogado(sub.split(",")[1]);
    setIdAdm(sub.split(",")[1]);
    setnameAdm(nomeLogado)
  }

  return {
    token,
    setToken,
    handleLogout,
    setDadosLogado,
    idLogado,
    setIdAdm,
    idAdm,
    setnameAdm,
    nomeLogado,
    nameAdm,
    // update,
    removeIdAdm
  };
}

export default useLoginProvider;
