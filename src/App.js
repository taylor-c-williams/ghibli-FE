import {
  BrowserRouter as Router, 
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';
import Catalog from './Catalog'
import Create from './Create'
import Edit from './Edit'

function App() {

  return (
    <div className="App">
      <Router>
      <header className = "nav">
        <NavLink exact activeClassName = 'active-link' to ='/'>Catalog</NavLink>&nbsp;▿&nbsp;
        <NavLink exact activeClassName = 'active-link' to = '/create'>Create</NavLink>
      </header>

      <Route
        path = '/'
        exact
        render = {(routerProps) => <Catalog {...routerProps}/>}
        />

      <Route
        path = '/create'
        exact
        render = {(routerProps) => <Create {...routerProps}/>}
        />

        <Route
        path = '/edit/:id'
        exact
        render = {(routerProps) => <Edit {...routerProps}/>}
        />    

      </Router>
    </div>
  );
}

export default App;
