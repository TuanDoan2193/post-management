import React, { useState } from "react"
import axios from "axios"
import "./Login.css"
import { usePost } from "../../AppContext"
import { useHistory } from "react-router-dom"

const Login = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const client_id = "ju16a6m81mhid5ue1z3v2g0uh"
  let history = useHistory()

  const { dispatch } = usePost()

  const validateEmail = (value: string) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return true
    }
    alert("You have entered an invalid email address!")
  }

  const register = async () => {
    if (validateEmail(email)) {
      try {
        const response = await axios.post(
          "https://api.supermetrics.com/assignment/register",
          {
            client_id,
            name,
            email,
          }
        )
        await dispatch({
          type: "INIT_TOKEN",
          payload: response.data.data.sl_token,
        })
        sessionStorage.setItem("token", response.data.data.sl_token)
        history.push("/post-list")
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <div className="login-label">Login</div>
        <input
          className="login-input"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <button className="login-button" onClick={register}>
          Go
        </button>
      </div>
    </div>
  )
}

export default Login
