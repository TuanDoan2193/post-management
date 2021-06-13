import React, { useContext, useEffect, useReducer } from "react"
import axios from "axios"

export interface Post {
  created_time: string
  from_id: string
  from_name: string
  id: string
  message: string
  type: string
}

export interface User {
  id: string
  name: string
  numberOfPost: number
}

interface AppContextProps {
  posts: Post[]
  users: User[]
  token: string | null
}

const appReducer = (state: AppContextProps, action: any) => {
  switch (action.type) {
    case "INIT_TOKEN":
      return {
        ...state,
        token: action.payload,
      }
    case "INIT_POSTS":
      return {
        ...state,
        posts: action.payload,
      }
    case "INIT_USERS":
      return {
        ...state,
        users: action.payload,
      }
    case "SORT_NEW_POSTS_FIRST":
      return {
        ...state,
        posts: state.posts.sort(function (a, b) {
          let dateA = new Date(a.created_time),
            dateB = new Date(b.created_time)
          //transform the date type to number again to compare (TS requirement)
          return dateA.getTime() - dateB.getTime()
        }),
      }
    case "SORT_OLD_POSTS_FIRST":
      return {
        ...state,
        posts: state.posts.sort(function (a, b) {
          let dateA = new Date(a.created_time),
            dateB = new Date(b.created_time)
          //transform the date type to number again to compare (TS requirement)
          return dateB.getTime() - dateA.getTime()
        }),
      }
    default:
      return state
  }
}

const AppContext = React.createContext<{
  state: AppContextProps
  dispatch: React.Dispatch<any>
}>({
  state: {} as AppContextProps,
  dispatch: () => null,
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: AppContextProps = {
    posts: [],
    users: [],
    token: sessionStorage.getItem("token"),
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  //Automatically fetch posts and users if token is updated.
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://api.supermetrics.com/assignment/posts",
        {
          params: {
            sl_token: state.token,
            page: 1,
          },
        }
      )

      //Get initial post list.
      dispatch({
        type: "INIT_POSTS",
        payload: response.data.data.posts,
      })

      //Get initial user list from post list.
      //Sort users alphabetically by default.
      let users: User[] = []
      response.data.data.posts.forEach((post: Post) => {
        const user = {
          id: post.from_id,
          name: post.from_name,
          numberOfPost: 1,
        }

        const index = users.findIndex((user) => user.id === post.from_id)
        if (index !== -1) {
          users[index].numberOfPost += 1
        } else {
          users = [...users, user]
        }
      })

      //Sort users by name.
      users.sort((a, b) => a.name.localeCompare(b.name))

      dispatch({
        type: "INIT_USERS",
        payload: users,
      })
    }
    if (state.token != null) {
      getData()
    }
  }, [state.token])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useAppData = () => useContext(AppContext)
