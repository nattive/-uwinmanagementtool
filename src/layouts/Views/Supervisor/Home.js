import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Grid } from '@material-ui/core'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Reports from './Reports'
import Manage from './Manage'
import SignUpClass from '../../../Auth/SignUp/SignUpClass'

export const Home = (props) => {
  const { path } = useRouteMatch()
  const { manager } = props
  return (
    <Container>
      <Switch>
        {manager.role && (manager.role.name === "supervisor" || manager.role.name === "Director") ? (
          <>
            <Route path={`${path}/report`}>
              <Reports />
            </Route>
            <Route path={`${path}/manage`}>
              <Manage />
            </Route>
            <Route path={`${path}/signup`}>
              <SignUpClass />
            </Route>
            
          </>
        ) : (<p style={{ margin: 50 }}>You are not authorized to view this page</p>)
        }

        {manager.role && (manager.role.name === "supervisor" || manager.role.name === "Director") ? (
          <Route path={`${path}/manager/create`}>
            <SignUpClass />
          </Route>
        ) : (<p style={{ margin: 50 }}>You are not authorized to view this page</p>)
        }
      </Switch>
    </Container >
  );
}

Home.propTypes = {
  prop: PropTypes
}

const mapStateToProps = (state) => ({
  manager: state.auth.manager,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
