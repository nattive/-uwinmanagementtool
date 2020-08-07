import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Grid } from '@material-ui/core'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Reports from './Reports'
import Manage from './Manage'
import SignUpClass from '../../../Auth/SignUp/SignUpClass'

export const Home = () => {
  const { path } = useRouteMatch()
  return (
    <Container>
      <Switch>
        <Route path={`${path}/report`}>
          <Reports />
        </Route>
        <Route path={`${path}/manage`}>
          <Manage />
        </Route>
        <Route path={`${path}/manager/create`}>
          <SignUpClass />
        </Route>

      </Switch>
    </Container>
  );
}

Home.propTypes = {
  prop: PropTypes
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
