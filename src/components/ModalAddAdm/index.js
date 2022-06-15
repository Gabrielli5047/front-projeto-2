import React from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalAddAdm({ isOpen, onToggleModal }) {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [sobrenome, setsobrenome] = useState("");

  const { token } =
    useLoginProvider();

  if (!isOpen) {
    return null;
  }

  async function handleCadastroUser(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_LOGIN_URL}/administrators`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name + " " + sobrenome
      }),
    });
    const response = await promise.json()
    console.log(response)

    if (response.validationErrors) {
      for (let i = 0; i < response.validationErrors.length; i++) {
        if (response.validationErrors[i].message === "O campo name é obrigatório") {
          toast.dark("O campo name é obrigatório", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "O campo email é obrigatório") {
          toast.dark("O campo email é obrigatório", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "O campo password é obrigatório") {
            return toast.dark("O campo password é obrigatório", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }
      }


    }

    if (!promise.ok) {
      return toast.dark("Erro ao cadastrar", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }
    // const response = await promise.json();

    toast.success("Cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return (
    <div className="modal addAdm" >
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className="container-modal">
        <h3>
          Adicionar administrador
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        <nav className="navCard">
          <label id="Nome">Nome</label>
          <div className="btn-Adm">
            <input for="Nome" type="text" placeholder="First name" className="submitAdm inputAdmAdd" onChange={(e) => setname(e.target.value)} />
            <input for="Nome" type="text" placeholder="Last Name" className="submitAdm inputAdmAdd" onChange={(e) => setsobrenome(e.target.value)} />
          </div>
        </nav>
        <nav className="navCard">
          <label id="email">E-mail</label>
          <input for="email" type="email" placeholder="Ex: xxxx@gmail.com" className="inputAdm" onChange={(e) => setEmail(e.target.value)} />
        </nav>
        <nav className="navCard">
          <label id="senha">Senha</label>
          <input for="senha" type="password" placeholder="******" className="inputAdm" onChange={(e) => setpassword(e.target.value)} />
        </nav>
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleCadastroUser} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
