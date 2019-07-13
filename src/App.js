import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { productList } from './components/productList.component';
import { editProduct } from './components/editProduct.component';
import { createProduct } from './components/createProduct.component';

import logo from './logo.svg';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="container">
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <a className='navbar-brand' href='/'>
              <img src={logo} width='30' height='30' alt='React Logo'></img>
            </a>
            <Link to='/' className='navbar-brand'>Product Actions</Link>
              <div className = 'collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                  <li className='navbar-item'>
                    <Link to='/' className='nav-link'>Products</Link>
                  </li>
                  <li className='navbar-item'>
                    <Link to='/create' className='nav-link'>Create Product</Link>
                  </li>
                </ul>
              </div>
          </nav>
          <br/>
          <Route path="/" exact component={productList} />
          <Route path="/edit/:id" component={editProduct} />
          <Route path="/create" component={createProduct} />
        </div>
      </Router>
    );
  }
}

export default App;
