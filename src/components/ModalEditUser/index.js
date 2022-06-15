import React, { useEffect } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalEditUser({ isOpen, onToggleModal, idUser }) {

  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [sobrenome, setsobrenome] = useState("");
  const [cpf, setcpf] = useState("");
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [ano, setAno] = useState("");
  const [telefone, settelefone] = useState("");
  const [infoUser, setInfoUser] = useState("");

  const usuarinfo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS_URL}/users/${idUser}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const data = await response.json();
      let dataFormat = data.birthdate?.split("T")
      let dataFormat1 = dataFormat ? dataFormat[0].split("-") : null
        setDia(dataFormat1[2])
        setMes(dataFormat1[1])
        setAno(dataFormat1[0])

      let nameSplit = data.name.split(" ")
      setname(nameSplit[0])
      setsobrenome(nameSplit[1]? nameSplit[1] : " ")
      setEmail(data.email)
      setcpf(data.cpf)
      settelefone(data.phone)

      setInfoUser(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    usuarinfo()
  }, [idUser])

  const { token } =
    useLoginProvider();

  if (!isOpen) {
    return null;
  }

  async function handleEditarUser(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_USERS_URL}/users/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name + " " + sobrenome,
        cpf: cpf,
        email: email,
        phone: telefone,
        birthdate: ano + "-" + dia + "-" + mes
      }),
    });

    const response = await promise.json()
    console.log(response)

    if (response.message) {

      if (response.message === 'Email indisponível') {
        toast.dark("Email indisponível", {
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

    if (response.validationErrors) {
      for (let i = 0; i < response.validationErrors.length; i++) {
        
      if (response.validationErrors[i].message === 'CPF inválido') {
        return toast.dark("CPF inválido", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        })
      }

      if (response.validationErrors[i].message === 'O campo nome é obrigatório') {
        return toast.dark("O campo nome é obrigatório", {
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
      return toast.dark("Erro ao Editar", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }

    toast.success("Editado com sucesso!", {
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
          Editar usuario
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        <nav className="navCard">
          <label id="Nome">Nome</label>
          <div className="btn-Adm">
            <input for="Nome" type="text" placeholder="First name" className="submit inputAdmName" onChange={(e) => setname(e.target.value)} value={name}  />
            <input for="Nome" type="text" placeholder="Last Name" className="submit inputAdmName" onChange={(e) => setsobrenome(e.target.value)} value={sobrenome}  />
          </div>
        </nav>
        <nav className="navCard">
          <label id="email">E-mail</label>
          <input for="email" type="email" placeholder="Ex: xxxx@gmail.com" className="inputAdm" onChange={(e) => setEmail(e.target.value)} value={email}  />
        </nav>
        <nav className="navCard">
          <label id="cpf">Cpf</label>
          <input for="cpf" type="text" placeholder="048.302.136-99" className="inputAdm" onChange={(e) => setcpf(e.target.value)} value={cpf}  />
        </nav>
        <nav className="navCard">
          <label id="telefone">telefone</label>
          <input for="telefone" type="number" placeholder="(71)9 9718-9443" className="inputAdm" onChange={(e) => settelefone(e.target.value)} value={telefone}  />
        </nav>
        <nav className="navCard">
          <label id="aniversario">Data de aniversario</label>
          <div className="navCardAdm">
            <input for="Data" type="number" placeholder="MM" className="inputAdmNew" onChange={(e) => setMes(e.target.value)} value={mes}  />
            <input for="Data" type="number" placeholder="DD" className="inputAdmNew" onChange={(e) => setDia(e.target.value)} value={dia}  />
            <input for="Data" type="number" placeholder="AAAA" className="inputAdmNew" onChange={(e) => setAno(e.target.value)} value={ano}  />
          </div>
        </nav>
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleEditarUser} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
