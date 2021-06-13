import React from "react"
import "./SingleUser.style.css"
import { Link } from "react-router-dom"
import { User } from "../../providers/AppContext"

const SingleUser = ({ user, id }: { user: User; id: string }) => {
  return (
    <Link className="user-link" to={`/post-list/${user.id}`}>
      <div className={"user-box " + (id === user.id && "selected")}>
        {user.name}
        <span className="number-of-post">{user.numberOfPost}</span>
      </div>
    </Link>
  )
}

export default SingleUser
