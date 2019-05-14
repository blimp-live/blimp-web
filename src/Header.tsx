import React from 'react';
import logo from './logo.svg';
import './Header.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="redo-undo-div">
        <Button className='undo-button button'>Undo</Button>
        <Button className='redo-button button'>Redo</Button>
      </div>
      <Button className='save-button button'>Save</Button>
    </div>
  );
}

export default Header;
