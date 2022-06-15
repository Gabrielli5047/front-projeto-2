import React from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState, useEffect } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalAddAdm({ isOpen, onToggleModal }) {

  const [userId, setIdUser] = useState("");
  const [TotalValue, setTotalValue] = useState("");
  const [descricao, setDescricao] = useState("");
  const [info, setInfo] = useState([]);
console.log(userId)
  const { token } =
    useLoginProvider();

  useEffect(() => {
    setInfo([]);
    fetch(`${process.env.REACT_APP_USERS_URL}/users?&limit=${100}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setInfo(response.content);
      });
  }, []);

  if (!isOpen) {
    return null;
  }

  async function handleCadastroOrder(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_PEDIDOS_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        totalValue: TotalValue,
        productsDescription: descricao
      }),
    });

    const response = await promise.json()

    console.log(response)

    if (response.validationErrors) {
      for (let i = 0; i < response.validationErrors.length; i++) {
        if (response.validationErrors[i].message === "O valor total do pedido não pode ser nulo") {
          toast.dark("O valor total do pedido não pode ser nulo", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "O id do usuário não pode ser nulo") {
          toast.dark("O id do usuário não pode ser nulo", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.validationErrors[i].message === "A descrição dos produtos deve ser maior que 2 caracteres e menor que 500") {
          return toast.dark("A descrição dos produtos deve ser maior que 2 caracteres e menor que 500", {
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

      <div className="container-modal-Add">
        <h3>
          Adicionar novo Pedido
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        <label for="admId">UserId</label>
        <select id="admId" name="admId" value={userId} onChange={t => setIdUser(t.target.value)}>
          <option value={"selecionar"} >{"selecionar"}</option>
          {info.map((option) => ( 
            <option value={option.id} >{option.id} - {option.name}</option>
          ))}
        </select>
        <nav className="navCard">
          <label id="valor">Valor total:</label>
          <input for="valor" type="number" placeholder="R$100" className="inputAdm" onChange={(e) => setTotalValue(e.target.value)} />
        </nav>
        <nav className="navCard">
          <label id="descricao">Descricao</label>
          <input for="descricao" type="text" placeholder="produto xxxx.." className="inputAdm" onChange={(e) => setDescricao(e.target.value)} />
        </nav>
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleCadastroOrder} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
