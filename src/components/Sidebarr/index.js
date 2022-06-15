import React, { useState } from "react";
import "./styles.css";
import logout from "../../assets/arrow.png"
import lista from "../../assets/lista.png"
import addUser from "../../assets/addUser.ico"
import { NavLink} from 'react-router-dom'
import ModalAddAdm from "../ModalAddAdm";
import ModalAddUser from "../ModalAddUser";


export default function SideBar({ isOpen, handleLogout }) {

  const [isOpenModalUser, setModalUser] = useState(false)
  const [isOpenModalAdm, setModalAdm] = useState(false)
  
  const handleToggleModalAddAdm = () => {
    setModalAdm((prevState) => !prevState);
  };

  const handleToggleModalAddUser = () => {
    setModalUser((prevState) => !prevState);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section className="sidebar">
            <div className="header-new">
              <NavLink to="/home">
                <span className={window.location.pathname.includes('/home') ? 'active ' : 'span-header'}>Home</span>
              </NavLink>
              <NavLink to="/pedidos">
                <span className={window.location.pathname.includes('/pedidos') ? 'active ' : 'span-header'}>Pedidos</span>
              </NavLink>
              <NavLink to="/administradores">
                <span className={window.location.pathname.includes('/administradores') ? 'active ' : 'span-header'}>Administradores</span>
              </NavLink>
              <span className={isOpenModalAdm ? 'active ' : 'span-header'} onClick={(() => setModalAdm(true))} >Novo adm <img src={addUser} className="img-tamanho icon-add" /></span>
              <span className={isOpenModalUser ? 'active ' : 'span-header'} onClick={(() => setModalUser(true))} >Novo user <img src={addUser} className="img-tamanho icon-add" /></span>
            
            </div>
            <img src={logout} className="logout img-tamanho" alt='logout' onClick={(e) => handleLogout(e)} />
      <ModalAddAdm
        isOpen={isOpenModalAdm}
        onToggleModal={handleToggleModalAddAdm}
      />
      <ModalAddUser
        isOpen={isOpenModalUser}
        onToggleModal={handleToggleModalAddUser}
      />
   </section>
  )
}
