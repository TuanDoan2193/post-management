import PostList from "./pages/PostList/PostList"
import Login from "./pages/Login/Login"
import AppProvider from "./providers/AppContext"
import ProtectedRoute from "./components/ProtectedRoute"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom"

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute path="/post-list/:id" component={PostList} />
          <ProtectedRoute path="/post-list" component={PostList} />
          <Redirect from="*" to={"/"} />
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default App
