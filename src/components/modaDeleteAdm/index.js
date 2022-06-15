import React from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalDeleteUser({ isOpen, onToggleModal, idAdm }) {

  const { token } =
    useLoginProvider();

  if (!isOpen) {
    return null;
  }

  async function handleDeleteUser(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_LOGIN_URL}/administrators/${idAdm}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!promise.ok) {
      return toast.dark("Erro ao Deletar", {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }

    toast.success("Deletado com sucesso!", {
      position: "top-right",
      autoClose: 1300,
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
    <div className="modal" >
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
      <div className="container-modal-delete modalDelete">
        <h3>
         Deletar Usuario
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        
        <div className="btn-Adm">
          <input type="submit" value="Confirmar" className="btn submit" onClick={handleDeleteUser} />
          <input type="submit" value="Cancelar" className="btn submit" onClick={onToggleModal} />
        </div>
      </div>
    </div>
  );
}
