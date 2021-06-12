import React from "react"
import "./SinglePost.css"
import { PostProps } from "../../AppContext"

const SinglePost = ({ post }: { post: PostProps }) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
  const createdTime = new Date(post.created_time).toLocaleString(
    "en-US",
    options
  )
  return (
    <>
      <div className="post-time">{createdTime}</div>
      <div className="post-message">{post.message}</div>
    </>
  )
}

export default SinglePost
