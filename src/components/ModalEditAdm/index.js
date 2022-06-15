import React, { useEffect } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalEditUser({ isOpen, onToggleModal, idAdm }) {

  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [sobrenome, setsobrenome] = useState("");
  const [infoAdm, setInfoAdm] = useState([]);

  const { token } = useLoginProvider();

  useEffect(() => {
  const admInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOGIN_URL}/administrators/${idAdm}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      let nameFormat = data.name.split(" ")
      setname(nameFormat[0])
      setsobrenome(nameFormat[1])
      setInfoAdm(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
    admInfo()
  }, [idAdm])

  if (!isOpen) {
    return null;
  }

  async function handleEditAdm(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_LOGIN_URL}/administrators/${idAdm}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name + " " + sobrenome,
        email: email,
        password: password,
      }),
    });
    const response = await promise.json()
    
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
      if (response.validationErrors[i].message === 'O campo name é obrigatório') {
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

      if (response.validationErrors[i].message === 'O campo email é obrigatório') {
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

      if (response.validationErrors[i].message === 'O campo password é obrigatório') {
         toast.dark("O campo password é obrigatório", {
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
      <div className="container-modal modalEdit-adm">
        <h3>
          Editar administrador
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        <nav className="navCard">
          <label id="Nome">Nome</label>
          <div className="btn-Adm">
            <input for="Nome" type="text" placeholder="First name" className="submit inputAdm" id="inputA" onChange={(e) => setname(e.target.value)} value={name}  />
            <input for="Nome" type="text" placeholder="Last Name" className="submit inputAdm" id="inputB" onChange={(e) => setsobrenome(e.target.value)} value={sobrenome}  />
          </div>
        </nav>
        <nav className="navCard">
          <label id="email">E-mail</label>
          <input for="email" type="email" placeholder="Ex: xxxx@gmail.com" className="inputAdm" onChange={(e) => setEmail(e.target.value)} value={infoAdm.email}  />
        </nav>
        <nav className="navCard">
          <label id="password">Senha</label>
          <input for="password" type="password" placeholder="********" className="inputAdm" onChange={(e) => setpassword(e.target.value)} />
        </nav>
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleEditAdm} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
