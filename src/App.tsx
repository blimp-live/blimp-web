// Libraries
import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

// Pages
import Calculator from './containers/calculator'
import { DashboardApp } from './containers/dashboard-app'
import { MarketingPage } from './containers/marketing-page'
import DeveloperPage from './containers/developer-page'

// Actions
import { viewDashboard } from './actions/viewStateActions'

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Route exact path="/" component={MarketingPage} />
      <Route exact path="/calculator-example/" component={Calculator} />
      <Route exact path="/developer" component={DeveloperPage} />
      <Route exact path="/:dashboardId" component={DashboardApp} />
    </React.Fragment>
  )
}

export default App
