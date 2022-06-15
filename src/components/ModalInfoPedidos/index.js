import React, { useEffect } from "react";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";


export default function ModalEditPedidos({ isOpen, onToggleModal, idPedido }) {

 
  const [pedido, setPedido] = useState("");

  const { token } =
    useLoginProvider();

  useEffect(() => {
    async function infoProduto() {
      const promise = await fetch(`${process.env.REACT_APP_PEDIDOS_URL}/orders/${idPedido}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await promise.json()
      let dataFormat = response.createdAt?.split("T")
      let dataFormat1 = dataFormat ? dataFormat[0].split("-") : null
      let dataFormat2 = `${dataFormat1[2]}/${dataFormat1[1]}/${dataFormat1[0]}`
      setPedido({ ...response, data: dataFormat2 })
    }

    infoProduto()
  }, [idPedido])

  if (!isOpen) {
    return null;
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
      <div className="container-modal-pedido modalEditPedido">
        <h3>
         Informacoes do pedido
          <button onClick={onToggleModal} className="btn close"><b>X</b></button>
        </h3>
        <nav className="navCardPedido">
          <div className="info">
            <b>Id - </b>
            <span>{pedido.id}</span>
          </div>
          <div className="info">
            <b>Usuario Id - </b>
            <span>{pedido.userId}</span>
          </div>
        </nav>
        <nav className="navCardPedido">
          <div className="info">
            <b>Valor total - </b>
            <span>R${pedido.totalValue}</span>
          </div>
          <div className="info">
            <b>Data pedido - </b>
            <span>{pedido.data}</span>
          </div>
        </nav>
        <nav className="navCardPedido">
          <div className="infoB">
            <b >Descricao - </b>
            <span >{pedido.productsDescription}</span>
          </div>
        </nav>
        <nav className="navCardPedido">
          <div className="info infoStatuss">
            <b>Status - </b>
            <span className={pedido.status === "in_progress" ?"status-in_progress": "status-ok"  }>{pedido.status}</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
