import React, { useContext, useEffect, useReducer } from "react"
import axios from "axios"

export interface PostProps {
  created_time: string
  from_id: string
  from_name: string
  id: string
  message: string
  type: string
}

interface AppContextProps {
  posts: PostProps[]
  tempPosts: PostProps[]
  displayedPosts: PostProps[]
  users: Object
  searchedUsers: Object
  selectedUser: string
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
        //Set all posts by default
        posts: action.payload,
        tempPosts: action.payload,
        displayedPosts: action.payload,
      }
    case "INIT_USERS":
      return {
        ...state,
        users: action.payload,
        //All users are in searched users storage by default, will be reduced while searching.
        searchedUsers: action.payload,
      }
    case "SELECT_USER":
      return {
        ...state,
        selectedUser: action.payload,
      }
    case "SEARCH_USER":
      //Search for users that have matched name, then alter searched users storage.
      const searchedUsers = Object.values(state.users).filter((user) => {
        return user[0].toLowerCase().includes(action.payload)
      })
      return {
        ...state,
        searchedUsers: searchedUsers,
      }
    case "FILTER_POSTS":
      const tempPosts = state.posts.filter(
        (post) => post.from_name === action.payload
      )
      return {
        ...state,
        //While we only use displayedPosts for displaying, tempPosts need to be filtered as well.
        //So we can use it and search posts within filtered posts.
        tempPosts: tempPosts,
        displayedPosts: tempPosts,
      }
    case "RESET_POSTS":
      return {
        ...state,
        tempPosts: state.posts,
        displayedPosts: state.posts,
      }
    case "SORT_NEW_POSTS_FIRST":
      return {
        ...state,
        tempPosts: state.tempPosts.sort(function (a, b) {
          let dateA = new Date(a.created_time),
            dateB = new Date(b.created_time)
          //transform the date type to number again to compare (TS requirement)
          return dateA.getTime() - dateB.getTime()
        }),
      }
    case "SORT_OLD_POSTS_FIRST":
      return {
        ...state,
        tempPosts: state.tempPosts.sort(function (a, b) {
          let dateA = new Date(a.created_time),
            dateB = new Date(b.created_time)
          //transform the date type to number again to compare (TS requirement)
          return dateB.getTime() - dateA.getTime()
        }),
      }
    case "SEARCH_POST":
      const searchedPosts = state.tempPosts.filter((post) =>
        post.message.includes(action.payload)
      )
      return {
        ...state,
        displayedPosts: searchedPosts,
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
    tempPosts: [],
    displayedPosts: [],
    users: {},
    searchedUsers: {},
    selectedUser: "",
    token: sessionStorage.getItem("token"),
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  //Automatically fetch posts if token is updated.
  useEffect(() => {
    const getPosts = async () => {
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
      let users: any = {}
      response.data.data.posts.forEach((post: PostProps) => {
        let key = post.from_name
        users[key] = (users[key] || 0) + 1
      })
      dispatch({
        type: "INIT_USERS",
        payload: Object.entries(users).sort(),
      })
    }

    //Call if the token is updated
    if (state.token != null) {
      getPosts()
    }
  }, [state.token])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const usePost = () => useContext(AppContext)
