import React, { useEffect, useState } from 'react';
import './styles.css';
import useLoginProvider from "../../hooks/useLoginProvider";
import Header from '../../components/Header';
import edit from "../../assets/edit.png"
import lixo from "../../assets/lixo.png"
import adms from "../../assets/adms.webp"
import ModalEditAdm from '../../components/ModalEditAdm';
import ModalDeleteAdm from '../../components/modaDeleteAdm';

export default function App() {

  const { handleLogout, token } =
    useLoginProvider();

  const [info, setInfo] = useState([]);
  const [Pagina, setPagina] = useState(0);
  const [modalEditAdm, setmodalEditAdm] = useState(false);
  const [idAdm, setIdAdm] = useState(0);
  const [totalUsers, setTotalUsers] = useState(2);
  const [isOpenModalDeleteAdm, setIsOpenModalDeleteAdm] = useState(false);
  
  const numeros = []

  for (let i = 1; i < totalUsers ; i++) {
    numeros.push({ id: i })
  }

  useEffect(() => {
    setInfo([]);
    fetch(`${process.env.REACT_APP_LOGIN_URL}/administrators?page=${Pagina}&size=5`,
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

  const handleModalDeletAdm = () => {
    setIsOpenModalDeleteAdm((prevState) => !prevState)
  }

  const handleModalEditAdm = () => {
    setmodalEditAdm((prevState) => !prevState)
  }

  return (
    <>
      <Header 
      handleLogout={handleLogout} 
      titulo = {"Administradores"}      
      />
      {info.length > 0? 
       <div className="container">
       {info && (
         <div className="main_app_adms">
           <ul className='ul-adms'>
             {info.map((adm) => (
               <li key={adm.id} className="adms">
                 <div >
                   <nav >
                     <nav className="nav-adms">
                       <span className="id"><b>Id:</b> {adm.id}<br /></span>
                       <p><b>Nome:</b> {adm.name}</p>
                     </nav>
                   
                   </nav>
                   <nav className="nav-adms">
                     <span className="email" ><b>E-mail:</b> {adm.email}<br /></span>
                     
                     <div>
                       <img
                         className="info-img img-tamanho"
                         src={edit} alt="edit"
                         onClick={() => {
                           setIdAdm(adm.id)
                           setmodalEditAdm(true)
                           }}/>
                       <img 
                          className="img-tamanho" 
                          src={lixo} alt="delete"
                          onClick={()=> {
                            setIsOpenModalDeleteAdm(true)
                            setIdAdm(adm.id)
                          }}
                          />
                     </div>
                   </nav>
                   <nav>
                   </nav>
                 </div>
               </li>
             ))}
             <ul className="pagination">
               <button onClick={() => {
                 setPagina(Pagina === 0? 0 : Pagina -1)
                 setTotalUsers(Pagina - 1)
                 }} className="btn">Anterior</button>
               {numeros.map((page) => (
                 <button key={page.id} onClick={() => setPagina(page.id -1)} className="btn">
                   <li>
                     {page.id}
                   </li>
                 </button>
               ))}
               <button onClick={() => {
                 setPagina(Pagina +1)
                 setTotalUsers(()=> Pagina + 2)
                 }} className="btn">Proxima</button>
             </ul>
           </ul>
         </div>
       )}
     </div> : <div className='page-null'>
          <img src={adms} alt="carrinho grupo 5" className='cuscuz' />
          <h2>Pagina sem Administradores!</h2>
          <ul className="pagination">
            <button onClick={() => setPagina(Pagina - 1)} className="btn">Anterior</button>
            <li><butoon className="btn buton0" onClick={() => setPagina(0)}>Page 0</butoon></li>
          </ul>
      </div>
    
    }
    <ModalEditAdm
       isOpen={modalEditAdm}
       onToggleModal={handleModalEditAdm}
       idAdm={idAdm}
    />
      <ModalDeleteAdm
        isOpen={isOpenModalDeleteAdm}
        onToggleModal={handleModalDeletAdm}
        idAdm={idAdm}
      />
    </>

  );
}
