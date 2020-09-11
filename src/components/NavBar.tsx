import * as React from 'react';
import {Link} from 'react-router-dom';

import './NavBar.scss';
import header_logo from '../../static/header-logo.png';

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <nav className='page-header'>
        <ul className='buttons buttons-left'>
          <li><button><i className="fas fa-bars"></i></button></li>
          <li><Link to='/'><button><i className="fas fa-home"></i></button></Link></li>
          <li><button className='btn-boards'><i className="fas fa-chalkboard"></i><span>Boards</span></button></li>
          <li><button className='btn-search'><input type='search' /><i className="fas fa-search"></i></button></li>
        </ul>
        <ul className='buttons buttons-right'>
          <li><button><i className="fas fa-plus"></i></button></li>
          <li><button><i className="fas fa-exclamation-circle"></i></button></li>
          <li><button><i className="fas fa-bell"></i></button></li>
          <li><button className='user'>GL</button></li>
        </ul>
        <div className='header-logo'>
          <img src={'/' + header_logo}></img>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;