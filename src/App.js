import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import RoutesApplication from "./routes/routes.application.js";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavBarRoutes = ["/login", "/register", "/forgot-password", "/"];

  return (
    <div className="App"> 
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <RoutesApplication />
    </div>
  );
}

export default App;