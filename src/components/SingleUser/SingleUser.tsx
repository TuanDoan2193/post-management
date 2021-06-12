import React from "react"
import "./SingleUser.css"
import { usePost } from "../../AppContext"
import { useHistory } from "react-router-dom"

const SingleUser = ({ user }: { user: any }) => {
  const { state, dispatch } = usePost()
  const userName = user[1][0]
  const numberOfPost = user[1][1]
  const history = useHistory()

  const handleUserClick = () => {
    if (state.selectedUser === userName) {
      dispatch({
        type: "SELECT_USER",
        payload: "",
      })
      dispatch({
        type: "RESET_POSTS",
      })
      history.push({
        search: "", // query string
      })
    } else {
      dispatch({
        type: "SELECT_USER",
        payload: userName,
      })
      dispatch({
        type: "FILTER_POSTS",
        payload: userName,
      })
      history.push({
        search: `?user=${userName}`, // query string
        state: {
          // location state
          update: true,
        },
      })
    }
  }
  return (
    <div
      onClick={() => handleUserClick()}
      className={"user-box " + (state.selectedUser === userName && "selected")}
    >
      {userName}
      <span className="number-of-post">{numberOfPost}</span>
    </div>
  )
}

export default SingleUser
