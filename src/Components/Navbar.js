import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import user2 from '../Icons/user2.png';
import bag2 from '../Icons/bag2.png';
import chevron from '../Icons/chevron-left.png'

const Navbar = () => {
  const logo = process.env.PUBLIC_URL + '/Images/rc-logo.png';

  const [visible, setVisible] = useState(false)

  return (
    <nav className="nav-container">
      <div className="nav">
        <NavLink to="/">
          <img src={logo} alt="logo" className="nav-logo" />
        </NavLink>
        <div className="links-container">
          {/* <NavLink className='underline-transition' to="/">Home</NavLink> */}
          <NavLink className='underline-transition' to="/">My Work</NavLink>
          <NavLink className='underline-transition' to="/about">About</NavLink>
          <NavLink className='underline-transition' to="/contact">Contact</NavLink>
          {/* <NavLink className='underline-transition' to="/shop">Shop</NavLink>  */}

        </div>
        {/* <div className='icon-container'>
          <NavLink to="/cart" className="nav-icon-wrapper underline-transition">
            <img src={bag2} alt="bag icon" className="nav-icon" />
            <p className='cart-badge'>10</p>
          </NavLink>
          <div className="nav-icon-wrapper underline-transition hover-user">
            <NavLink to="/login">
              <img src={user2} alt="user icon" className="nav-icon" />
            </NavLink>
            <div className="user-dropdown">
              <div className="user-menu-dropdown">
                <p className="user-menu-dropdown-item">Account</p>
                <p className="user-menu-dropdown-item">Orders</p>
                <p className="user-menu-dropdown-item">Logout</p>
              </div>
            </div>
          </div>
          <img onClick={() => setVisible(true)} src={logo} className='menu-icon nav-logo'/>
        </div> */}

        

      </div>
      {/* Sidebar menu for mobile */}
        {visible && (
          <div className="mobile-sidebar">
            <div onClick={() => setVisible(false)} className='sidebar-item'>
               <img src={chevron} alt="user icon" className="nav-icon" />
               <p>Back</p>
            </div>
            {/* <NavLink onClick={() => setVisible(false)} className='underline-transition' to="/">Home</NavLink> */}
            <NavLink onClick={() => setVisible(false)} className='underline-transition' to="/">My Work</NavLink>
            <NavLink onClick={() => setVisible(false)} className='underline-transition' to="/about">About</NavLink>
            {/* <NavLink onClick={() => setVisible(false)} className='underline-transition' to="/shop">Shop</NavLink> */}
            <NavLink onClick={() => setVisible(false)} className='underline-transition' to="/contact">Contact</NavLink>
          </div>
        )}
    </nav>
  );
}

export default Navbar;
