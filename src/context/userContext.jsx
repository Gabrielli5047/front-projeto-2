import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import useLoginProvider from "../hooks/useLoginProvider";

const UserContext = createContext({});

export function UserProvider(props) {
  const userProvider = useLoginProvider();

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
