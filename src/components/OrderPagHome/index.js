import { useEffect, useState } from 'react'
import './styles.css';
import useLoginProvider from "../../hooks/useLoginProvider";


function ModalListaPedidos({
  isOpen,
  idUser
}) {
  const [pedidos, setPedidos] = useState([])
  const [Pagina, setPagina] = useState(0);
  const [totalUsers, setTotalUsers] = useState(2);

  const numeros = []

  for (let i = 1; i < totalUsers + 1; i++) {
    numeros.push({ id: i })
  }
  const {token} = useLoginProvider()

  useEffect(() => {
    async function listarPaginadoPedidos() {
      try {
        const promise = await fetch(`${process.env.REACT_APP_PEDIDOS_URL}/orders?page=${Pagina > 0 ? Pagina : 0}&user_id=${idUser}&size=${1}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await promise.json();
        setPedidos(response.content)
      } catch (error) {
        return error.message;
      }
    }

    listarPaginadoPedidos()
  }, [Pagina, idUser])


  if (!isOpen) {
    return null;
  }

  return (
    <ul className="pedido-relative">
      {pedidos.map((pedido) => (
        <li key={pedido.id} className="pedido">
          <div >
            <nav className="nav-user-pedido" >
              <span className="id"><b>Pedido - </b>{pedido.id}</span>
              <b className="idUser"><b>Usuario Id:</b> {pedido.userId}</b>
            </nav>
            <nav className='valor-des'>
              <span className="valor" ><b>Valor total: R$</b> {pedido.totalValue}</span>
              <span className="nav-user-status"><b>Status - </b> <p className={pedido.status === "in_progress" ? "status-in_progress status" : "status-ok status"}> {pedido.status}</p></span>
              {/* <span className="createdAt"><b> Data:</b>{pedido.createdAt}</span> */}
            </nav>
            <nav className="nav-user-status" >
            <span className="decricao"><b>Descricao:</b> {pedido.productsDescription}</span>
            </nav>
          </div>
        </li>
      ))}
      <ul className="pagination">
        <button onClick={() => {
          setPagina(Pagina - 1)
          setTotalUsers(Pagina - 1)
        }} className="btn">Anterior</button>
        {numeros.map((page) => (
          <button key={page.id} onClick={() => setPagina(page.id - 1)} className="btn">
            <li>
              {page.id}
            </li>
          </button>
        ))}
        <button onClick={() => {
          setPagina(Pagina + 1)
          setTotalUsers(() => Pagina + 2)
        }} className="btn">Proxima</button>
      </ul>
    </ul>

  )
}
export default ModalListaPedidos;