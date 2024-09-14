import "./App.css";
import { Outlet } from "react-router-dom";
import { getRoutes } from "./utils/getRoutes";
import Lnb from "./components/Lnb";

function App() {
  const routes = getRoutes();

  return (
    <>
      <div>
        <Lnb routes={routes} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
