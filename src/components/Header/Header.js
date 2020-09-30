import React from 'react';
import './header.css';
import { ReactComponent as Find } from './find.svg'
import { ReactComponent as Login } from './login.svg'

const Header = () => (
  <div className="header flex flex-justify-content-end flex-align-items-center">
    <div>
      <a href='/' className="flex">
        <div className="mr-1">Поиск</div>
        <Find />
      </a>
    </div>
    <div>
      <a href='/' className="flex">
        <div className="mr-1">Вход</div>
        <Login />
      </a>
    </div>
  </div>
)

export default Header;