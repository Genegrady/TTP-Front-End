import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Pages from './Pages'

export const Routes = (props) => {
    return (
    <Switch>
      <Route path="/signup" component={Pages.Signup} />
      <Route path="/login" component={Pages.Login} />
      <Route exact path="/" component={Pages.Home} />
      <Route exact path="/transactions" component={Pages.Transactions} />
    </Switch>
    )
}

export default Routes;