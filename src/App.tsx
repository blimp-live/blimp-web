// Libraries
import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

// Pages
import Calculator from './containers/calculator'
import { MarketingPage } from './containers/marketing-page'
import DeveloperPage from './containers/developer-page'
import OldDashboard from './containers/old-dashboard'
import WidgetListSection from './containers/old-dashboard/WidgetListSection'
import DashboardView from './containers/dashboard-view'

// Actions
import { viewDashboard } from './actions/viewStateActions'

const indexRedirect = () => window.location.reload();

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Route exact path="/" component={() => { 
        window.location.href = 'about.html'; 
        return null;
      }}/>
      <Route exact path="/calculator-example/" component={Calculator} />
      <Route exact path="/developer" component={DeveloperPage} />
      <Route exact path="/midterm" component={OldDashboard} />
      <Route exact path="/hackthenorth" component={DashboardView} />
    </React.Fragment>
  )
}

export default App
