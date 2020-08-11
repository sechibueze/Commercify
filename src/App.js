import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const Home = () => <h1> Home </h1>
const Shop = () => <h1> Shop </h1>
const Cart = () => <h1> Cart </h1>

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/cart' exact component={Cart} />
      </Router>
    </div>
  );
}

export default App;
