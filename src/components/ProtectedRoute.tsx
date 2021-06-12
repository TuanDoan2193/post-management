import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component, ...rest }: any) => {
  const isAuth = sessionStorage.getItem("token")

  const routeComponent = (props: any) =>
    isAuth !== null ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default ProtectedRoute
