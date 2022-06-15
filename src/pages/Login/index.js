// import { useState, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useLoginProvider from "../../hooks/useLoginProvider";
import Button from "../../components/Button";
import user from "../../assets/user.png"
import cuscuz from "../../assets/cuscuz.png"
import olhoAberto from "../../assets/olho.png"
import olhoFechado from "../../assets/olhoFechado.png"
import cadeado from "../../assets/cadeado.png"
import "./styles.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Login() {
  const { setToken, setnameAdm, nameAdm } = useLoginProvider();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [olhoPassword, setOlhoPassword] = useState("olhoFechado");
  
  const history = useHistory();

  const olhoAf = ()=>{
    if(olhoPassword === "olhoFechado"){
      return setOlhoPassword("olhoAberto")
    }else{
      return setOlhoPassword("olhoFechado")
    }

  }

  async function handleLogin(e) {
    e.preventDefault();

    const promise = await fetch(`${process.env.REACT_APP_LOGIN_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });
    if (!promise.ok) {
      return toast.dark("Email ou senha incorretas", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }
    const response = await promise.json();
    const credenciais = response.token.replace("Bearer ", "");
    setToken(credenciais);

    toast.success("Login sucess!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

    setTimeout(() => {
      history.push("/home")
      window.location.reload()
    }, 2000)

  }

  return (
    <main className="tela_login">
      <div className="tlogin">
        <img src={cuscuz} alt="cuscuz grupo 5" className='cuscuz imgLogin' />
        <section className="card_direita">
          <h2 className="card_direita_titulo">Sing up</h2>
          <form onSubmit={handleLogin}>
            <div className="form_input email_login">
              <label htmlFor="input-email" className="form_label_login">
                <img src={user} className="icon" alt="user" />
                <input
                  className="input_login input"
                  type="text"
                  name="input-email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setnameAdm(e.target.value)
                  }}
                  required
                />
              </label>
            </div>

            <div className="form_input senha_login botao">
              <label htmlFor="input-senha" className="form_label_login">
                <img src={cadeado} className="icon" alt="user" />
                <input
                  className="input_login input"
                  type={olhoPassword === "olhoFechado"?"password" : "text"}
                  name="input-senha"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <img 
                  src={olhoPassword === "olhoFechado" ? olhoFechado : olhoAberto } 
                  className="icon-olho" 
                  alt="olho" 
                  onClick={olhoAf}
                  />
              </label>
            </div>

            <div className="card_direita_div_botao">
              <Button texto={"Login"} classe={"card_direita_botao_login"} />
            </div>
          </form>
        </section>
      </div>

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
    </main>
  );
}

export default Login;
