
// Libraries
import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Dashboard from './Dashboard';
import Header from './Header';
import WidgetList from './WidgetList';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// Pages
import Calculator from './containers/calculator'
import { DashboardEdit } from './containers/dashboard-edit'
import { DashboardView } from './containers/dashboard-view'
import { MarketingPage } from './containers/marketing-page'
import { WidgetList } from './containers/widget-list'
import DeveloperPage from './containers/developer-page'

export const App = (): JSX.Element => {
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
