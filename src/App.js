import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import useLoginProvider from "./hooks/useLoginProvider";
import Login from "./pages/Login/index"
import Home from "./pages/Home";
import Pedidos from "./pages/Pedidos/index";
import Admin from "./pages/Admin/index";

function App() {

  const { token } = useLoginProvider();

  function RotasProtegidas(props) {
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
  }
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/login" component={token ? Home : Login} />
          <Route path="/" exact component={token ? Home : Login} />
        <RotasProtegidas>
          <Route path="/pedidos" exact component={Pedidos} />
          <Route path="/home" component={Home} />
          <Route path="/administradores" component={Admin} />
        </RotasProtegidas>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
