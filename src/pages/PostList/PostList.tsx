import React from "react"
import "./PostList.css"
import { usePost, PostProps } from "../../AppContext"
import SinglePost from "../../components/SinglePost/SinglePost"
import SingleUser from "../../components/SingleUser/SingleUser"
import { useLocation } from "react-router-dom"

const PostList = () => {
  const { state, dispatch } = usePost()
  const posts = state.displayedPosts
  const users = state.searchedUsers

  // const location = useLocation()
  // const queryString = location.search.replace("?user=", "").replace("%20", " ")
  // if (queryString != "") {
  //   console.log(1)
  //   dispatch({
  //     type: "SELECT_USER",
  //     payload: queryString,
  //   })
  //   dispatch({
  //     type: "FILTER_POSTS",
  //     payload: queryString,
  //   })
  // }
  return (
    <>
      <div className="control-bar">
        <div className="control-bar-left">
          <input
            onChange={(e) =>
              dispatch({
                type: "SEARCH_USER",
                payload: e.target.value,
              })
            }
            className="user-search-input"
            placeholder="Search user"
            type="text"
          />
        </div>
        <div className="control-bar-right">
          <span className="filter-icon-wrapper">
            <span className="filter-label">Sort by date</span>
            <i
              onClick={() =>
                dispatch({
                  type: "SORT_NEW_POSTS_FIRST",
                })
              }
              className="filter-icon fa-2x fas fa-arrow-up"
            ></i>
            <i
              onClick={() =>
                dispatch({
                  type: "SORT_OLD_POSTS_FIRST",
                })
              }
              className="filter-icon fa-2x fas fa-arrow-down"
            ></i>
          </span>
          <input
            onChange={(e) =>
              dispatch({
                type: "SEARCH_POST",
                payload: e.target.value,
              })
            }
            className="post-search-input"
            placeholder="Search post"
            type="text"
          />
        </div>
      </div>
      <div className="main-section">
        <div className="user-section">
          {Object.entries(users).map((user: any, index) => {
            return <SingleUser key={index} user={user} />
          })}
        </div>
        <div className="post-section">
          {posts.map((post: PostProps, index) => {
            return <SinglePost key={index} post={post} />
          })}
        </div>
      </div>
    </>
  )
}

export default PostList
