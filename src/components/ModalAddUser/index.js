import React from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalAddUser({ isOpen, onToggleModal }) {

  const [email, setEmail] = useState("");
  const [telephone, setTelefone] = useState("");
  const [name, setname] = useState("");
  const [cpf, setCpf] = useState("");
  const [sobrenome, setsobrenome] = useState("");
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [ano, setAno] = useState("");

  const { token } =
    useLoginProvider();

  console.log(token)


  if (!isOpen) {
    return null;
  }

  async function handleCadastroUser(e) {
    e.preventDefault();

    const promise = await fetch(`http://localhost:8086/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        phone: telephone,
        cpf: cpf,
        name: name + " " + sobrenome,
        birthdate: ano + "-" + mes + "-" + dia
      }),
    });

    const response = await promise.json()

    if (response.message === "Erro de validação.") {

      for (let i = 0; i < response.validationErrors.length; i++) {
        if (response.validationErrors[i].message === "O campo nome é obrigatório") {
          toast.dark("O campo nome é obrigatório.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[0].message === "Este CPF já está em uso.") {
          toast.dark("CPF já está em uso.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "CPF inválido") {
          toast.dark("CPF invalido", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "Este email já está em uso. Tente outro.") {
          toast.dark("Este email já está em uso.", {
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
    if (!telephone) {
      toast.dark("O campo Telefone é obrigatório.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
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
      <div className="container-modal-user">
        <h3>
          Adicionar Usuario
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
          <label id="Telefone">Telefone</label>
          <input for="Telefone" type="number" placeholder="(71)9 9718-9443" className="inputAdm" onChange={(e) => setTelefone(e.target.value)} />
        </nav>
        <nav className="navCard">
          <label id="Cpf">Cpf</label>
          <input for="Cpf" type="number" placeholder="048.302.135-07" className="inputAdm" onChange={(e) => setCpf(e.target.value)} />
        </nav>
        <nav className="navCard">
          <label id="Data">Data de aniversario</label>
          <div className="navCardAdm">
            <input for="Data" type="number" placeholder="DD" className="inputAdmNew" onChange={(e) => setDia(e.target.value)} />
            <input for="Data" type="number" placeholder="MM" className="inputAdmNew" onChange={(e) => setMes(e.target.value)} />
            <input for="Data" type="number" placeholder="AAAA" className="inputAdmNew" onChange={(e) => setAno(e.target.value)} />
          </div>

        </nav>
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleCadastroUser} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
