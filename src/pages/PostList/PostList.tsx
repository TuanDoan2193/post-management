import React, { useState } from "react"
import "./PostList.css"
import { useAppData } from "../../providers/AppContext"
import SinglePost from "../../components/SinglePost"
import SingleUser from "../../components/SingleUser"
import { useParams } from "react-router-dom"
import useDebounce from "../../hooks/useDebouce"

const PostList = () => {
  const { state, dispatch } = useAppData()
  const posts = state.posts
  const users = state.users
  //Get id from params to filter/activate selected user.
  const { id } = useParams<{ id: string }>()

  const [postSearchInput, setPostSearchInput] = useState("")
  const [userSearchInput, setUserSearchInput] = useState("")
  //Get debounced value from search input
  const debouncedPostSearchInput = useDebounce(postSearchInput, 200)
  const debouncedUserSearchInput = useDebounce(userSearchInput, 200)

  return (
    <>
      <div className="control-bar">
        <div className="control-bar-left">
          <input
            onChange={(e) => setUserSearchInput(e.target.value.toLowerCase())}
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
            onChange={(e) => setPostSearchInput(e.target.value.toLowerCase())}
            className="post-search-input"
            placeholder="Search post"
            type="text"
          />
        </div>
      </div>
      <div className="main-section">
        <div className="user-section">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(debouncedUserSearchInput)
            )
            .map((user, index) => {
              return <SingleUser key={index} id={id} user={user} />
            })}
        </div>
        <div className="post-section">
          {/* Return all if there isn't id in params. Otherwise filtering posts on id and search input. */}
          {posts.length > 0 ? (
            <>
              {posts
                .filter((post) =>
                  id
                    ? id === post.from_id &&
                      post.message
                        .toLowerCase()
                        .includes(debouncedPostSearchInput)
                    : true
                )
                .map((post, index) => {
                  return <SinglePost key={index} post={post} />
                })}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  )
}

export default PostList
