import Dashboard from './Dashboard';
import Header from './Header';
import WidgetList from './WidgetList';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const App: React.FC = () => {
  return (
    <div>
      <div className='dashboard-container'>
          <Header></Header>
          <Dashboard></Dashboard>
      </div>
      <div className='widgetlist-container'>
        <WidgetList></WidgetList>
      </div>
    </div>
  );
}

export default App;
