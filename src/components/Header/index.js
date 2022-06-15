import React, { useState } from "react";
import "./styles.css";
import lista from "../../assets/lista.png"
import ModalAddAdm from "../ModalAddAdm";
import ModalAddUser from "../ModalAddUser";
import SideBar from "../Sidebarr/index"
import useLoginProvider from "../../hooks/useLoginProvider";


export default function Header({ handleLogout, titulo }) {

  const [isOpenModalUser, setModalUser] = useState(false)
  const [isOpenModalAdm, setModalAdm] = useState(false)
  const [isOpenSidebar, setModalSidebar] = useState(false)

  const { nameAdm} = useLoginProvider()

  const handleToggleModalsidebar = () => {
    setModalSidebar((prevState) => !prevState);
  };


  return (
    <div className="containerHeader">
      <header>
        <img src={lista} alt="lista" className="img-tamanho sidebarimg" onClick={handleToggleModalsidebar}></img>
        <b className="b-header"> {titulo}</b>
        <p className="p-header">Olá, {nameAdm.split("@")[0]}</p>
      </header>

      {
        isOpenSidebar && (
          <SideBar
          isOpen={handleToggleModalsidebar}
          handleLogout={handleLogout}
          />
        )
      }


     
    </div>

  );
}
