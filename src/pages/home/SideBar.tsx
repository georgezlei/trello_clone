import * as React from 'react';

import './SideBar.scss';

const SideBar = () => {
  return (
    <div className='side-bar'>
      <div className='menu'>
        <div className='menu-item selected'>
          <i className='fas fa-chalkboard'></i>
          <span>Boards</span>
        </div>
        <div className='menu-item'>
          <i className='far fa-clone'></i>
          <span>Templates</span>
        </div>
        <div className='menu-item'>
          <i className='fas fa-home'></i>
          <span>Home</span>
        </div>
      </div>
      <div className='teams'>
        <div className='title'>Teams</div>
        <div className='add-team'>
          <i className='fas fa-plus'></i>
          <span>Create a team</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar;