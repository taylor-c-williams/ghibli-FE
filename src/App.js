import {
  BrowserRouter as Router, 
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';
import Catalog from './Catalog'
import Create from './Create'

function App() {

  return (
    <div className="App">
      <Router>
      <header>
        <NavLink exact activeClassName = 'active-link' to ='/'>Home</NavLink>   
        <NavLink exact activeClassName = 'active-link' to = '/create'>Create</NavLink>
      </header>

      <Route
        path = '/'
        exact
        render = {(routerProps) => <Catalog {...routerProps}/>}
        />

      <Route
        path = '/catalog'
        exact
        render = {(routerProps) => <Catalog {...routerProps}/>}
        />

      <Route
        path = '/create'
        exact
        render = {(routerProps) => <Create {...routerProps}/>}
        />
      </Router>
    </div>
  );
}

export default App;
