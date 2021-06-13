import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component, ...rest }: any) => {
  const token = sessionStorage.getItem("token")

  const routeComponent = (props: any) =>
    token !== null ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default ProtectedRoute
