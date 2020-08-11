import React from 'react';
import { Link }  from 'react-router-dom';

const Navbar = () => {
  return ( 
    <nav className="navbar" data-test='navbar'>
      <input type="checkbox" name="" id="navlink-control" />
      <div className="navbar-wrapper">
        <Link to='/' className="logo">
          <span className="logo-icon fa fa-comments fa-2x" />
          <span className="logo-name">Commercify</span>
        </Link>

        <label htmlFor="navlink-control" className="hamburger fa fa-bars fa-2x"></label>
        <div className="navlinks">
          <Link to="/" className="navlink">Home</Link>
          <Link to="/shop" className="navlink">Shop</Link>
          <Link to="/cart" className="navlink">Cart <sup> <span className="badge badge-primary">10</span> </sup></Link>
          
        </div>
      </div>
    </nav>
   );
}
 
export default Navbar;