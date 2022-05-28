import logo from './logo.svg';
import Catalog from "./pages/Catalog"
import Layout from "./components/Layout/Layout"
import './App.css';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route 
          exact 
          path = "/app"
          render = {() => <Redirect to={Layout}/>}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
