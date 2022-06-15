import React, { useEffect, useState } from 'react';
import './styles.css';
import useLoginProvider from "../../hooks/useLoginProvider";
import Header from '../../components/Header';
import edit from "../../assets/edit.png"
import pedido from "../../assets/pedido.png"
import ModalInfoPedidos from '../../components/ModalInfoPedidos';
import ModalAddOrder from '../../components/ModalAddOrder';

export default function App() {

  const { handleLogout, token } =
    useLoginProvider();

  const [info, setInfo] = useState([]);
  const [Pagina, setPagina] = useState(0);
  const [modalAddPedido, setmodalAddPedido] = useState(false);
  const [idPedido, setIdPedido] = useState(0);
  const [totalUsers, setTotalUsers] = useState(2);
  const [isOpenModalEditPedidos, setIsOpenModalEditPedidos] = useState(false);

  const numeros = []

  for (let i = 1; i < totalUsers; i++) {
    numeros.push({ id: i })
  }

  useEffect(() => {
    setInfo([]);
    fetch(`${process.env.REACT_APP_PEDIDOS_URL}/orders?page=${Pagina}&size=5`,
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
  }, [Pagina]);

  const handleToggleModalPedidos = () => {
    setIsOpenModalEditPedidos((prevState) => !prevState)
  }

  const handleToggleModalAddPedidos = () => {
    setmodalAddPedido((prevState) => !prevState)
  }

  return (
    <>
      <Header
        handleLogout={handleLogout}
        titulo={"Pedidos"}
      />
      {info.length > 0 ?
        <div className="container">
          {info && (
            <div className="main_app_pedido">
              <ul className='ul-pedido'>
                {info.map((pedido) => (
                  <li key={pedido.id} className="pedidoPrincipal">
                    <div >
                      <nav >
                        <nav className="nav-pedidos">
                          <span className="id"><b>Pedido:</b>{pedido.id}<br /></span>
                          <span><p className={pedido.status === "in_progress" ? "status-in_progress status" : "status-ok status"}>{pedido.status}</p></span>
                        </nav>

                      </nav>
                      <nav className="nav-pedidos">
                        <span className="valor" ><b>Valor total: R$</b> {pedido.totalValue}<br /></span>

                        <div>
                          <h2
                            className="info-h2"
                            src={edit} alt="edit"
                            onClick={() => {
                              setIdPedido(pedido.id)
                              setIsOpenModalEditPedidos(true)
                            }}>Info</h2>
                          {/* <img className="img-tamanho" src={lixo} alt="delete" /> */}
                        </div>
                      </nav>
                      <nav>
                        {/* <span className="decricao"><b>Descricao:</b>{pedido.productsDescription}</span>
                       <b className="idUser"><b>Usuario Id:</b>{pedido.userId}</b> */}
                      </nav>
                    </div>
                  </li>
                ))}
                <ul className="pagination">
                  <button onClick={() => {
                    setPagina(Pagina === 0 ? 0 : Pagina - 1)
                    setTotalUsers(Pagina - 1)
                  }} className="btn">Anterior</button>
                  {numeros.map((page) => (
                    <button key={page.id} onClick={() => setPagina(page.id - 1)} className="btn">
                      <li>
                        {page.id}
                      </li>
                    </button>
                  ))}
                  <li>
                    <button onClick={() => {
                      setPagina(Pagina + 1)
                      setTotalUsers(() => Pagina + 2)
                    }}
                      className="btn">Proxima
                    </button>
                  </li>
                </ul>
                <button onClick={() => setmodalAddPedido(true)} className="btn afst">Adicionar pedido</button>
              </ul>
            </div>
          )}
        </div> : <div className='page-null'>
          <img src={pedido} alt="carrinho grupo 5" className='cuscuz' />
          <h2>Pagina sem Pedidos</h2>
          <ul className="pagination">
            <li><button onClick={() => setPagina(Pagina - 1)} className="btn">Anterior</button></li>
            <li><butoon className="btn buton0" onClick={() => setPagina(0)}>Page 0</butoon></li>
            <li><button onClick={() => setmodalAddPedido(true)} className="btn">Adicionar pedido</button> </li>
          </ul>
        </div>

      }
      <ModalAddOrder
        isOpen={modalAddPedido}
        onToggleModal={handleToggleModalAddPedidos}
      />
      <ModalInfoPedidos
        isOpen={isOpenModalEditPedidos}
        onToggleModal={handleToggleModalPedidos}
        idPedido={idPedido}
      />
    </>

  );
}
