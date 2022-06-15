import React, { useEffect, useState } from 'react';
import './styles.css';
import useLoginProvider from "../../hooks/useLoginProvider";
import PedidoPaginado from "../../components/OrderPagHome"
import Header from '../../components/Header';
import edit from "../../assets/edit.png"
import lixo from "../../assets/lixo.png"
import users from "../../assets/users.png"
import ModalEditUser from '../../components/ModalEditUser';
import ModalDeleteUser from '../../components/modalDeleteUser';

export default function App() {

  const { token, handleLogout } =
    useLoginProvider();

  const [info, setInfo] = useState([]);
  const [infoUser, setInfoUser] = useState(null);
  const [Pagina, setPagina] = useState(0);
  const [totalUsers, setTotalUsers] = useState(2);
  const [idUser, setIdUser] = useState(0);
  const [isOpenModalPedidos, setIsOpenModalPedidos] = useState(false);
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
  const [isOpenModalDeleteUser, setIsOpenModalDeleteUser] = useState(false);


  const numeros = []

  for (let i = 1; i < totalUsers; i++) {
    numeros.push({ id: i })
  }

  useEffect(() => {
    setInfo([]);
    fetch(`${process.env.REACT_APP_USERS_URL}/users?page=${Pagina}&limit=${6}`,
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

  const handleinfoUser = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS_URL}/users/${id}`,
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
      let dataFormat2 = dataFormat1 ? `${dataFormat1[2]}/${dataFormat1[1]}/${dataFormat1[0]}` : "Atualizar"
      setInfoUser({ ...data, birthdate: dataFormat2 });
    } catch (error) {
      console.log(error);
    } finally {
      // setDadosLogado(false)
      // overlay
    }
  }
  const handleToggleModalPedidos = () => {
    setIsOpenModalPedidos((prevState) => !prevState);
  };

  const handleToggleModalEditUser = () => {
    setIsOpenModalEditUser((prevState) => !prevState);
  };

  const handleToggleModalDeleteUser = () => {
    setIsOpenModalDeleteUser((prevState) => !prevState);
  };

  return (
    <>
      <Header
        handleLogout={handleLogout}
        token={token}
        titulo={"Usuarios"}
      />
      <div className="container">
        {info.length > 0 ? (
          <div className="main_app">
            <ul>
              {info.map((user) => (
                <li key={user.id} className="user">
                  <div >
                    <nav
                      className="nav-user"
                      onClick={() => {
                        setIdUser(user.id)
                        setIsOpenModalPedidos(true)
                        handleinfoUser(user.id);
                      }}>
                      <span className="id">{`Usuario - ${user.id}`}</span>
                      <b className="name">{user.name}</b>
                    </nav>
                    <nav className='edit-delete'>
                      <span
                        className="email"
                        onClick={() => {
                          setIsOpenModalPedidos(true)
                          handleinfoUser(user.id);
                        }}
                      >Email: {user.email} </span>
                      <div>
                        <img
                          className="img-tamanho"
                          src={edit} alt="edit"
                          onClick={() => {
                            setIdUser(user.id)
                            setIsOpenModalEditUser(true)
                          }} />
                        <img
                          className="img-tamanho"
                          src={lixo}
                          alt="delete"
                          onClick={() => {
                            setIdUser(user.id)
                            setIsOpenModalDeleteUser(true)
                          }}
                        />
                      </div>
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
                <button onClick={() => {
                  setPagina(Pagina + 1)
                  setTotalUsers(() => Pagina + 2)
                }} className="btn">Proxima</button>
              </ul>
            </ul>
            {infoUser && (
              <div className='centralizar'>
                <div className='btn-close'>
                </div>
                <div className='container-user'>
                  <div className='closediv'>
                  <button onClick={() => setInfoUser(null)} className="btn "><b>X</b></button>
                  </div>
                  <nav className='nav-user-card'>
                    <div className="navCardUser">
                      <p><b>Nome:</b> {infoUser.name}</p>
                      <p><b>cpf:</b> {infoUser.cpf}</p>
                    </div>
                    <div className="navCardUser">
                      <p><b>Telefone:</b> {infoUser.phone}</p>
                      <p><b>Aniversario:</b> {infoUser.birthdate}</p>
                    </div>
                  </nav>
                  <div className="navCardUser">
                    <p><b>Email:</b> {infoUser.email}</p>
                  </div>
                  <PedidoPaginado
                  isOpen={isOpenModalPedidos}
                  onToggleModal={handleToggleModalPedidos}
                  idUser={idUser}
                />
                </div>

              </div>
            )}
          </div>
        ) : <div className='page-null'>
          <img src={users} alt="cuscuz grupo 5" className='cuscuz' />
          <h2>Pagina sem usuarios!</h2>
          <ul className="pagination">
            <button onClick={() => setPagina(Pagina - 1)} className="btn">Anterior</button>
            <li><butoon className="btn buton0" onClick={() => setPagina(0)}>Page 0</butoon></li>
          </ul>
        </div>
        }
      </div>
      <ModalDeleteUser
        isOpen={isOpenModalDeleteUser}
        onToggleModal={handleToggleModalDeleteUser}
        idUser={idUser}
      />
      <ModalEditUser
        isOpen={isOpenModalEditUser}
        onToggleModal={handleToggleModalEditUser}
        idUser={idUser}
        infoUser={infoUser}
      />
    </>
  );
}





