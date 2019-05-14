// Libraries
import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

// Pages
import Calculator from './containers/calculator'
import { DashboardEdit } from './containers/dashboard-edit'
import { DashboardView } from './containers/dashboard-view'
import { MarketingPage } from './containers/marketing-page'

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Route exact path="/" component={MarketingPage} />
      <Route exact path="/calculator-example/" component={Calculator} />
      <Route exact path="/:username/:dashboardName" component={DashboardView} />
      <Route exact path="/:username/:dashboardName/edit" component={DashboardEdit} />
    </React.Fragment>
  )
}
export default App
