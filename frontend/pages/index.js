import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import qs from 'qs'
import Router from 'next/router'

export default function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const getAuthen = async () => {
    try {
      const result = await axios.post(`http://localhost/login`, qs.stringify(form), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      if (result.data.token) {
        
        // setCookie(result.data.token)
        Router.push('/home')
      }
      else {
        console.log("error")
      }

    } catch (e) {
     
      console.log(e)
    }
  }

  const handleEnter = e => {
    if (e.key === "Enter") {
      getAuthen()
    }
  }

  const checkChookies = () => {
    if (cookies.user) {
      Router.push("/home")
    }
  }

  useEffect(() => {
    checkChookies()
    
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Little Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='login-container'>
        <label htmlFor="username">PSU Passport</label>
        <input className="username"
          type="text"
          name="username"
          placeholder="username"
          value={form.username}
          onChange={handleForm}
          onKeyDown={handleEnter}
        />

        <label htmlFor="username">Password</label>
        <input className="password"
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleForm}
          onKeyPress={handleEnter}
        />
        <label htmlFor="สถานะ" className="status">สถานะ</label>

        <button className="login-button"
          onClick={getAuthen}
        >Login</button>
      </main>
    </div>
  )
}
