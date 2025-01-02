import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import NavBar from "./components/NavBar"; 
import RoutesApplication from "./routes/routes.application.js"; 


function App() {
  return (
    <div>
      <NavBar/>
      <RoutesApplication/>
    </div>
  );
}

export default App;