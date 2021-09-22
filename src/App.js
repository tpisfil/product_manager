import './App.css';
import AllProducts from './components/AllProducts';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NewProductForm from './components/NewProductForm';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Product Manager</h1>
        <Switch>
          <Route exact path="/">
            <NewProductForm></NewProductForm>
            <AllProducts></AllProducts>
          </Route>
          <Route exact path="/product/:_idParam">
            <OneProduct></OneProduct>
          </Route>
          <Route exact path="/product/edit/:_idParam">
            <EditProduct></EditProduct>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
