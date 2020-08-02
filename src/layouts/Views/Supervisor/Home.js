import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Grid } from '@material-ui/core'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Reports from './Reports'
import Manage from './Manage'

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
